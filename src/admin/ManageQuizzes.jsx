import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export default function ManageQuizzes() {
  const { quizzes, deleteQuiz } = useQuiz();

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Quizzes</h1>

        {/* Add Quiz Button */}
        <Link
          to="/admin/quizzes/add"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
        >
          + Add Quiz
        </Link>
      </div>

      {/* Quiz List */}
      <div className="space-y-5">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border dark:border-gray-700 transition"
          >
            <h2 className="text-2xl font-semibold mb-1">{quiz.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{quiz.description}</p>

            <div className="flex gap-4">
              <Link
                to={`/admin/quizzes/edit/${quiz.id}`}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition"
              >
                Edit
              </Link>

              <Link
                to={`/admin/questions/${quiz.id}`}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white shadow transition"
              >
                Questions
              </Link>

              <button
                onClick={() => deleteQuiz(quiz.id)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
