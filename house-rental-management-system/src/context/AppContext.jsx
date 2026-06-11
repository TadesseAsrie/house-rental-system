// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  mockUsers,
  mockProperties,
  mockRentalRequests,
  mockFavorites,
  mockNotifications,
  mockPayments,
} from "../data/mockData";

const AppContext = createContext();

const initialState = {
  currentUser: mockUsers[0], // Default tenant for demo
  users: mockUsers,
  properties: mockProperties,
  rentalRequests: mockRentalRequests,
  favorites: mockFavorites,
  notifications: mockNotifications,
  payments: mockPayments,
  loading: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, currentUser: action.payload };
    case "ADD_PROPERTY":
      return { ...state, properties: [action.payload, ...state.properties] };
    case "UPDATE_PROPERTY":
      return {
        ...state,
        properties: state.properties.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };
    case "DELETE_PROPERTY":
      return {
        ...state,
        properties: state.properties.filter((p) => p.id !== action.payload),
      };
    case "APPROVE_PROPERTY":
      return {
        ...state,
        properties: state.properties.map((p) =>
          p.id === action.payload ? { ...p, status: "available" } : p,
        ),
      };
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.id !== action.payload),
      };
    case "ADD_RENTAL_REQUEST":
      return {
        ...state,
        rentalRequests: [...state.rentalRequests, action.payload],
      };
    case "UPDATE_RENTAL_REQUEST":
      return {
        ...state,
        rentalRequests: state.rentalRequests.map((r) =>
          r.id === action.payload.id ? action.payload : r,
        ),
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n,
        ),
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        users: state.users.map((u) =>
          u.id === state.currentUser.id ? { ...u, ...action.payload } : u,
        ),
      };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setCurrentUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      views: 0,
      status: "pending",
    };
    dispatch({ type: "ADD_PROPERTY", payload: newProperty });
    addNotification({
      userId: state.currentUser.id,
      title: "Property Added",
      message: "Your property has been submitted for approval",
      type: "info",
    });
  };

  const updateProperty = (property) => {
    dispatch({ type: "UPDATE_PROPERTY", payload: property });
  };

  const deleteProperty = (propertyId) => {
    dispatch({ type: "DELETE_PROPERTY", payload: propertyId });
  };

  const approveProperty = (propertyId) => {
    dispatch({ type: "APPROVE_PROPERTY", payload: propertyId });
  };

  const addToFavorites = (propertyId) => {
    const newFavorite = {
      id: Date.now(),
      userId: state.currentUser.id,
      propertyId,
      addedAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_FAVORITE", payload: newFavorite });
  };

  const removeFromFavorites = (favoriteId) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: favoriteId });
  };

  const submitRentalRequest = (request) => {
    const newRequest = {
      ...request,
      id: Date.now(),
      tenantId: state.currentUser.id,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_RENTAL_REQUEST", payload: newRequest });
    addNotification({
      userId: request.ownerId,
      title: "New Rental Request",
      message: `New rental request for property ID ${request.propertyId}`,
      type: "warning",
    });
  };

  const updateRentalRequest = (requestId, status) => {
    const request = state.rentalRequests.find((r) => r.id === requestId);
    if (request) {
      const updatedRequest = { ...request, status };
      dispatch({ type: "UPDATE_RENTAL_REQUEST", payload: updatedRequest });

      // Notify tenant
      addNotification({
        userId: request.tenantId,
        title: `Rental Request ${status}`,
        message: `Your rental request has been ${status}`,
        type: status === "approved" ? "success" : "error",
      });
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });
  };

  const markNotificationRead = (notificationId) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: notificationId });
  };

  const updateProfile = (profileData) => {
    dispatch({ type: "UPDATE_PROFILE", payload: profileData });
  };

  const getUserFavorites = () => {
    return state.favorites.filter((f) => f.userId === state.currentUser.id);
  };

  const getUserNotifications = () => {
    return state.notifications.filter((n) => n.userId === state.currentUser.id);
  };

  const getUserRentalRequests = () => {
    if (state.currentUser.role === "tenant") {
      return state.rentalRequests.filter(
        (r) => r.tenantId === state.currentUser.id,
      );
    } else if (state.currentUser.role === "owner") {
      const ownerProperties = state.properties.filter(
        (p) => p.ownerId === state.currentUser.id,
      );
      return state.rentalRequests.filter((r) =>
        ownerProperties.some((p) => p.id === r.propertyId),
      );
    }
    return state.rentalRequests;
  };

  const value = {
    ...state,
    setCurrentUser,
    addProperty,
    updateProperty,
    deleteProperty,
    approveProperty,
    addToFavorites,
    removeFromFavorites,
    submitRentalRequest,
    updateRentalRequest,
    addNotification,
    markNotificationRead,
    updateProfile,
    getUserFavorites,
    getUserNotifications,
    getUserRentalRequests,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
