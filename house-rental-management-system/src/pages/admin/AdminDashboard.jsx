// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { FaUsers, FaBuilding, FaHome, FaChartLine } from "react-icons/fa";
import StatisticsCard from "../../components/common/StatisticsCard";
import { useApp } from "../../context/AppContext";
import ChartMonthlyEarnings from "../../components/dashboard/ChartMonthlyEarnings";
import PropertyOccupancyChart from "../../components/dashboard/PropertyOccupancyChart";

const AdminDashboard = () => {
  const { users, properties, rentalRequests } = useApp();

  const totalUsers = users.length;
  const totalOwners = users.filter((u) => u.role === "owner").length;
  const totalTenants = users.filter((u) => u.role === "tenant").length;
  const totalProperties = properties.length;
  const activeRentals = rentalRequests.filter(
    (r) => r.status === "approved",
  ).length;
  const pendingProperties = properties.filter(
    (p) => p.status === "pending",
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FaUsers,
      color: "bg-blue-500",
    },
    {
      title: "Total Owners",
      value: totalOwners,
      icon: FaUsers,
      color: "bg-green-500",
    },
    {
      title: "Total Tenants",
      value: totalTenants,
      icon: FaUsers,
      color: "bg-purple-500",
    },
    {
      title: "Total Properties",
      value: totalProperties,
      icon: FaBuilding,
      color: "bg-yellow-500",
    },
    {
      title: "Active Rentals",
      value: activeRentals,
      icon: FaHome,
      color: "bg-red-500",
    },
    {
      title: "Pending Approval",
      value: pendingProperties,
      icon: FaChartLine,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Monthly Platform Revenue</h2>
          <ChartMonthlyEarnings />
        </div>
        <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Property Occupancy Rate</h2>
          <PropertyOccupancyChart />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Recent Properties Pending Approval
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-secondary-700">
              <tr>
                <th className="px-4 py-2 text-left">Property Name</th>
                <th className="px-4 py-2 text-left">Owner</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties
                .filter((p) => p.status === "pending")
                .map((property) => {
                  const owner = users.find((u) => u.id === property.ownerId);
                  return (
                    <tr
                      key={property.id}
                      className="border-b dark:border-secondary-700"
                    >
                      <td className="px-4 py-2">{property.name}</td>
                      <td className="px-4 py-2">{owner?.name}</td>
                      <td className="px-4 py-2">${property.rent}</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-green-600 hover:text-green-700 mr-2">
                          Approve
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
