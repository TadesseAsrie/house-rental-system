// src/components/common/PropertyCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { useApp } from "../../context/AppContext";

const PropertyCard = ({ property }) => {
  const { favorites, addToFavorites, removeFromFavorites, currentUser } =
    useApp();

  const isFavorited = favorites.some(
    (f) => f.propertyId === property.id && f.userId === currentUser?.id,
  );

  const handleFavorite = (e) => {
    e.preventDefault();
    if (isFavorited) {
      const favorite = favorites.find(
        (f) => f.propertyId === property.id && f.userId === currentUser?.id,
      );
      removeFromFavorites(favorite.id);
    } else {
      addToFavorites(property.id);
    }
  };

  return (
    <Link to={`/properties/${property.id}`} className="group">
      <div className="card overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          >
            <FaHeart
              className={`${isFavorited ? "text-red-500" : "text-gray-400"}`}
            />
          </button>
          <div className="absolute bottom-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-sm">
            ${property.rent}/month
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary-600 transition-colors">
            {property.name}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <FaMapMarkerAlt className="mr-1" />
            <span>
              {property.city}, {property.region}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <div className="flex items-center">
              <FaBed className="mr-1" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-1" />
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="text-sm">{property.area} sq ft</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
