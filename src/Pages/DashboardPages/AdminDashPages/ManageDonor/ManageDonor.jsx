import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Helmet } from "react-helmet";
import CountUp from "react-countup";
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

const ManageDonor = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: allDonor = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allDonor"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/allDonor/by/admin");
      return res.data;
    },
  });
  // console.log(allDonor);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-10 min-h-screen">
        <p className="text-red-500 font-semibold text-2xl">
          Loading Manage Donor Page
        </p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-4 border-t-red-500 border-white"></div>
      </div>
    );
  }

  const totalDonor = allDonor.length;
  const availableDonor = allDonor.filter(
    (d) => d.availability === "available"
  ).length;
  const unavailableDonor = totalDonor - availableDonor;

  const pieData = [
    { name: "Available", value: availableDonor, color: "#10b981" },
    { name: "Unavailable", value: unavailableDonor, color: "#f43f5e" },
  ];

  const barData = [
    {
      name: "Active",
      value: allDonor.filter((d) => d.status === "active").length,
    },
    {
      name: "Inactive",
      value: allDonor.filter((d) => d.status !== "active").length,
    },
  ];

  const handleDetails = (donor) => {
    setSelectedDonor(donor);
    setShowModal(true);
  };

  return (
    <div className="p-4 space-y-8 text-black">
      <Helmet>
        <title>Manage Donors | Blood Wave</title>
        <meta
          name="description"
          content="Manage all registered blood donors efficiently."
        />
      </Helmet>

      <h2 className="text-2xl font-bold text-center">Manage Donors</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center">
          <h3 className="font-medium text-gray-700">Total Donors</h3>
          <p className="text-2xl font-bold text-gray-900">
            <CountUp end={totalDonor} duration={1.5} />
          </p>
        </div>
        <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-green-100 to-emerald-200 flex flex-col items-center">
          <h3 className="font-medium text-gray-700">Available Donors</h3>
          <p className="text-2xl font-bold text-gray-900">
            <CountUp end={availableDonor} duration={1.5} />
          </p>
        </div>
        <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-rose-100 to-pink-200 flex flex-col items-center">
          <h3 className="font-medium text-gray-700">Unavailable Donors</h3>
          <p className="text-2xl font-bold text-gray-900">
            <CountUp end={unavailableDonor} duration={1.5} />
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Donor Availability
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

        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Donor Status
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
      </div>

      {/* Donor Table */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="table w-full border text-black text-sm">
          <thead>
            <tr className="text-white bg-black sticky top-0 z-10">
              <th>#</th>
              <th>Name</th>
              <th>Email / Phone</th>
              <th>Status</th>
              <th>Total Req</th>
              <th>Pending</th>
              <th>Accepted</th>
              <th>Rejected</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allDonor.map((donor, idx) => (
              <tr key={donor._id} className="border border-black">
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={donor.image} alt={donor.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{donor.name}</div>
                      <div className="text-sm opacity-50">
                        {donor.district || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{donor.email}</p>
                  <p>{donor.phone}</p>
                </td>
                <td>
                  <span
                    className={`badge ${
                      donor.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    } capitalize cursor-pointer`}
                  >
                    {donor.status}
                  </span>
                </td>
                <td className="text-center text-blue-500 font-bold">
                  {donor.totalRequest || 0}
                </td>
                <td className="text-center font-bold text-yellow-500">
                  {donor.pendingRequest || 0}
                </td>
                <td className="text-center font-bold text-green-500">
                  {donor.acceptedRequests || 0}
                </td>
                <td className="text-center font-bold text-red-600">
                  {donor.rejectedRequests || 0}
                </td>
                <td>
                  <button
                    onClick={() => handleDetails(donor)}
                    className="btn btn-warning btn-sm"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedDonor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-tl from-red-100 to-red-200 rounded-xl p-6 w-[90%] max-w-2xl shadow-2xl overflow-y-auto max-h-[90%] relative">
            <button
              className="fixed scale-125 text-red-600 text-xl hover:text-sky-500 font-bold hover:rotate-90 duration-500 cursor-pointer border rounded-full h-7 w-7 flex items-center justify-center"
              onClick={() => {
                setShowModal(false);
                setSelectedDonor(null);
              }}
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-center text-red-600">
              {selectedDonor.name} Details
            </h3>

            <div className="flex flex-col items-center gap-6">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-red-500 shadow-md">
                <img
                  src={selectedDonor.image}
                  alt={selectedDonor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm w-full">
                <p>
                  <span className="font-semibold text-gray-600">ID:</span>{" "}
                  {selectedDonor._id}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Name:</span>{" "}
                  {selectedDonor.name}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Email:</span>{" "}
                  {selectedDonor.email}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Phone:</span>{" "}
                  {selectedDonor.phone}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">
                    Blood Group:
                  </span>{" "}
                  <span className="text-red-500 font-bold">
                    {selectedDonor.bloodGroup}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Gender:</span>{" "}
                  {selectedDonor.gender}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">District:</span>{" "}
                  {selectedDonor.district}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Area:</span>{" "}
                  {selectedDonor.area}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Division:</span>{" "}
                  {selectedDonor.division}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">
                    Availability:
                  </span>{" "}
                  <span
                    className={
                      selectedDonor.availability === "available"
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    {selectedDonor.availability}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-600">
                    Last Donation:
                  </span>{" "}
                  {selectedDonor.lastDonation
                    ? `${formatDistanceToNow(
                        new Date(selectedDonor.lastDonation)
                      )} ago`
                    : "No Record"}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">Status:</span>{" "}
                  <span
                    className={
                      selectedDonor.status === "active"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {selectedDonor.status}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-600">
                    Total Requests:
                  </span>{" "}
                  {selectedDonor.totalRequest || 0}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">
                    Pending Requests:
                  </span>{" "}
                  {selectedDonor.pendingRequest || 0}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">
                    Accepted Requests:
                  </span>{" "}
                  {selectedDonor.acceptedRequests || 0}
                </p>
                <p>
                  <span className="font-semibold text-gray-600">
                    Rejected Requests:
                  </span>{" "}
                  {selectedDonor.rejectedRequests || 0}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-semibold text-gray-600">Message:</span>{" "}
                  {selectedDonor.message || "No Message"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDonor;
