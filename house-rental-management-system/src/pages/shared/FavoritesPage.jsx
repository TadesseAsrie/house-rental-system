// src/pages/shared/FavoritesPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { getPropertyById } from "../../data/mockData";
import PropertyCard from "../../components/common/PropertyCard";
import EmptyState from "../../components/common/EmptyState";

const FavoritesPage = () => {
  const { getUserFavorites } = useApp();
  const favorites = getUserFavorites();
  const favoriteProperties = favorites
    .map((f) => getPropertyById(f.propertyId))
    .filter((p) => p);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Favorite Properties</h1>

      {favoriteProperties.length === 0 ? (
        <EmptyState message="You haven't saved any properties yet" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
