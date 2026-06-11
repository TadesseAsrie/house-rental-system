// src/components/dashboard/ChartMonthlyEarnings.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", earnings: 4000 },
  { month: "Feb", earnings: 3000 },
  { month: "Mar", earnings: 5000 },
  { month: "Apr", earnings: 2780 },
  { month: "May", earnings: 6890 },
  { month: "Jun", earnings: 8390 },
  { month: "Jul", earnings: 7490 },
  { month: "Aug", earnings: 9000 },
  { month: "Sep", earnings: 11000 },
  { month: "Oct", earnings: 12500 },
  { month: "Nov", earnings: 10800 },
  { month: "Dec", earnings: 13500 },
];

const ChartMonthlyEarnings = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="earnings"
          stroke="#3b82f6"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartMonthlyEarnings;
