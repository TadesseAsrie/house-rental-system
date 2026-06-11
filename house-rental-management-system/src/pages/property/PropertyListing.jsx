// src/pages/property/PropertyListing.jsx
import React, { useState, useEffect } from "react";
import { FaTh, FaThList, FaSearch } from "react-icons/fa";
import PropertyCard from "../../components/common/PropertyCard";
import PropertyFilterSidebar from "../../components/property/PropertyFilterSidebar";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import EmptyState from "../../components/common/EmptyState";
import { mockProperties } from "../../data/mockData";
import usePagination from "../../hooks/usePagination";

const PropertyListing = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    priceRange: { min: 0, max: 10000 },
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    availability: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = [...mockProperties];

      // Search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.city.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      // Location filter
      if (filters.location) {
        filtered = filtered.filter((p) =>
          p.city.toLowerCase().includes(filters.location.toLowerCase()),
        );
      }

      // Price filter
      filtered = filtered.filter(
        (p) =>
          p.rent >= filters.priceRange.min && p.rent <= filters.priceRange.max,
      );

      // Bedrooms
      if (filters.bedrooms) {
        filtered = filtered.filter(
          (p) => p.bedrooms >= parseInt(filters.bedrooms),
        );
      }

      // Bathrooms
      if (filters.bathrooms) {
        filtered = filtered.filter(
          (p) => p.bathrooms >= parseInt(filters.bathrooms),
        );
      }

      // Property Type
      if (filters.propertyType) {
        filtered = filtered.filter((p) => p.type === filters.propertyType);
      }

      // Availability
      if (filters.availability) {
        filtered = filtered.filter((p) => p.status === filters.availability);
      }

      // Sorting
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.rent - b.rent);
          break;
        case "price-high":
          filtered.sort((a, b) => b.rent - a.rent);
          break;
        case "newest":
          filtered.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          break;
        default:
          break;
      }

      setFilteredProperties(filtered);
      setLoading(false);
    }, 500);
  }, [searchTerm, filters, sortBy]);

  const { currentItems, currentPage, totalPages, paginate } = usePagination(
    filteredProperties,
    9,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-80">
          <PropertyFilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Controls */}
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-4 mb-6 shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-secondary-600 rounded-lg dark:bg-secondary-700"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-primary-600 text-white" : "bg-gray-200 dark:bg-secondary-700"}`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-primary-600 text-white" : "bg-gray-200 dark:bg-secondary-700"}`}
                >
                  <FaThList />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600">
              Found {filteredProperties.length} properties
            </p>
          </div>

          {/* Property Grid/List */}
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : filteredProperties.length === 0 ? (
            <EmptyState message="No properties found matching your criteria" />
          ) : (
            <div
              className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
            >
              {currentItems.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-primary-600 text-white" : "bg-gray-200 dark:bg-secondary-700"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
