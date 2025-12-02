import React from "react";
import { useQuizContext } from "../context/LocalStorageContext";
import PageFade from "../components/PageFade";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ⭐ ADDED FOR CHARTS
import ProfileBarChart from "../components/ProfileBarChart";
import ProfilePieChart from "../components/ProfilePieChart";

// ⭐ ADDED FOR PDF DOWNLOAD
import { generateAttemptPDF } from "../utils/GeneratePDF";


export default function UserProfilePage() {
  const { quiz: quizData } = useQuizContext();

  const scores = quizData || [];
  const totalAttempts = scores.length;
  const bestScore = scores.length
    ? Math.max(...scores.map((s) => s.score))
    : 0;

  return (
    <PageFade>
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* PROFILE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl"
        >
          <h1 className="text-3xl font-bold text-center text-primary dark:text-indigo-300">
            Your Profile
          </h1>

          <div className="mt-6 text-center">
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Quiz Performance
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-10 text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-500">{totalAttempts}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Attempts</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-green-500">{bestScore}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Best Score</p>
            </div>
          </div>
        </motion.div>

        {/* QUIZ HISTORY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Quiz History
          </h2>

          {scores.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              You haven't completed any quizzes yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {scores
                .slice()
                .reverse()
                .map((entry, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  >
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {entry.subject} - Attempt {entry.attemptId + 1}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {entry.score} / {entry.total}
                      </p>

                      {/* REVIEW BUTTON */}
                      <Link
                        to={`/review/${entry.originalId}/${entry.attemptId}`}
                        className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90 transition"
                      >
                        Review
                      </Link>

                      {/* ⭐ DOWNLOAD PDF BUTTON */}
                      <button
                        onClick={() => generateAttemptPDF(entry)}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        PDF
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </motion.div>

        {/* ⭐ BAR GRAPH */}
        <ProfileBarChart scores={scores} />

        {/* ⭐ PIE CHART */}
        <ProfilePieChart scores={scores} />

        {/* HOME BUTTON */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Home
          </Link>
        </div>

      </div>
    </PageFade>
  );
}
