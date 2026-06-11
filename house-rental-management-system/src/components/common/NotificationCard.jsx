// src/components/common/NotificationCard.jsx
import React from "react";
import {
  FaCheck,
  FaInfoCircle,
  FaWarning,
  FaCheckCircle,
} from "react-icons/fa";

const NotificationCard = ({ notification, onMarkRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "warning":
        return <FaWarning className="text-yellow-500" />;
      case "error":
        return <FaWarning className="text-red-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  return (
    <div
      className={`bg-white dark:bg-secondary-800 rounded-lg p-4 shadow-md transition-all ${!notification.read ? "border-l-4 border-primary-600" : ""}`}
    >
      <div className="flex items-start space-x-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="font-semibold">{notification.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            {notification.message}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
        {!notification.read && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            <FaCheck />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
