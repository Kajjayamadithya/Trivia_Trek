import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/LocalStorageContext";
import { motion } from "framer-motion";

export default function QuizCard({ quiz }) {
  const navigate = useNavigate();
  const { quiz: quizResults } = useQuizContext();

  const startQuiz = () => {
    const attemptsForQuiz = quizResults.filter(item => item.originalId === quiz.id);
    const nextAttemptId = attemptsForQuiz.length;
    navigate(`/quiz/${quiz.id}/${nextAttemptId}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-md 
                 border border-gray-200 dark:border-gray-700 
                 p-5 rounded-2xl shadow-xl transition cursor-pointer"
      onClick={startQuiz}
    >
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {quiz.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        {quiz.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {quiz.questions.length} Questions
        </span>

        {/* Neon Start Button */}
        <button
          className="px-6 py-2 bg-gradient-to-r from-[#7F00FF] to-[#00A8FF] 
                     text-white rounded-full 
                     shadow-[0_0_20px_rgba(127,0,255,0.5)]
                     hover:shadow-[0_0_30px_rgba(0,168,255,0.7)]
                     hover:scale-105 transition-all duration-300"
        >
          Start
        </button>
      </div>
    </motion.div>
  );
}