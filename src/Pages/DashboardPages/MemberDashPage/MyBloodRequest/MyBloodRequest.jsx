import React, { useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const MyBloodRequest = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const [filterStatus, setFilterStatus] = useState('all');

    const {data: requests=[], isLoading, isError} = useQuery({
        queryKey: ['myBloodRequest', user?.email],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosPublic.get(`/my-blood-requests?email=${user?.email}`);
            return res.data
        }
    })
    // console.log(requests);

    const filteredRequests = requests.filter(req => {
        if (filterStatus === 'all') return true;
        return req.status?.toLowerCase() === filterStatus;
    });


    if (isLoading){
                return (
            <div className="flex flex-col justify-center items-center py-10 min-h-screen ">
                <p className='text-red-500 font-semibold text-2xl'>Loading My Request Page</p>
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
            </div>
        )
    }
    if (isError) return <div>Error loading requests.</div>;

    return (
    <div className=" mx-auto p-2 md:p-6 h-full text-black">
      <h2 className="text-3xl font-bold mb-6 text-center">My Blood Requests</h2>

      {/* Filter Buttons */}
      <div className=" grid grid-cols-2 md:grid-cols-4 justify-center gap-4 mb-6 ">
        {['all', 'pending', 'accepted', 'rejected'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded font-semibold transition cursor-pointer capitalize
              ${
                filterStatus === status
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-red-100 text-red-700 hover:bg-red-300'
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500">No blood requests found.</p>
      ) : (
        <ul className="space-y-6 max-h-lvh overflow-y-auto ">
          {filteredRequests.map((req) => (
            <li key={req._id} className="flex flex-col sm:flex-row gap-5 p-5  shadow-lg bg-gradient-to-br from-[#fa5d5d62] via-[#ffe5f183] to-[#b7f5f59a] hover:shadow-lg transition duration-300 items-center border-2 border-red-400/10 text-sm">
            
            {/* Donor Image */}
            <img
                src={req.reciverimage}
                alt={req.recivername || 'Donor Image'}
                className="w-20 h-20 rounded-full object-cover border-4 border-red-400 shadow-md"
            />

            {/* Text Content */}
            <div className="w-full grid md:grid-cols-2">
                <h3 className="text-xl font-bold text-red-700 mb-1">{req.recivername || 'N/A'}</h3>
                <p className="text-gray-700 mb-1"><strong>Email:</strong> {req.reciveremail || 'N/A'}</p>
                <p className=" mb-1"><strong>Message:</strong> {req.message || 'N/A'}</p>
                <p className=" mb-1"><strong>Emergency Type:</strong> {req.emergencyType || 'N/A'}</p>
                <p className=" mb-1"><strong>Need Date:</strong> {req.needDate ? new Date(req.needDate).toLocaleDateString() : 'N/A'}</p>
                <p className=" mb-1"><strong>Request Time:</strong> {req.requestTime ? new Date(req.requestTime).toLocaleDateString('en-GB', {    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',}) : 'N/A'}</p>
                <p className=" mb-1"><strong>Status Channge Time :</strong> {req.statusTime ? new Date(req.statusTime).toLocaleDateString('en-GB', {    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',}) : 'No Response From Donor'}</p>
                
                {/* Status Badge */}
                <div className={` mt-2 px-3 py-1 rounded-full text-sm font-semibold w-20
                ${
                    req.status === 'accepted' ? 'bg-green-100 text-green-600 border border-green-300 ' :
                    req.status === 'rejected' ? 'bg-red-100 text-red-600 border border-red-300 ' :
                    'bg-amber-100 text-amber-600 border border-amber-300 '
                }
                `}>
                {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : 'Pending'}
                </div>
            </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    );
};

export default MyBloodRequest;