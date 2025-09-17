import React from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../../Hooks/useAuth";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";

const BloodReceived = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: bloodrecive = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bloodrecive", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bloodRecive/completed/${user?.email}`
      );
      return res.data;
    },
  });

  // Helper to safely format dates
  const parseDate = (date) => {
    if (!date) return "No Date";
    const d = new Date(date);
    return isNaN(d) ? "Invalid Date" : format(d, "PPpp");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-10 min-h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
      </div>
    );
  }

  if (!bloodrecive || bloodrecive.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-10 min-h-screen">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No data"
          className="w-24 h-24 mb-4 opacity-70"
        />
        <p className="text-gray-500 text-lg font-medium">
          No -- Blood Recived Found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5">
      {bloodrecive.map((task) => (
        <div
          key={task._id}
          className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50
                      rounded-2xl shadow-lg border border-purple-300
                      p-6 text-gray-800 transition-transform duration-500 ease-in-out 
                      hover:shadow-2xl hover:scale-[0.99] hover:from-purple-100 hover:via-pink-100 hover:to-blue-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-purple-800">
              {task.requestDetails?.sendername || "Unknown"}
            </h2>
            <span className="flex items-center gap-2 text-green-600 font-semibold">
              <CheckCircle size={24} />
              Completed
            </span>
          </div>

          {/* Donor Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-medium w-28">Donor:</span>
              <span>{task.name || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium w-28">Donor Email:</span>
              <span>{task.email || "N/A"}</span>
            </div>
          </div>

          {/* Request Details */}
          <div className="mt-4 border-t border-gray-300 pt-4 space-y-3">
            <h3 className="font-semibold text-gray-700">
              Blood Request Details
            </h3>
            <div className="flex items-center gap-3">
              <span className="font-medium w-32">Blood Group:</span>
              <span>{task.requestDetails?.bloodGroup || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium w-32">Emergency Type:</span>
              <span>{task.requestDetails?.emergencyType || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium w-32">Message:</span>
              <span>{task.requestDetails?.message || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium w-32">Requested Date:</span>
              <span>{task.requestDetails?.needDate || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium w-32">Request Time:</span>
              <span>{parseDate(task.requestDetails?.requestTime)}</span>
            </div>
          </div>

          {/* Completed Info */}
          <div className="mt-4 border-t border-gray-300 pt-3 space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-medium w-28">Accepted At:</span>
              <span>{parseDate(task.acceptedAt)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium w-28">Completed At:</span>
              <span>{parseDate(task.completedAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BloodReceived;
