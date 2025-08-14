import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const MyTask = () => {
    
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: task, isLoading, refetch} = useQuery({
        queryKey: ['myTask', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/task/${user.email}`);
            return res.data;
        }
    })
    // console.log("Task",task);

    const {data: request,} = useQuery({
        queryKey: ['request', task?.bloodRequestId],
        enabled: !!task?.bloodRequestId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/request/${task?.bloodRequestId}`);
            return res.data;
        }
    })
    // console.log("Request :",request);

    const handleComplete = async() => {
        if(!task || !request) return;

        const res = await axiosSecure.patch(`task/complete/${task._id}`, {
            donorId: task.donorId,
            requestId: request._id,
        })
        if(res.data.taskUpdateResult.modifiedCount > 0){
            toast.success('Task is Completed');
            refetch();
        } else {
            toast.error('Failed to complete the task');
        }
    }


    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center py-10 min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="flex flex-col justify-center items-center py-10 min-h-screen text-black">
                <p className="font-semibold text-2xl mb-4">No active task found</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0H5" />
                </svg>
                <p className="mt-2">You currently have no assigned tasks.</p>
            </div>
        );
    }


    return (
        <div className="max-w-xl mx-auto mt-10 bg-gradient-to-br from-[#fa5d5d62] via-[#ffe5f183] to-[#b7f5f59a] rounded-2xl shadow-lg border border-gray-100 p-6 text-black">
        <h2 className="text-2xl font-bold  mb-4">{request?.sendername}</h2>

        <div className="space-y-3">
            {/* Status */}
            <div className="flex items-center gap-3">
            <span className=" font-medium w-28">Status:</span>
            <span
                className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 
                ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                    task.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                    'bg-red-100 text-red-700'
                }`}
            >
                {task.status === 'pending' && <Clock size={16} />}
                {task.status === 'accepted' && <CheckCircle size={16} />}
                {task.status === 'rejected' && <AlertCircle size={16} />}
                {task.status}
            </span>
            </div>

            {/* Requester Email */}
            <div className="flex items-center gap-3">
            <span className=" font-medium w-28">Email:</span>
            <span className="">{request?.senderemail}</span>
            </div>

            {/* Accepted At */}
            <div className="flex items-center gap-3">
            <span className=" font-medium w-28">Accepted At:</span>
            <span className="">
                {task.acceptedAt ? format(new Date(task.acceptedAt), 'PPpp') : 'N/A'}
            </span>
            </div>

            {/* Blood Request Details */}
            {request && (
            <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold text-gray-700">Blood Request Details</h3>
                <p className="text-sm ">Blood Group: {request.bloodGroup}</p>
                <p className="text-sm ">Location: {request.location}</p>
                <p className="text-sm ">Message: {request.message}</p>
            </div>
            )}

            {/* Complete Button */}
            <button
            onClick={handleComplete}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold cursor-pointer hover:scale-x-90 duration-300"
            >
            Mark as Completed
            </button>
        </div>
        </div>
    );
};

export default MyTask;