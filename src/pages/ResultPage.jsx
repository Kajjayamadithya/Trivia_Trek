import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/LocalStorageContext";
import { useQuiz } from "../context/QuizContext";
import PageFade from "../components/PageFade";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function ResultPage() {
  const { id, attemptId } = useParams();
  const navigate = useNavigate();
  const { quiz: quizResults } = useQuizContext();
  const { quizzes } = useQuiz();

  const resultId = `${id}-${attemptId}`;
  const result = quizResults.find((item) => item.id === resultId);
  const quiz = quizzes.find((q) => q.id === id);

  useEffect(() => {
    if (!result || !quiz) {
      navigate("/categories");
      return;
    }
    
    confetti({
      particleCount: 140,
      spread: 75,
      origin: { y: 0.6 }
    });
  }, [result, quiz, navigate]);

  if (!result || !quiz) {
    return (
      <div className="text-center text-gray-700 dark:text-gray-300 py-24 text-xl">
        No quiz results found.
      </div>
    );
  }

  return (
    <PageFade>
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-lg dark:shadow-gray-800"
        >
          <motion.h2
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="text-3xl font-bold text-primary dark:text-indigo-300"
          >
            Quiz Completed
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-gray-700 dark:text-gray-300 text-lg"
          >
            {quiz.title} - Attempt {parseInt(attemptId) + 1} - Results
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-5xl font-extrabold mt-4 text-gray-900 dark:text-gray-100"
          >
            {result.score} / {result.total}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-400"
          >
            {result.score >= result.total * 0.8 ? "Excellent! 🎉" : 
             result.score >= result.total * 0.6 ? "Good job! 👍" : 
             "Keep practicing! 💪"}
          </motion.div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                to={`/review/${id}/${attemptId}`}
                className="px-5 py-2 border border-gray-300 dark:border-gray-600 
                           rounded-lg text-gray-800 dark:text-gray-200
                           hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Review Answers
              </Link>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                to="/categories"
                className="px-5 py-2 bg-primary text-white rounded-lg 
                           hover:bg-primary/90 transition"
              >
                Back to Categories
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageFade>
  );
}