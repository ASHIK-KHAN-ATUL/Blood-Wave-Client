import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { format } from 'date-fns';
import { CheckCircle } from 'lucide-react';

const MyCompletedTask = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: tasks, isLoading, refetch} = useQuery({
        queryKey: ['myTasks', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/mytask/completed/${user.email}`);
            return res.data;
        }
    })
    // console.log("Tasks",tasks);

    if (isLoading) {
        return (
        <div className="flex flex-col justify-center items-center py-10 min-h-screen ">
            <p className="text-red-500 font-semibold text-2xl">Loading Completed Tasks...</p>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
        </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
        <div className="flex flex-col justify-center items-center py-10 min-h-screen text-gray-500">
            <p className="text-xl font-semibold">You have no completed tasks yet.</p>
        </div>
        );
    }

    return (
<div className="space-y-6 px-4 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {tasks.map((task) => (
    <div
      key={task._id}
      className="bg-gradient-to-br from-[#fa5d5d62] via-[#ffe5f183] to-[#b7f5f59a]
                 rounded-xl shadow-xl border border-purple-200
                 p-6 text-black hover:translate-x-0.5 hover:bg-gradient-to-br hover:from-purple-200 hover:via-pink-200 hover:to-blue-200  transition-all duration-500 ease-in-out"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{task.requestDetails.sendername}</h2>
        <span className="flex items-center gap-2 text-green-500 font-bold">
          <CheckCircle size={30} />
          Completed
        </span>
      </div>

      {/* Donor info */}
      <div className="flex items-center gap-3 mb-2">
        <span className="font-medium w-28">Donor:</span>
        <span className="text-gray-700">{task.name}</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="font-medium w-28">Donor Email:</span>
        <span className="text-gray-700">{task.email}</span>
      </div>

      {/* Request Details */}
      <div className="mt-4 border-t border-gray-300 pt-4 space-y-2">
        <h3 className="font-semibold text-gray-700">Blood Request Details</h3>
        <div className="flex items-center gap-3">
          <span className="font-medium w-32">Blood Group:</span>
          <span className="text-gray-700">{task.requestDetails.bloodGroup}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium w-32">Emergency Type:</span>
          <span className="text-gray-700">{task.requestDetails.emergencyType}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium w-32">Message:</span>
          <span className="text-gray-700">{task.requestDetails.message}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium w-32">Requested Date:</span>
          <span className="text-gray-700">{task.requestDetails.needDate}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium w-32">Request Time:</span>
          <span className="text-gray-700">{format(new Date(task.requestDetails.requestTime), 'PPpp')}</span>
        </div>
      </div>

      {/* Completed At */}
      <div className="mt-4 border-t border-gray-300 pt-3 space-y-1">
        <div className="flex items-center gap-3">
          <span className="font-medium w-28">Accepted At:</span>
          <span className="text-gray-700">{format(new Date(task.acceptedAt), 'PPpp')}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium w-28">Completed At:</span>
          <span className="text-gray-700">{format(new Date(task.completedAt), 'PPpp')}</span>
        </div>
      </div>
    </div>
  ))}
</div>

    );
};

export default MyCompletedTask;