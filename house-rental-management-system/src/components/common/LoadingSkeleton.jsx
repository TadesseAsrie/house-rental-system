// src/components/common/LoadingSkeleton.jsx
import React from "react";

const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="h-48 bg-gray-300 dark:bg-secondary-700 rounded-t-xl"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-secondary-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-secondary-700 rounded w-1/2"></div>
            <div className="flex space-x-2">
              <div className="h-3 bg-gray-300 dark:bg-secondary-700 rounded w-1/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-secondary-700 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
