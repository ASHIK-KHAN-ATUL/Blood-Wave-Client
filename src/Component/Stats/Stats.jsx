import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import {
  HiOutlineBeaker,
  HiOutlineHeart,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { MdBloodtype } from "react-icons/md";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const Stats = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["homepage-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/stats");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600 mb-4"></div>
        <p className="text-center text-xl font-semibold text-red-600">
          Loading Stats...
        </p>
      </div>
    );

  const statCards = [
    {
      title: "Total Donors",
      value: stats.donor,
      icon: <HiOutlineBeaker className="text-5xl text-red-600 mb-4 mx-auto" />,
      gradient: "from-red-200 to-pink-200",
      border: "border-red-300",
      subtitle: "Since launch",
    },
    {
      title: "Active Donors",
      value: stats.activeDonor,
      icon: <HiOutlineHeart className="text-5xl text-green-600 mb-4 mx-auto" />,
      gradient: "from-green-200 to-teal-200",
      border: "border-green-300",
      subtitle: "Recently active",
    },
    {
      title: "Total Users",
      value: stats.totalUser,
      icon: (
        <HiOutlineUserGroup className="text-5xl text-blue-600 mb-4 mx-auto" />
      ),
      gradient: "from-blue-200 to-indigo-200",
      border: "border-blue-300",
      subtitle: "All registered users",
    },
    {
      title: "Blood Requests",
      value: stats.totalBloodReq,
      icon: <MdBloodtype className="text-5xl text-red-700 mb-4 mx-auto" />,
      gradient: "from-pink-100 to-red-200",
      border: "border-pink-300",
      subtitle: "Requests made",
    },
  ];

  return (
    <div className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 text-red-600">
        Blood-Wave Live Stats
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-black">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-r ${card.gradient} border ${card.border} shadow-lg rounded-2xl p-6 transition-all duration-300`}
          >
            {card.icon}
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-4xl font-bold text-black">
              <CountUp end={card.value} duration={2} />
            </p>
            <p className="text-sm mt-1 text-gray-700">{card.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
