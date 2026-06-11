// src/data/mockData.js
export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "tenant",
    phone: "+1234567890",
    avatar: null,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "owner",
    phone: "+1234567891",
    avatar: null,
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    phone: "+1234567892",
    avatar: null,
  },
  {
    id: 4,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "tenant",
    phone: "+1234567893",
    avatar: null,
  },
];

export const mockProperties = [
  {
    id: 1,
    name: "Luxury Downtown Apartment",
    type: "Apartment",
    address: "123 Main St",
    city: "New York",
    region: "NY",
    rent: 2500,
    bedrooms: 2,
    bathrooms: 2,
    description:
      "Beautiful luxury apartment in the heart of downtown with stunning city views.",
    amenities: ["Swimming Pool", "Gym", "Parking", "WiFi", "AC"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    status: "available",
    ownerId: 2,
    createdAt: "2024-01-01",
    area: 1200,
    views: 245,
  },
  {
    id: 2,
    name: "Cozy Suburban House",
    type: "House",
    address: "456 Oak Ave",
    city: "Los Angeles",
    region: "CA",
    rent: 1800,
    bedrooms: 3,
    bathrooms: 2,
    description: "Perfect family home with large backyard and modern kitchen.",
    amenities: ["Backyard", "Garage", "Washer/Dryer", "Dishwasher"],
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    ],
    status: "available",
    ownerId: 2,
    createdAt: "2024-01-15",
    area: 1800,
    views: 189,
  },
  {
    id: 3,
    name: "Modern Studio Loft",
    type: "Studio",
    address: "789 Pine St",
    city: "Chicago",
    region: "IL",
    rent: 1200,
    bedrooms: 1,
    bathrooms: 1,
    description: "Stylish studio loft perfect for young professionals.",
    amenities: ["Gym", "Rooftop", "Bike Storage"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
    ],
    status: "rented",
    ownerId: 2,
    createdAt: "2024-01-10",
    area: 650,
    views: 312,
  },
  {
    id: 4,
    name: "Beachfront Condo",
    type: "Condo",
    address: "321 Ocean Dr",
    city: "Miami",
    region: "FL",
    rent: 3200,
    bedrooms: 2,
    bathrooms: 2,
    description: "Amazing ocean views from this beautiful beachfront condo.",
    amenities: ["Beach Access", "Pool", "Spa", "Concierge"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    ],
    status: "available",
    ownerId: 2,
    createdAt: "2024-02-01",
    area: 1100,
    views: 567,
  },
  {
    id: 5,
    name: "Mountain View Cabin",
    type: "Cabin",
    address: "555 Mountain Rd",
    city: "Denver",
    region: "CO",
    rent: 2100,
    bedrooms: 3,
    bathrooms: 2,
    description: "Cozy cabin with spectacular mountain views and fireplace.",
    amenities: ["Fireplace", "Hiking Trails", "Hot Tub", "Deck"],
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
    ],
    status: "available",
    ownerId: 2,
    createdAt: "2024-02-10",
    area: 1500,
    views: 423,
  },
  {
    id: 6,
    name: "Urban Penthouse",
    type: "Penthouse",
    address: "777 Skyline Blvd",
    city: "Seattle",
    region: "WA",
    rent: 4500,
    bedrooms: 3,
    bathrooms: 3,
    description:
      "Luxurious penthouse with panoramic city views and premium finishes.",
    amenities: ["Private Elevator", "Terrace", "Wine Cellar", "Smart Home"],
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    ],
    status: "pending",
    ownerId: 2,
    createdAt: "2024-02-15",
    area: 2200,
    views: 891,
  },
];

export const mockRentalRequests = [
  {
    id: 1,
    propertyId: 1,
    tenantId: 1,
    status: "pending",
    message: "Interested in viewing",
    createdAt: "2024-02-20",
  },
  {
    id: 2,
    propertyId: 2,
    tenantId: 4,
    status: "approved",
    message: "Ready to move in",
    createdAt: "2024-02-18",
  },
  {
    id: 3,
    propertyId: 3,
    tenantId: 1,
    status: "rejected",
    message: "Can we negotiate price?",
    createdAt: "2024-02-15",
  },
];

export const mockFavorites = [
  { id: 1, userId: 1, propertyId: 2, addedAt: "2024-02-20" },
  { id: 2, userId: 1, propertyId: 4, addedAt: "2024-02-19" },
  { id: 3, userId: 4, propertyId: 1, addedAt: "2024-02-18" },
];

export const mockNotifications = [
  {
    id: 1,
    userId: 1,
    title: "Rental Request Approved",
    message: "Your request for Cozy Suburban House has been approved!",
    type: "success",
    read: false,
    createdAt: "2024-02-20",
  },
  {
    id: 2,
    userId: 1,
    title: "New Property Available",
    message: "Check out our new Beachfront Condo listing!",
    type: "info",
    read: true,
    createdAt: "2024-02-19",
  },
  {
    id: 3,
    userId: 2,
    title: "Rental Request",
    message: "New rental request for Modern Studio Loft",
    type: "warning",
    read: false,
    createdAt: "2024-02-18",
  },
];

export const mockPayments = [
  {
    id: 1,
    tenantId: 1,
    propertyId: 3,
    amount: 1200,
    date: "2024-02-01",
    status: "paid",
  },
  {
    id: 2,
    tenantId: 1,
    propertyId: 3,
    amount: 1200,
    date: "2024-01-01",
    status: "paid",
  },
  {
    id: 3,
    tenantId: 4,
    propertyId: 2,
    amount: 1800,
    date: "2024-02-01",
    status: "pending",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tenant",
    content: "Amazing platform! Found my dream apartment within days.",
    rating: 5,
    avatar: null,
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Owner",
    content: "Managing my properties has never been easier.",
    rating: 5,
    avatar: null,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Tenant",
    content: "Great support and user-friendly interface.",
    rating: 4,
    avatar: null,
  },
];

export const categories = [
  { id: 1, name: "Apartments", icon: "🏢", count: 45 },
  { id: 2, name: "Houses", icon: "🏠", count: 32 },
  { id: 3, name: "Condos", icon: "🏙️", count: 28 },
  { id: 4, name: "Studios", icon: "📐", count: 15 },
  { id: 5, name: "Penthouses", icon: "✨", count: 8 },
];

export const popularLocations = [
  { id: 1, name: "New York", count: 124 },
  { id: 2, name: "Los Angeles", count: 98 },
  { id: 3, name: "Chicago", count: 76 },
  { id: 4, name: "Miami", count: 65 },
  { id: 5, name: "Seattle", count: 54 },
];

// Helper functions
export const getPropertyById = (id) =>
  mockProperties.find((p) => p.id === parseInt(id));
export const getPropertiesByOwner = (ownerId) =>
  mockProperties.filter((p) => p.ownerId === ownerId);
export const getTenantRentals = (tenantId) =>
  mockRentalRequests.filter(
    (r) => r.tenantId === tenantId && r.status === "approved",
  );
