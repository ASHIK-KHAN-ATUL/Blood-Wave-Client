import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import CountUp from "react-countup";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
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

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: allUser = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/allUser/by/admin");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center py-10 min-h-screen">
        <p className="text-red-500 font-semibold text-2xl">
          Loading All User Page
        </p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
      </div>
    );

  // Stats calculation
  const totalUsers = allUser.length;
  const totalAdmins = allUser.filter((u) => u.role === "admin").length;
  const totalDonors = allUser.filter((u) => u.role === "donor").length;
  const totalMembers = allUser.filter((u) => u.role === "member").length;
  const activeUsers = allUser.filter((u) => u.status === "active").length;
  const inactiveUsers = allUser.filter((u) => u.status !== "active").length;

  const statsCards = [
    {
      title: "Total Users",
      value: totalUsers,
      color: "from-blue-100 to-blue-200",
    },
    {
      title: "Admins",
      value: totalAdmins,
      color: "from-purple-100 to-purple-200",
    },
    { title: "Donors", value: totalDonors, color: "from-rose-100 to-pink-200" },
    {
      title: "Members",
      value: totalMembers,
      color: "from-green-100 to-emerald-200",
    },
    {
      title: "Active Users",
      value: activeUsers,
      color: "from-emerald-100 to-teal-200",
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      color: "from-gray-100 to-gray-200",
    },
  ];

  // Charts data
  const pieData = [
    { name: "Admins", value: totalAdmins, color: "#7c3aed" },
    { name: "Donors", value: totalDonors, color: "#ef4444" },
    { name: "Members", value: totalMembers, color: "#10b981" },
  ];

  const barData = [
    { name: "Active", value: activeUsers },
    { name: "Inactive", value: inactiveUsers },
  ];

  // Handlers
  const handleChangeStatus = async (id) => {
    const user = allUser.find((u) => u._id === id);
    if (user.email === "ashikkhan693693@gmail.com") {
      toast.info("You cannot change Boss status");
      return;
    }

    const res = await axiosSecure.patch(`/users/user/status/${id}`);
    if (res.data.modifiedCount > 0) {
      toast.success("User status updated");
      refetch();
    } else toast.error("Failed to update status");
  };

  const handleDelete = async (id) => {
    const user = allUser.find((u) => u._id === id);
    if (user.email === "ashikkhan693693@gmail.com") {
      toast.info("You cannot delete Boss account");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/users/user/delete/${id}`);
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
        refetch();
      }
    }
  };

  return (
    <div className="p-4 text-black space-y-8">
      <Helmet>
        <title>All Users | Blood Wave Admin Dashboard</title>
      </Helmet>

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
        👥 All Users Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statsCards.map((card, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl shadow-md bg-gradient-to-r ${card.color} flex flex-col items-center justify-center transition hover:scale-102 hover:shadow-lg`}
          >
            <p className="text-gray-700 text-sm">{card.title}</p>
            <p className="text-2xl font-bold text-gray-900">
              <CountUp end={card.value} duration={1.5} />
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700 text-center">
            User Role Distribution
          </h2>
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
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700 text-center">
            User Status Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto max-h-screen overflow-y-auto">
        <table className="table w-full border text-black text-sm">
          <thead>
            <tr className="text-white bg-black sticky top-0 z-10">
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((user, index) => (
              <tr
                key={user._id}
                className="border border-black hover:bg-gray-100"
              >
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.image} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">
                        {user.district || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                </td>
                <td>
                  <span
                    className={`badge capitalize ${
                      user.role === "admin"
                        ? "badge-warning"
                        : user.role === "donor"
                        ? "badge-success"
                        : "badge-info"
                    }`}
                  >
                    {user.role || "member"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleChangeStatus(user._id)}
                    className={`badge badge-outline capitalize cursor-pointer ${
                      user.status === "active"
                        ? "badge-success bg-green-500/20"
                        : "badge-error bg-red-500/20"
                    }`}
                  >
                    {user.status}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
