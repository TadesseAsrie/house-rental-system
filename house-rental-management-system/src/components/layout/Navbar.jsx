// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaBuilding,
  FaEnvelope,
  FaInfoCircle,
  FaUser,
  FaBell,
  FaHeart,
  FaMoon,
  FaSun,
  FaTachometerAlt,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { mockUsers } from "../../data/mockData";

const Navbar = ({ onMenuClick }) => {
  const { currentUser, setCurrentUser, getUserNotifications } = useApp();
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = getUserNotifications().filter((n) => !n.read).length;

  const handleRoleSwitch = (role) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) {
      setCurrentUser(user);
      setUserMenuOpen(false);
      navigate("/dashboard");
    }
  };

  const navLinks = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/properties", icon: FaBuilding, label: "Properties" },
    { to: "/contact", icon: FaEnvelope, label: "Contact" },
    { to: "/about", icon: FaInfoCircle, label: "About" },
  ];

  return (
    <nav className="bg-white dark:bg-secondary-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBuilding className="text-2xl text-primary-600" />
            <span className="font-bold text-xl text-secondary-900 dark:text-white">
              RentalHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-1 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <link.icon />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
            >
              {darkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-secondary-600" />
              )}
            </button>

            <Link
              to="/favorites"
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <FaHeart className="text-secondary-600 dark:text-gray-300" />
            </Link>

            <Link
              to="/notifications"
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <FaBell className="text-secondary-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link
              to="/dashboard"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <FaTachometerAlt className="text-secondary-600 dark:text-gray-300" />
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {currentUser?.name?.charAt(0) || "U"}
                </div>
                <span className="hidden lg:inline text-secondary-700 dark:text-gray-300">
                  {currentUser?.name}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b dark:border-secondary-700">
                    <p className="text-sm font-semibold">{currentUser?.name}</p>
                    <p className="text-xs text-secondary-500">
                      {currentUser?.email}
                    </p>
                    <p className="text-xs text-primary-600 capitalize mt-1">
                      Role: {currentUser?.role}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary-700"
                  >
                    Profile
                  </Link>
                  <div className="border-t dark:border-secondary-700 mt-2 pt-2">
                    <p className="px-4 py-1 text-xs text-secondary-500">
                      Switch Role (Demo)
                    </p>
                    <button
                      onClick={() => handleRoleSwitch("tenant")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary-700"
                    >
                      Tenant
                    </button>
                    <button
                      onClick={() => handleRoleSwitch("owner")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary-700"
                    >
                      Owner
                    </button>
                    <button
                      onClick={() => handleRoleSwitch("admin")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary-700"
                    >
                      Admin
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t dark:border-secondary-700">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
