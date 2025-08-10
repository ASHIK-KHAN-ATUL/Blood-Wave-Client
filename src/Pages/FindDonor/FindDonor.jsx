import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { formatDistanceToNow } from "date-fns";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Helmet } from 'react-helmet';


const FindDonor = () => {

    const [bloodGroup, setBloodGroup] = useState('');
    const [district, setDistrict] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [emergencyType, setEmergencyType] = useState('');
    const [needDate, setNeedDate] = useState('');

    // console.log(bloodGroup, district);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const districts = [
        'Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Tangail',
        'Bandarban', 'Brahmanbaria', 'Chandpur', 'Chattogram', 'Cumilla', "Cox's Bazar", 'Feni', 'Khagrachari', 'Lakshmipur', 'Noakhali', 'Rangamati',
        'Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Pabna', 'Rajshahi', 'Sirajganj',
        'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira',
        'Barguna', 'Barishal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur',
        'Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet',
        'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon',
        'Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur',
    ];

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {user} = useAuth();

    const {data:donors=[], refetch, isFetching} = useQuery({
        queryKey: ['donor', bloodGroup, district, page, limit],
        queryFn: async() => {
            const res = await axiosPublic.get(`/find-donor`, {
                params:{
                    bloodGroup,
                    district,
                    page,
                    limit
                }
            });
            return res.data;
        }
    })
    // console.log(donors);


    const handleChange = (e) => {
        const val = e.target.value;
        setDistrict(val);

        if (val.length > 0) {
            const filtered = districts.filter(d =>
                d.toLowerCase().startsWith(val.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
            } else {
            setShowSuggestions(false);
            }
    };

    const handleSelect = (val) => {
        setDistrict(val);
        setShowSuggestions(false);
    };


    const handleOpenModal = (donor) => {
        setSelectedDonor(donor);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMessage('');
        setEmergencyType('');
        setNeedDate('');
        setSelectedDonor(null);
    };


    const handleRequest = async() =>{

        if(!message || !emergencyType || !needDate){
            toast.error('Please fill all fields');
            return;
        }

        axiosPublic.post(`/req-donor-blood/${user.email}`, {
            donorId: selectedDonor._id,
            message,
            emergencyType,
            needDate
        })
        .then(res =>{
            // console.log(res.data);
            if(res.data.insertedId){
                toast.success(`Request sent successfully to ${selectedDonor.name} `);
                setShowModal(false);
            }else {
                toast.error('Failed to send request');
            }
        })
    }

    return (
        <div className='pb-20'>


            <Helmet>
                <title>Find Blood Donors Near You | Blood Wave</title>
                <meta
                name="description"
                content="Search and find blood donors near you quickly and easily on Blood Wave. Filter donors by blood group and location."
                />
                <meta
                name="keywords"
                content="find blood donor, blood group search, blood donation, emergency blood donor, blood wave"
                />
                <link rel="canonical" href="https://blood-wave.netlify.app/donors" />
            </Helmet>

            {/* Input blood grp  and  district */}
            <div className='py-10 w-full flex flex-col md:flex-row justify-center gap-5 px-5 md:px-10 bg-rose-200 mb-10 '>
                <select className="w-full px-4 py-2 border rounded focus:outline-none bg-red-100 " value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}>
                        <option disabled value="">Select Blood Group</option>
                    {
                        bloodGroups.map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ) )
                    }
                </select>

                <div className="relative w-full ">
                    <input  type="text"  value={district} onChange={handleChange} onBlur={() => setTimeout(() => setShowSuggestions(false),100)} placeholder="Type district name..." className="w-full px-4 py-2 border rounded focus:outline-none bg-red-100" />

                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-10 bg-rose-300  border border-red-300 w-full max-h-40 overflow-auto rounded shadow-md mt-1">
                            {suggestions.map((sug, idx) => (
                                <li key={idx} onClick={() => handleSelect(sug)}  className="cursor-pointer px-4 py-2 hover:bg-red-300" >
                                    {sug}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>

            <p className="mb-4 text-center text-gray-700">
                Showing {donors?.data?.length} Of {donors.activeTotal} Active Donors
            </p>

            {/* Loading indicator */}
            {isFetching && (
            <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
            </div>
            )}


            {/* show data in card */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 md:px-10 pb-10 ">
            {
                donors?.data?.map(donor => (
                <div key={donor._id} className="relative bg-gradient-to-br from-red-300 via-black/0 to-red-300 text-white rounded-sm shadow-lg border border-red-200 p-5 w-full max-w-md mx-auto flex flex-col justify-between">
                    {/* Availability Badge */}
                    <span className="absolute top-1 right-1 border border-green-300 bg-green-100 text-green-500 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ">
                        Available
                    </span>

                    {/* Donor Info */}
                    <div className="flex items-center gap-4">

                        <img  src={donor.image || "https://i.ibb.co/Fk1ZpJWV/blood-wave.png"} alt={donor.name} className="w-16 h-16 rounded-full object-cover border-2 border-red-300"/>
                        <div>
                        <h2 className="text-lg font-bold text-red-600">{donor.name}</h2>
                        <p className="text-sm text-gray-600">Blood Group: <span className="font-semibold text-black">{donor.bloodGroup}</span></p>
                        <p className="text-sm text-gray-600">District: <span className="font-semibold text-black">{donor.district}</span></p>
                        </div>
                    </div>

                    {/* Extra Info */}
                    <div className="mt-4 space-y-1 text-sm text-gray-700">
                        {donor.area &&
                            <p><span className="font-medium text-gray-900">Area:</span> {donor.area}</p>
                        }
                        <p><span className="font-medium text-gray-900">Gender:</span> {donor.gender}</p>
                        {
                            donor?.phone && <p><span className="font-medium text-gray-900">Number:</span> {donor.phone}</p>
                        }
                        <p>
                        <span className="font-medium text-gray-900">Last Donation: </span>
                        {donor.lastDonation
                            ? `${formatDistanceToNow(new Date(donor.lastDonation))} ago`
                            : "Not donated yet"}
                        </p>
                    </div>

                    {/* Call Button */}
                    <div className="mt-5 flex flex-col md:flex-row gap-3">
                        <button onClick={()=> {if(!user){
                                    toast.error('For Blood Request You Need an Account');
                                    return;
                        }}} className='w-full cursor-pointer hover:scale-x-90 duration-500 '>
                            <a 
                                href={donor.phoneVisibility === "public" ? `tel:${donor.phone}` : undefined} 
                                className={`inline-block w-full text-center font-semibold py-2 px-4 rounded-xl transition-all duration-200 ${donor.phoneVisibility === "public" ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer" : "bg-red-500 text-white cursor-not-allowed"}`} 
                                onClick={(e)=> {if(donor.phoneVisibility !== 'public'){e.preventDefault();}}} >Call Now 
                            </a>
                        </button>

                          {/* Request Contact Button */}
                        <button
                            className="inline-block w-full text-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-600 transition-all cursor-pointer hover:scale-x-90 duration-500"
                            onClick={() => {
                                    if(!user){
                                    navigate('/register'); 
                                    toast.error('For Blood Request You Need an Account');
                                    return;
                                }
                                handleOpenModal(donor)
                            }} > Request
                        </button>
                    </div>




     {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-tl from-red-100 to-red-200 text-black rounded p-6 w-full max-w-md">
            <h2 className="text-xl mb-4 font-semibold text-center">Send Blood Request to {selectedDonor.name}</h2>

            <div className='flex justify-center items-center gap-5'>
                <div className='w-28 h-28 rounded-full border-4 border-red-500 overflow-hidden'>
                    <img className='w-full h-full object-cover' src={user.photoURL} alt="" />
                </div>
                <div className='text-red-500 font-bold text-2xl'><FaArrowRightArrowLeft /></div>
                <div className='w-28 h-28 rounded-full border-4 border-red-500 overflow-hidden'>
                    <img className='w-full h-full object-cover' src={selectedDonor.image} alt="" />
                </div>
            </div>

            <label className="block mb-2"> Message:
              <textarea className="w-full border-2 p-2 rounded duration-300 focus:outline-none focus:border-2 focus:border-red-400"  value={message}
               onChange={e => setMessage(e.target.value)}  rows={3} />
            </label>

            <label className="block mb-2">  Emergency Type:
              <select  className="w-full border-2 p-2 rounded duration-300 focus:outline-none focus:border-2 focus:border-red-400"  value={emergencyType}  onChange={e => setEmergencyType(e.target.value)}  >
                <option value="">Select type</option>
                <option value="Accident">Accident</option>
                <option value="Surgery">Surgery</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="block mb-4"> Need Date:
              <input  type="date" className="w-full border-2 p-2 rounded duration-300 focus:outline-none focus:border-2 focus:border-red-400" value={needDate}  onChange={e => setNeedDate(e.target.value)} />
            </label>

            <div className="flex justify-end gap-4">
                <button onClick={handleCloseModal} className="px-4 py-2 rounded  bg-red-500 border text-white hover:bg-red-600/80 duration-300 hover:scale-x-110 cursor-pointer">
                    Cancel  
                </button>
                <button onClick={handleRequest} className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600/90 duration-300 hover:scale-x-90 cursor-pointer" >
                    Send Request
                </button>
            </div>

          </div>
        </div>
      )}




                </div>
                ))
            }
            </div>


            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    disabled={page === 1 || isFetching}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className={`px-4 py-2 rounded bg-green-500 text-white disabled:bg-red-400`} >
                    Previous
                </button>

                <span>Page {page}</span>

                <button
                    disabled={!donors?.data || page * limit >= donors.activeTotal  || isFetching}
                    onClick={() => setPage(prev => prev + 1)}
                    className={`px-4 py-2 rounded bg-green-500 text-white disabled:bg-red-400`}
                >
                    Next
                </button>
            </div>


        </div>
    );
};

export default FindDonor;