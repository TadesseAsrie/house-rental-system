// src/components/forms/PropertyForm.jsx
import React, { useState } from "react";

const PropertyForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "Apartment",
    address: initialData?.address || "",
    city: initialData?.city || "",
    region: initialData?.region || "",
    rent: initialData?.rent || "",
    bedrooms: initialData?.bedrooms || "",
    bathrooms: initialData?.bathrooms || "",
    description: initialData?.description || "",
    amenities: initialData?.amenities?.join(", ") || "",
    images: initialData?.images?.[0] || "",
    area: initialData?.area || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const propertyData = {
      ...formData,
      rent: parseFloat(formData.rent),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      area: parseInt(formData.area),
      amenities: formData.amenities.split(",").map((a) => a.trim()),
      images: [formData.images],
    };
    onSubmit(propertyData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Property Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Property Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input-field"
          >
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Studio">Studio</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Region/State *
          </label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Monthly Rent ($) *
          </label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms *</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bathrooms *</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Area (sq ft)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="input-field"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Amenities (comma-separated)
          </label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="Swimming Pool, Gym, Parking, WiFi"
            className="input-field"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="input-field"
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button type="submit" className="btn-primary">
          {initialData ? "Update Property" : "Add Property"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
