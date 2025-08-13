import React, { useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import {  useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const BloodRequest = () => {
    
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const axiosSecure = useAxiosSecure();

    const{data:mainUser={}} = useQuery({
            queryKey : [user?.email, 'mainUser'],
            queryFn: async() => {
                const res = await axiosSecure.get(`/users/user/profile/${user?.email}`);
                return res.data;
          }
    })
    // console.log(mainUser)

    const donorId = mainUser?._id;

    const {data: requests=[], isLoading, isError, refetch} = useQuery({
        queryKey: ['request', user?.email],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosSecure.get(`/blood-requests/donor?email=${user?.email}`);
            return res.data
        }
    })
    // console.log(requests);


    if (isLoading) return <div>Loading your requests...</div>;
    if (isError) return <div>Error loading requests.</div>;

    const handleStatusChange = async(id, status) => {
      console.log(id)
      console.log(status)

      const res = await axiosSecure.patch(`/blood-requests/${id}`, {status,donorId});
      if(res.data.modifiedCount > 0){
        toast.info(`You ${status} the blood request`);
        refetch();
      }else{
        toast.error('Failed to done your action')
      }
    }


    return (
        <div className="p-4 text-black py-20 font-semibold">
            <h2 className="text-2xl font-bold mb-4">All Users ({requests.length})</h2>

            <div className="overflow-x-auto max-h-screen overflow-y-auto">
                <table className="table  w-full border text-black text-sm">
                    {/* Table Head */}
                    <thead >
                        <tr className='text-white bg-black sticky top-0 z-10'>
                            <th></th>
                            <th>User</th>
                            <th>Phone</th>
                            <th>Action </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {
                            requests.map((req, index) => (
                                <tr key={req._id} className='border border-black'>

                                    <td>{index + 1}</td>

                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img  src={req.senderimage}  alt="req Photo"  />
                                            </div>

                                        </div>
                                    </td>

                                    <td>  <p>{req.senderphone}</p>  </td>

                                    <td>
                                        <button onClick={() => setSelectedRequest(req)} className="btn btn-info btn-sm ">
                                            Details
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


             {/* Modal */}
            {selectedRequest && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setSelectedRequest(null)}
              >
                <div
                  className="bg-gradient-to-br from-[#fa5d5d] via-[#FFE5F1] to-[#B7F5F5] rounded-lg max-w-lg w-full p-6 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                    aria-label="Close modal"
                  >
                    &times;
                  </button>

                  {/* Image */}
                  <div className="flex justify-center mb-6">
                    <img
                      src={selectedRequest.senderimage}
                      alt={selectedRequest.sendername || 'Sender Image'}
                      className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-md"
                    />
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-800 mb-6">
                    <p><strong>Name:</strong> {selectedRequest.sendername || 'N/A'}</p>
                    <p><strong>Phone:</strong> {selectedRequest.senderphone || 'N/A'}</p>

                    <p><strong>Email:</strong> {selectedRequest.senderemail || 'N/A'}</p>
                    <p><strong>Status:</strong> {selectedRequest.status || 'Pending'}</p>

                    <p className="col-span-2"><strong>Message:</strong> {selectedRequest.message || 'N/A'}</p>

                    <p><strong>Emergency Type:</strong> {selectedRequest.emergencyType || 'N/A'}</p>
                    <p><strong>Blood Group:</strong> {selectedRequest.bloodGroup || 'N/A'}</p>

                    <p><strong>Need Date:</strong> {selectedRequest.needDate ? new Date(selectedRequest.needDate).toLocaleDateString() : 'N/A'}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={() => {
                        handleStatusChange(selectedRequest._id, 'accepted');
                        setSelectedRequest(null);
                      }}
                      disabled={selectedRequest.status === 'accepted'}
                      className={`px-6 py-2 rounded-xl font-semibold text-white shadow-md transition-colors duration-200 ${
                        selectedRequest.status === 'accepted'
                          ? 'bg-green-300 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => {
                        handleStatusChange(selectedRequest._id, 'rejected');
                        setSelectedRequest(null);
                      }}
                      disabled={selectedRequest.status === 'rejected'}
                      className={`px-6 py-2 rounded-xl font-semibold text-white shadow-md transition-colors duration-200 ${
                        selectedRequest.status === 'rejected'
                          ? 'bg-red-300 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            )}

        </div>
    );
};

export default BloodRequest;