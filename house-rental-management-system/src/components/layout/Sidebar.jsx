// src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaHome,
  FaHeart,
  FaBell,
  FaUser,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";

const Sidebar = ({ isOpen }) => {
  const { currentUser } = useApp();

  const getMenuItems = () => {
    const commonItems = [
      { to: "/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
      { to: "/dashboard/favorites", icon: FaHeart, label: "Favorites" },
      { to: "/dashboard/notifications", icon: FaBell, label: "Notifications" },
      { to: "/dashboard/profile", icon: FaUser, label: "Profile" },
    ];

    if (currentUser?.role === "tenant") {
      return [
        ...commonItems,
        {
          to: "/dashboard/rental-requests",
          icon: FaClipboardList,
          label: "My Requests",
        },
        { to: "/properties", icon: FaHome, label: "Browse Properties" },
      ];
    } else if (currentUser?.role === "owner") {
      return [
        ...commonItems,
        {
          to: "/dashboard/properties/manage",
          icon: FaBuilding,
          label: "Manage Properties",
        },
        {
          to: "/dashboard/rental-requests",
          icon: FaClipboardList,
          label: "Rental Requests",
        },
      ];
    } else if (currentUser?.role === "admin") {
      return [
        ...commonItems,
        {
          to: "/dashboard/properties/manage",
          icon: FaBuilding,
          label: "All Properties",
        },
        {
          to: "/dashboard/rental-requests",
          icon: FaClipboardList,
          label: "All Requests",
        },
        { to: "/dashboard/users", icon: FaUser, label: "User Management" },
      ];
    }
    return commonItems;
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-full bg-white dark:bg-secondary-800 shadow-lg transition-all duration-300 z-40 ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="py-6">
        {getMenuItems().map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-600 text-white"
                  : "text-secondary-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700"
              }`
            }
          >
            <item.icon className="text-xl flex-shrink-0" />
            {isOpen && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
