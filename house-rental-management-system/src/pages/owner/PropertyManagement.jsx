// src/pages/owner/PropertyManagement.jsx
import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import PropertyForm from "../../components/forms/PropertyForm";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import EmptyState from "../../components/common/EmptyState";

const PropertyManagement = () => {
  const {
    properties,
    currentUser,
    addProperty,
    updateProperty,
    deleteProperty,
  } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const myProperties = properties.filter((p) => p.ownerId === currentUser.id);

  const handleSaveProperty = (propertyData) => {
    if (editingProperty) {
      updateProperty({ ...propertyData, id: editingProperty.id });
    } else {
      addProperty(propertyData);
    }
    setShowAddForm(false);
    setEditingProperty(null);
  };

  const handleDelete = () => {
    deleteProperty(deletingId);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Property Management</h1>
        <button onClick={() => setShowAddForm(true)} className="btn-primary">
          Add New Property
        </button>
      </div>

      {(showAddForm || editingProperty) && (
        <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">
            {editingProperty ? "Edit Property" : "Add New Property"}
          </h2>
          <PropertyForm
            initialData={editingProperty}
            onSubmit={handleSaveProperty}
            onCancel={() => {
              setShowAddForm(false);
              setEditingProperty(null);
            }}
          />
        </div>
      )}

      {myProperties.length === 0 ? (
        <EmptyState message="No properties added yet" />
      ) : (
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-secondary-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-secondary-700">
                {myProperties.map((property) => (
                  <tr key={property.id}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{property.name}</div>
                        <div className="text-sm text-gray-500">
                          {property.city}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{property.type}</td>
                    <td className="px-6 py-4">${property.rent}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          property.status === "available"
                            ? "bg-green-100 text-green-700"
                            : property.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setEditingProperty(property)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingId(property.id)}
                        className="text-red-600 hover:text-red-800"
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
      )}

      <ConfirmationModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
      />
    </div>
  );
};

export default PropertyManagement;
