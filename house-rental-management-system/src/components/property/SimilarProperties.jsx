// src/components/property/SimilarProperties.jsx
import React from "react";
import PropertyCard from "../common/PropertyCard";

const SimilarProperties = ({ currentPropertyId, properties }) => {
  const similarProperties = properties
    .filter((p) => p.id !== currentPropertyId)
    .slice(0, 3);

  if (similarProperties.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProperties;
