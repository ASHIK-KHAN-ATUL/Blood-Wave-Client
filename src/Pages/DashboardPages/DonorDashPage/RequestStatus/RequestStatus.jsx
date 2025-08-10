import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const RequestStatus = () => {

    const {user} = useAuth()
    const [filterStatus, setFilterStatus] = useState('all');
    const axiosSecure = useAxiosSecure();

    const {data: requests=[], isLoading, isError, refetch} = useQuery({
        queryKey: ['request', user?.email],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosSecure.get(`/blood-requests/donor/status?email=${user?.email}`);
            return res.data
        }
    })
    console.log(requests)

      // Filter requests based on filterStatus
    const filteredRequests = filterStatus === 'all' ? requests : requests.filter((req) => req.status === filterStatus);

    if (isLoading) return <div className="text-center">Loading requests...</div>;
    if (isError) return <div className="text-center text-red-600">Error loading requests.</div>;


    return (
    <div className="mx-auto p-2 md:p-6 h-full max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Requests Status</h2>

      {/* Filter Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-4 mb-6">
        {['all', 'accepted', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded font-semibold transition cursor-pointer ${
              filterStatus === status
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-red-100 text-red-700 hover:bg-red-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Filtered Requests List */}
      <ul className="space-y-4 text-black text-sm max-h-lvh overflow-y-auto">
        {filteredRequests.length === 0 ? (
          <p className="text-center text-gray-600">No requests found.</p>
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