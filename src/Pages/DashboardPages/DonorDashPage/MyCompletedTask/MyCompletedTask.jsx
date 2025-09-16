import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { format } from 'date-fns';
import { CheckCircle } from 'lucide-react';
import CountUp from 'react-countup';

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
        <div className="flex flex-col justify-center items-center py-10 min-h-screen">
            <img 
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" 
                alt="No data" 
                className="w-24 h-24 mb-4 opacity-70"
            />
            <p className="text-gray-500 text-lg font-medium">No Completed Task Found</p>
        </div>
        );
    }

    return (
      <div className="px-4 py-10 space-y-10">
        {/* Donation Counter */}
        <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200    rounded-2xl shadow-lg p-8 text-center border border-purple-300">
          <h2 className="text-2xl font-bold text-purple-900 mb-2">My Total Blood Donations </h2>
          <p className="text-5xl font-extrabold text-red-600 drop-shadow-md">
            <CountUp start={0} end={tasks.length} duration={2.5} />
          </p>
          <p className="mt-2 text-gray-700">
            Thank you for saving lives ❤️
          </p>
        </div>

        {/* Completed Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50
                        rounded-2xl shadow-lg border border-purple-300
                        p-6 text-gray-800 transition-transform duration-500 ease-in-out 
                        hover:shadow-2xl hover:scale-[0.99] hover:from-purple-100 hover:via-pink-100 hover:to-blue-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-purple-800">{task.requestDetails.sendername}</h2>
                <span className="flex items-center gap-2 text-green-600 font-semibold">
                  <CheckCircle size={24} />
                  Completed
                </span>
              </div>

              {/* Donor Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium w-28">Donor:</span>
                  <span>{task.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium w-28">Donor Email:</span>
                  <span>{task.email}</span>
                </div>
              </div>

              {/* Request Details */}
              <div className="mt-4 border-t border-gray-300 pt-4 space-y-3">
                <h3 className="font-semibold text-gray-700">Blood Request Details</h3>
                <div className="flex items-center gap-3">
                  <span className="font-medium w-32">Blood Group:</span>
                  <span>{task.requestDetails.bloodGroup}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium w-32">Emergency Type:</span>
                  <span>{task.requestDetails.emergencyType}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium w-32">Message:</span>
                  <span>{task.requestDetails.message}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium w-32">Requested Date:</span>
                  <span>{task.requestDetails.needDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium w-32">Request Time:</span>
                  <span>{format(new Date(task.requestDetails.requestTime), 'PPpp')}</span>
                </div>
              </div>

              {/* Completed Info */}
              <div className="mt-4 border-t border-gray-300 pt-3 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium w-28">Accepted At:</span>
                  <span>{format(new Date(task.acceptedAt), 'PPpp')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium w-28">Completed At:</span>
                  <span>{format(new Date(task.completedAt), 'PPpp')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default MyCompletedTask;