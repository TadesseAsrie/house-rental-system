// src/components/property/PropertyFilterSidebar.jsx
import React from "react";

const PropertyFilterSidebar = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-bold mb-4">Filters</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            placeholder="Enter city"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={filters.priceRange.min}
              onChange={(e) =>
                handleFilterChange("priceRange", {
                  ...filters.priceRange,
                  min: e.target.value,
                })
              }
              placeholder="Min"
              className="input-field"
            />
            <input
              type="number"
              value={filters.priceRange.max}
              onChange={(e) =>
                handleFilterChange("priceRange", {
                  ...filters.priceRange,
                  max: e.target.value,
                })
              }
              placeholder="Max"
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
            className="input-field"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bathrooms</label>
          <select
            value={filters.bathrooms}
            onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
            className="input-field"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            className="input-field"
          >
            <option value="">All</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Studio">Studio</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Availability</label>
          <select
            value={filters.availability}
            onChange={(e) => handleFilterChange("availability", e.target.value)}
            className="input-field"
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        <button
          onClick={() =>
            setFilters({
              location: "",
              priceRange: { min: 0, max: 10000 },
              bedrooms: "",
              bathrooms: "",
              propertyType: "",
              availability: "",
            })
          }
          className="w-full btn-secondary"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default PropertyFilterSidebar;
