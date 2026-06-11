// src/components/common/StatisticsCard.jsx
import React from "react";

const StatisticsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-full text-white`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
