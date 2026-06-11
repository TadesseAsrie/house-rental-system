// src/components/common/EmptyState.jsx
import React from "react";
import { FaInbox } from "react-icons/fa";

const EmptyState = ({ message }) => {
  return (
    <div className="text-center py-12">
      <FaInbox className="text-6xl text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;
