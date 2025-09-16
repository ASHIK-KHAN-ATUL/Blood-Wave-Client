import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const CompletedDonation = () => {
  const axiosSecure = useAxiosSecure();

  const { data: completedDonation = [] } = useQuery({
    queryKey: ["completedDonation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/allCompletedBloodDonation");
      return res.data;
    },
  });
  console.log(completedDonation);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {completedDonation.map((donation, index) => (
        <motion.div
          key={donation._id}
          className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-2xl shadow-lg p-8 border border-purple-300 relative text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Small ID */}
          <span className="absolute top-2 right-2 text-xs text-gray-800">
            ID: {donation._id.slice(0, 6)}
          </span>

          {/* Donor & Receiver Pictures */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col items-center">
              <img
                src={donation.requestDetails?.reciverimage}
                alt={donation.requestDetails?.recivername}
                className="w-14 h-14 rounded-full border-2 border-red-400 object-cover"
              />
              <span className="mt-2 text-sm font-medium text-gray-700">
                {donation.name}
              </span>
            </div>

            {/* Blood transfer symbol */}
            <div className="flex items-center justify-center bg-white text-red-600 rounded-full w-10 h-10 animate-bounce">
              💉
            </div>

            <div className="flex flex-col items-center">
              <img
                src={donation.requestDetails?.senderimage}
                alt={donation.requestDetails?.sendername}
                className="w-14 h-14 rounded-full border-2 border-red-400 object-cover"
              />
              <span className="mt-2 text-sm font-medium text-gray-700">
                {donation.requestDetails?.sendername}
              </span>
            </div>
          </div>

          {/* Blood request info */}
          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">Blood Type:</span>{" "}
              {donation.requestDetails?.bloodGroup}
            </p>
            <p>
              <span className="font-semibold">Emergency Type:</span>{" "}
              {donation.requestDetails?.emergencyType}
            </p>
            <p>
              <span className="font-semibold">Message:</span>{" "}
              {donation.requestDetails?.message || "-"}
            </p>
            <p>
              <span className="font-semibold">Request Date:</span>{" "}
              {new Date(donation.requestDetails?.needDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Accepted At:</span>{" "}
              {new Date(donation.acceptedAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Completed At:</span>{" "}
              {new Date(donation.completedAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-green-600">{donation.status}</span>
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CompletedDonation;
