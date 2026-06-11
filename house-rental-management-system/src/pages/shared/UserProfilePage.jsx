// src/pages/shared/UserProfilePage.jsx
import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import ProfileForm from "../../components/forms/ProfileForm";

const UserProfilePage = () => {
  const { currentUser, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn-primary">
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-md">
        {isEditing ? (
          <ProfileForm
            user={currentUser}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {currentUser.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{currentUser.name}</h2>
                <p className="text-gray-500 capitalize">{currentUser.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="mt-1">{currentUser.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="mt-1">{currentUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Phone
                </label>
                <p className="mt-1">{currentUser.phone || "Not provided"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Member Since
                </label>
                <p className="mt-1">January 2024</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
