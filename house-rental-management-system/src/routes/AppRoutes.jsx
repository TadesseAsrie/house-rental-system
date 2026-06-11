// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/home/Home";
import PropertyListing from "../pages/property/PropertyListing";
import PropertyDetails from "../pages/property/PropertyDetails";
import TenantDashboard from "../pages/tenant/TenantDashboard";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PropertyManagement from "../pages/owner/PropertyManagement";
import RentalRequestPage from "../pages/shared/RentalRequestPage";
import FavoritesPage from "../pages/shared/FavoritesPage";
import NotificationPage from "../pages/shared/NotificationPage";
import UserProfilePage from "../pages/shared/UserProfilePage";
import ContactPage from "../pages/shared/ContactPage";
import AboutPage from "../pages/shared/AboutPage";

const AppRoutes = () => {
  const { currentUser } = useApp();

  const getDashboardByRole = () => {
    switch (currentUser?.role) {
      case "tenant":
        return <TenantDashboard />;
      case "owner":
        return <OwnerDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <TenantDashboard />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="properties" element={<PropertyListing />} />
        <Route path="properties/:id" element={<PropertyDetails />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="rental-requests" element={<RentalRequestPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={getDashboardByRole()} />
        <Route path="properties/manage" element={<PropertyManagement />} />
        <Route path="rental-requests" element={<RentalRequestPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
