import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProfilePieChart({ scores }) {
  if (!scores || scores.length === 0) return null;

  const totalCorrect = scores.reduce((sum, s) => sum + s.score, 0);
  const totalQuestions = scores.reduce((sum, s) => sum + s.total, 0);

  const data = [
    { name: "Correct", value: totalCorrect },
    { name: "Wrong", value: totalQuestions - totalCorrect },
  ];

  const COLORS = ["#00C853", "#D50000"];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl mt-10">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Overall Performance (Pie Chart)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
            dataKey="value"
          >
            {data.map((item, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
