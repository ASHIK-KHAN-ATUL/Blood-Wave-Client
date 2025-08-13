import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Helmet } from 'react-helmet';
import CountUp from 'react-countup';

const ManageDonor = () => {

    const axiosSecure = useAxiosSecure();
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const {data: allDonor=[] , isLoading, refetch} = useQuery({
        queryKey: ['allDonor'],
        queryFn: async() => {
            const res = await axiosSecure.get('/users/allDonor/by/admin');
            return res.data;
        }
    })
    console.log(allDonor);

    if (isLoading){
                return (
            <div className="flex flex-col justify-center items-center py-10 min-h-screen ">
                <p className='text-red-500 font-semibold text-2xl'>Loading Manage User Page</p>
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
            </div>
        )
    }


    const handleDetails = async(user) =>{
        console.log(user);
        setSelectedDonor(user);
        setShowModal(true);
    }

    return (
        <div className="p-4  text-black">

        <Helmet>
            <title>Manage Donors | Blood Wave</title>
            <meta
            name="description"
            content="Manage all registered blood donors on Blood Wave platform efficiently."
            />
            <meta
            name="keywords"
            content="manage donors, blood wave, blood donation, donor management"
            />
            <link rel="canonical" href="https://blood-wave.netlify.app" />
        </Helmet>

            <h2 className="text-xl font-bold mb-4 text-right"> All Donor (<CountUp end={allDonor.length} duration={2} />)  </h2>

            <div className="overflow-x-auto max-h-screen overflow-y-auto">
                <table className="table  w-full border text-black text-sm ">
                    {/* Table Head */}
                    <thead >
                        <tr className='text-white bg-black sticky top-0 z-10'>
                            <th></th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {
                            allDonor.map((user, index) => (
                                <tr key={user._id} className='border border-black'>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img  src={user.image}  alt="user Photo"  />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-sm opacity-50">{user.district || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{user.email}</p>
                                        <p>{user.phone}</p>
                                    </td>
                                    <td className=''>
                                        <span  className={`badge badge-success  capitalize cursor-pointer `}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={()=>{  
                                            handleDetails(user) ; 
                                            setShowModal(true) }} className="btn btn-warning  btn-sm ">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {showModal && selectedDonor && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 max-h-screen">
                <div className="bg-gradient-to-tl from-red-100 to-red-200 rounded-xl p-6 w-[90%] max-w-2xl shadow-2xl relative max-h-[90%] overflow-y-auto">
                    {/* Close Button */}
                    <button
                    className="fixed  scale-125 text-red-600 text-xl hover:text-sky-500 font-bold hover:rotate-90 duration-500 cursor-pointer border  rounded-full h-7 w-7 flex items-center justify-center"
                    onClick={() => {
                        setShowModal(false);
                        setSelectedDonor(null);
                    }}  >  ✕  </button>

                    {/* Header */}
                    <h3 className="text-2xl font-semibold mb-4 text-center text-red-600">{selectedDonor.name} Details</h3>

                    <div className="flex flex-col items-center gap-6">
                    {/* Donor Image */}
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-red-500 shadow-md">
                        <img
                        src={selectedDonor.image}
                        alt={selectedDonor.name}
                        className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Donor Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm w-full">
                        <p><span className="font-semibold text-gray-600">ID:</span> {selectedDonor._id}</p>
                        <p><span className="font-semibold text-gray-600">Name:</span> {selectedDonor.name}</p>
                        <p><span className="font-semibold text-gray-600">Email:</span> {selectedDonor.email}</p>
                        <p><span className="font-semibold text-gray-600">Phone:</span> {selectedDonor.phone}</p>
                        <p><span className="font-semibold text-gray-600">Blood Group:</span> <span className="text-red-500 font-bold">{selectedDonor.bloodGroup}</span></p>
                        <p><span className="font-semibold text-gray-600">Gender:</span> {selectedDonor.gender}</p>
                        <p><span className="font-semibold text-gray-600">District:</span> {selectedDonor.district}</p>
                        <p><span className="font-semibold text-gray-600">Area:</span> {selectedDonor.area}</p>
                        <p><span className="font-semibold text-gray-600">Division:</span> {selectedDonor.division}</p>
                        <p><span className="font-semibold text-gray-600">Availability:</span> <span className={`font-semibold ${selectedDonor.availability === 'available' ? 'text-green-600' : 'text-gray-500'}`}>{selectedDonor.availability}</span></p>
                        <p><span className="font-semibold text-gray-600">Last Donation: </span>
                         {selectedDonor.lastDonation ? `${formatDistanceToNow(new Date(selectedDonor.lastDonation))} ago` : 'No Record'}
                        </p>
                        <p><span className="font-semibold text-gray-600">Status:</span> <span className={`font-bold ${selectedDonor.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>{selectedDonor.status}</span></p>
                        <p className="sm:col-span-2"><span className="font-semibold text-gray-600">Message:</span> {selectedDonor.message}</p>
                    </div>
                    </div>
                </div>
                </div>
            )}

        </div>
    );
};

export default ManageDonor;