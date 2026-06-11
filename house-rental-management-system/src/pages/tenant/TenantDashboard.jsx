// src/pages/tenant/TenantDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaHeart,
  FaBell,
  FaCreditCard,
  FaHistory,
  FaUser,
} from "react-icons/fa";
import StatisticsCard from "../../components/common/StatisticsCard";
import PropertyCard from "../../components/common/PropertyCard";
import { useApp } from "../../context/AppContext";
import { getPropertyById } from "../../data/mockData";

const TenantDashboard = () => {
  const { currentUser, getUserRentalRequests, getUserFavorites, payments } =
    useApp();

  const myRentals = getUserRentalRequests().filter(
    (r) => r.status === "approved",
  );
  const rentedProperties = myRentals.map((r) => getPropertyById(r.propertyId));
  const favorites = getUserFavorites();
  const favoriteProperties = favorites.map((f) =>
    getPropertyById(f.propertyId),
  );
  const myPayments = payments.filter((p) => p.tenantId === currentUser.id);

  const stats = [
    {
      title: "Active Rentals",
      value: rentedProperties.length,
      icon: FaHome,
      color: "bg-blue-500",
    },
    {
      title: "Saved Properties",
      value: favorites.length,
      icon: FaHeart,
      color: "bg-red-500",
    },
    {
      title: "Total Payments",
      value: myPayments.length,
      icon: FaCreditCard,
      color: "bg-green-500",
    },
    { title: "Notifications", value: 3, icon: FaBell, color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {currentUser.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your rentals
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      {/* Current Rentals */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Current Rentals</h2>
          <Link to="/properties" className="text-primary-600 hover:underline">
            Browse More
          </Link>
        </div>
        {rentedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rentedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No active rentals yet. Start browsing properties!
          </p>
        )}
      </div>

      {/* Saved Properties */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Saved Properties</h2>
          <Link to="/favorites" className="text-primary-600 hover:underline">
            View All
          </Link>
        </div>
        {favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No saved properties yet.
          </p>
        )}
      </div>

      {/* Recent Payments */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Payments</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-secondary-700">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Property</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {myPayments.map((payment) => {
                const property = getPropertyById(payment.propertyId);
                return (
                  <tr
                    key={payment.id}
                    className="border-b dark:border-secondary-700"
                  >
                    <td className="px-4 py-2">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{property?.name}</td>
                    <td className="px-4 py-2">${payment.amount}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${payment.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {payment.status}
                      </span>
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

export default TenantDashboard;
