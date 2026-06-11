// src/pages/shared/RentalRequestPage.jsx
import React from "react";
import { useApp } from "../../context/AppContext";
import { getPropertyById } from "../../data/mockData";
import EmptyState from "../../components/common/EmptyState";

const RentalRequestPage = () => {
  const {
    getUserRentalRequests,
    updateRentalRequest,
    currentUser,
    properties,
  } = useApp();
  const requests = getUserRentalRequests();

  const handleStatusUpdate = (requestId, status) => {
    updateRentalRequest(requestId, status);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Rental Requests</h1>

      {requests.length === 0 ? (
        <EmptyState message="No rental requests found" />
      ) : (
        <div className="space-y-4">
          {requests.map((request) => {
            const property = getPropertyById(request.propertyId);
            return (
              <div
                key={request.id}
                className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-md"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {property?.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {property?.address}, {property?.city}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Requested on:{" "}
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                    {request.message && (
                      <p className="mt-2 text-gray-600">
                        Message: {request.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : request.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {request.status.toUpperCase()}
                      </span>

                      {(currentUser.role === "owner" ||
                        currentUser.role === "admin") &&
                        request.status === "pending" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(request.id, "approved")
                              }
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(request.id, "rejected")
                              }
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RentalRequestPage;
