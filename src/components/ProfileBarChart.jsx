import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ProfileBarChart({ scores }) {
  if (!scores || scores.length === 0) return null;

  const chartData = scores.map((entry, index) => ({
    name: `Attempt ${index + 1}`,
    score: entry.score,
  }));

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl mt-10">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Score Comparison (Bar Chart)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" tick={{ fill: "#ccc" }} />
          <YAxis tick={{ fill: "#ccc" }} />
          <Tooltip />
          <Bar dataKey="score" fill="#00A8FF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
