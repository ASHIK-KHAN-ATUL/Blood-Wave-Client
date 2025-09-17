import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  HeartIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OverView = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-10 min-h-screen">
        <p className="text-red-500 font-semibold text-2xl">
          Loading OverView Page
        </p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
      </div>
    );
  }
  if (isError)
    return <p className="text-center text-red-500">Failed to load stats</p>;

  // Cards data
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUser,
      color: "from-blue-100 to-blue-200",
      icon: <UserGroupIcon className="w-7 h-7 text-blue-600" />,
    },
    {
      title: "Admins",
      value: stats.totalAdmin,
      color: "from-purple-100 to-purple-200",
      icon: <ShieldCheckIcon className="w-7 h-7 text-purple-600" />,
    },
    {
      title: "Donors",
      value: stats.totalDonor,
      color: "from-rose-100 to-pink-200",
      icon: <HeartIcon className="w-7 h-7 text-rose-600" />,
    },
    {
      title: "Members",
      value: stats.totalMember,
      color: "from-green-100 to-emerald-200",
      icon: <UsersIcon className="w-7 h-7 text-green-600" />,
    },
    {
      title: "Active Users",
      value: stats.activeUser,
      color: "from-emerald-100 to-teal-200",
      icon: <CheckCircleIcon className="w-7 h-7 text-emerald-600" />,
    },
    {
      title: "Blocked Users",
      value: stats.blockedUser,
      color: "from-rose-100 to-red-200",
      icon: <XCircleIcon className="w-7 h-7 text-rose-600" />,
    },
    {
      title: "Available Donors",
      value: stats.activeDonor,
      color: "from-teal-100 to-cyan-200",
      icon: <UserIcon className="w-7 h-7 text-cyan-600" />,
    },
    {
      title: "Unavailable Donors",
      value: stats.unavailableDonor,
      color: "from-yellow-100 to-amber-200",
      icon: <ClockIcon className="w-7 h-7 text-yellow-600" />,
    },
    {
      title: "Total Requests",
      value: stats.totalBloodReq,
      color: "from-indigo-100 to-blue-200",
      icon: <ClipboardIcon className="w-7 h-7 text-indigo-600" />,
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequest,
      color: "from-yellow-100 to-orange-200",
      icon: <ClockIcon className="w-7 h-7 text-yellow-600" />,
    },
    {
      title: "Accepted Requests",
      value: stats.acceptedRequest,
      color: "from-green-100 to-lime-200",
      icon: <CheckCircleIcon className="w-7 h-7 text-green-600" />,
    },
    {
      title: "Rejected Requests",
      value: stats.rejectedRequest,
      color: "from-red-100 to-rose-200",
      icon: <XCircleIcon className="w-7 h-7 text-red-600" />,
    },
    {
      title: "Tasks Assigned",
      value: stats.totalTaskAssigned,
      color: "from-cyan-100 to-blue-200",
      icon: <ClipboardDocumentCheckIcon className="w-7 h-7 text-cyan-600" />,
    },
    {
      title: "Completed Tasks",
      value: stats.completedTask,
      color: "from-lime-100 to-green-200",
      icon: <CheckCircleIcon className="w-7 h-7 text-lime-600" />,
    },
  ];

  // Pie chart: Users role
  const pieData = [
    { name: "Admins", value: stats.totalAdmin || 0, color: "#7c3aed" },
    { name: "Donors", value: stats.totalDonor || 0, color: "#ef4444" },
    { name: "Members", value: stats.totalMember || 0, color: "#10b981" },
  ];

  // Bar chart: Requests
  const barData = [
    { name: "Pending", value: stats.pendingRequest || 0 },
    { name: "Accepted", value: stats.acceptedRequest || 0 },
    { name: "Rejected", value: stats.rejectedRequest || 0 },
  ];

  // Task progress chart
  const taskData = [
    { name: "Assigned", value: stats.totalTaskAssigned || 0 },
    { name: "Completed", value: stats.completedTask || 0 },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
        Admin Dashboard Overview
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className={`group p-4 rounded-xl shadow-md bg-gradient-to-r ${stat.color} flex flex-col items-center justify-center relative
                 transition-transform duration-300  hover:shadow-xl`}
          >
            {/* Icon */}
            <div
              className=" transform transition-all duration-700 
                      group-hover:scale-125 group-hover:-translate-x-12 "
            >
              {stat.icon}
            </div>

            {/* Title */}
            <h2 className="text-base font-medium text-gray-500 mt-10 group-hover:-translate-y-2 duration-700">
              {stat.title}
            </h2>

            {/* Value */}
            <p className="text-2xl font-bold text-gray-900 mt-1 group-hover:scale-125 duration-300">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            User Role Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart Requests */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Blood Request Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Progress */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Task Progress
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={taskData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverView;
