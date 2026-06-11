// src/pages/property/PropertyDetails.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaRuler,
  FaCalendar,
  FaCheck,
  FaHeart,
  FaUser,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { getPropertyById, mockProperties } from "../../data/mockData";
import PropertyImageGallery from "../../components/property/PropertyImageGallery";
import SimilarProperties from "../../components/property/SimilarProperties";
import { useApp } from "../../context/AppContext";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = getPropertyById(id);
  const { currentUser, addToFavorites, favorites, submitRentalRequest } =
    useApp();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const isFavorited = favorites.some(
    (f) => f.propertyId === property?.id && f.userId === currentUser?.id,
  );

  if (!property) {
    return <div className="text-center py-20">Property not found</div>;
  }

  const owner = {
    id: property.ownerId,
    name: "Jane Smith",
    phone: "+1234567890",
    email: "jane@example.com",
  };

  const handleRentalRequest = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setShowRequestModal(true);
  };

  const submitRequest = () => {
    submitRentalRequest({
      propertyId: property.id,
      ownerId: property.ownerId,
      message: requestMessage,
    });
    setShowRequestModal(false);
    setRequestMessage("");
    alert("Rental request submitted successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <PropertyImageGallery images={property.images} />

          {/* Property Info */}
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
                <div className="flex items-center text-gray-500">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>
                    {property.address}, {property.city}, {property.region}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600">
                  ${property.rent}
                </div>
                <div className="text-gray-500">per month</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 py-4 border-y dark:border-secondary-700">
              <div className="flex items-center">
                <FaBed className="mr-2 text-primary-600" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <FaBath className="mr-2 text-primary-600" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <FaRuler className="mr-2 text-primary-600" />
                <span>{property.area} sq ft</span>
              </div>
              <div className="flex items-center">
                <FaCalendar className="mr-2 text-primary-600" />
                <span>Built 2020</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3">Description</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {property.description}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-3">Location</h3>
            <div className="h-64 bg-gray-200 dark:bg-secondary-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Map View - {property.city}, {property.region}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Owner Info */}
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Property Owner</h3>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl">
                {owner.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-lg">{owner.name}</h4>
                <p className="text-gray-500">Member since 2022</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaPhone className="mr-2 text-primary-600" />
                <span>{owner.phone}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-primary-600" />
                <span>{owner.email}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6">
            <button
              onClick={() => {
                if (isFavorited) {
                  const fav = favorites.find(
                    (f) => f.propertyId === property.id,
                  );
                  removeFromFavorites(fav.id);
                } else {
                  addToFavorites(property.id);
                }
              }}
              className="w-full mb-3 btn-secondary flex items-center justify-center"
            >
              <FaHeart
                className={`mr-2 ${isFavorited ? "text-red-500" : ""}`}
              />
              {isFavorited ? "Remove from Favorites" : "Save to Favorites"}
            </button>

            {property.status === "available" &&
              currentUser?.role === "tenant" && (
                <button
                  onClick={handleRentalRequest}
                  className="w-full btn-primary"
                >
                  Request to Rent
                </button>
              )}

            {property.status !== "available" && (
              <button className="w-full btn-secondary" disabled>
                Not Available
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <SimilarProperties
        currentPropertyId={property.id}
        properties={mockProperties}
      />

      {/* Rental Request Modal */}
      <ConfirmationModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onConfirm={submitRequest}
        title="Submit Rental Request"
        message="Please provide any additional information for the property owner:"
      >
        <textarea
          value={requestMessage}
          onChange={(e) => setRequestMessage(e.target.value)}
          className="w-full mt-3 p-2 border rounded-lg dark:bg-secondary-700"
          rows="3"
          placeholder="I'm interested in this property because..."
        />
      </ConfirmationModal>
    </div>
  );
};

export default PropertyDetails;
