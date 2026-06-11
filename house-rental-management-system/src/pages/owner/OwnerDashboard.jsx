// src/pages/owner/OwnerDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaUsers, FaDollarSign, FaEye } from "react-icons/fa";
import StatisticsCard from "../../components/common/StatisticsCard";
import PropertyCard from "../../components/common/PropertyCard";
import { useApp } from "../../context/AppContext";
import ChartMonthlyEarnings from "../../components/dashboard/ChartMonthlyEarnings";

const OwnerDashboard = () => {
  const { currentUser, properties, rentalRequests } = useApp();

  const myProperties = properties.filter((p) => p.ownerId === currentUser.id);
  const myRentalRequests = rentalRequests.filter((r) => {
    const property = properties.find((p) => p.id === r.propertyId);
    return property?.ownerId === currentUser.id;
  });

  const pendingRequests = myRentalRequests.filter(
    (r) => r.status === "pending",
  );
  const totalEarnings = myProperties.reduce((sum, p) => sum + p.rent, 0);
  const totalViews = myProperties.reduce((sum, p) => sum + p.views, 0);

  const stats = [
    {
      title: "Total Properties",
      value: myProperties.length,
      icon: FaBuilding,
      color: "bg-blue-500",
    },
    {
      title: "Pending Requests",
      value: pendingRequests.length,
      icon: FaUsers,
      color: "bg-yellow-500",
    },
    {
      title: "Monthly Earnings",
      value: `$${totalEarnings}`,
      icon: FaDollarSign,
      color: "bg-green-500",
    },
    {
      title: "Total Views",
      value: totalViews,
      icon: FaEye,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <p className="text-gray-600">
            Manage your properties and track performance
          </p>
        </div>
        <Link to="/dashboard/properties/manage" className="btn-primary">
          Add New Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Monthly Earnings Overview</h2>
        <ChartMonthlyEarnings />
      </div>

      {/* Recent Properties */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Properties</h2>
          <Link
            to="/dashboard/properties/manage"
            className="text-primary-600 hover:underline"
          >
            Manage All
          </Link>
        </div>
        {myProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No properties yet. Add your first property!
          </p>
        )}
      </div>

      {/* Rental Requests */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Rental Requests</h2>
          <Link
            to="/dashboard/rental-requests"
            className="text-primary-600 hover:underline"
          >
            View All
          </Link>
        </div>
        {myRentalRequests.length > 0 ? (
          <div className="space-y-3">
            {myRentalRequests.slice(0, 5).map((request) => {
              const property = properties.find(
                (p) => p.id === request.propertyId,
              );
              return (
                <div
                  key={request.id}
                  className="flex justify-between items-center p-4 border rounded-lg dark:border-secondary-700"
                >
                  <div>
                    <h3 className="font-semibold">{property?.name}</h3>
                    <p className="text-sm text-gray-500">
                      Requested on{" "}
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : request.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No rental requests yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
