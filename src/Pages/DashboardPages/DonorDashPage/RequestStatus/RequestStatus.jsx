import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const RequestStatus = () => {

    const {user} = useAuth()
    const [filterStatus, setFilterStatus] = useState('all');
    const axiosSecure = useAxiosSecure();

    // console.log(user.email)

    const {data: requests=[], isLoading, isError, refetch} = useQuery({
        queryKey: ['request', user?.email],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosSecure.get(`/blood-requests/donor/status?email=${user?.email}`);
            return res.data
        }
    })
    // console.log(requests)

        if (isLoading){
                return (
            <div className="flex flex-col justify-center items-center py-10 min-h-screen ">
                <p className='text-red-500 font-semibold text-2xl'>Loading My Request Page</p>
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
            </div>
        )
    }

      // Filter requests based on filterStatus
    const filteredRequests = filterStatus === 'all' ? requests : requests.filter((req) => req.status === filterStatus);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center py-10 min-h-screen">
            <p className="text-red-500 font-semibold text-2xl mb-4">Loading Request Status Page...</p>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
            </div>
        );
    }


    if (isError) return <div className="text-center text-red-600">Error loading requests.</div>;


    return (
    <div className="mx-auto p-2 md:p-6 h-full max-w-4xl text-black">
      <h2 className="text-3xl font-bold mb-6 text-center">Requests Status</h2>

      {/* Filter Buttons */}
      <div className="grid grid-cols-3 justify-center gap-4 mb-6">
        {['all', 'accepted', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded font-semibold transition cursor-pointer capitalize ${
              filterStatus === status
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-red-100 text-red-700 hover:bg-red-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Filtered Requests List */}
      <ul className="space-y-4 text-black text-sm max-h-lvh overflow-y-auto">
        {filteredRequests.length === 0 ? (
          <p className="text-center ">No requests found.</p>
        ) : (
          filteredRequests.map((req) => (
            <li
              key={req._id}
              className=" bg-gradient-to-br from-[#fa5d5d62] via-[#ffe5f183] to-[#b7f5f59a] border border-gray-300 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={req.senderimage || 'https://i.ibb.co/Fk1ZpJWV/blood-wave.png'}
                  alt={req.sendername || 'Sender'}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
                />
                <div>
                  <h3 className="font-semibold text-lg">{req.sendername || 'Unknown'}</h3>

                  <p>
                    <strong>Phone:</strong> {req.senderphone || 'N/A'}
                  </p>

                  <p className=" mb-1"><strong>Request Time:</strong> {req.requestTime ? new Date(req.requestTime).toLocaleDateString('en-GB', {    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',}) : 'N/A'}</p>

                <p className=" mb-1"><strong>Status Change Time :</strong> {req.statusTime ? new Date(req.statusTime).toLocaleDateString('en-GB', {    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',}) : 'N/A'}</p>
                  <p>
                    
                    <strong>Status:</strong>{' '}
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                        req.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : req.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : 'Pending'}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
    );
};

export default RequestStatus;