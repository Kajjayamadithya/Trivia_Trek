import React from "react";
import { useQuiz } from "../context/QuizContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function AdminDashboard() {
  const { quizzes } = useQuiz();

  const totalQuizzes = quizzes.length;
  const totalQuestions = quizzes.reduce(
    (sum, quiz) => sum + quiz.questions.length,
    0
  );

  /* ------------------ PIE CHART DATA ------------------ */
  const pieData = quizzes.map((q) => ({
    name: q.title,
    value: q.questions.length,
  }));

  const COLORS = [
    "#4F46E5",
    "#0EA5E9",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#A855F7",
    "#14B8A6",
    "#F43F5E",
  ];

  /* ------------------ BAR GRAPH DATA ------------------ */
  const barData = quizzes.map((quiz) => ({
    name: quiz.title.length > 12 ? quiz.title.slice(0, 10) + "..." : quiz.title,
    questions: quiz.questions.length,
  }));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary dark:text-indigo-300 mb-6">
        📊 Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Total Quizzes */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Total Quizzes
          </h2>
          <p className="text-4xl font-bold text-indigo-500 mt-2">
            {totalQuizzes}
          </p>
        </div>

        {/* Total Questions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Total Questions
          </h2>
          <p className="text-4xl font-bold text-green-500 mt-2">
            {totalQuestions}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PIE CHART */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
            Quiz Distribution by Question Count
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR GRAPH */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
            Questions per Quiz (Bar Graph)
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="questions" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
