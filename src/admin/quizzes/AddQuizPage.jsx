import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useQuiz } from "../../context/QuizContext";

export default function AddQuizPage() {
  const navigate = useNavigate();
  const { addQuiz } = useQuiz();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);

  const handleCreateQuiz = () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const newQuiz = {
      id: `quiz-${Date.now()}`,
      title,
      description,
      category: category || "General",
      timeLimitSec: parseInt(timeLimit) || 60,
      questions: [],
    };

    addQuiz(newQuiz);

    toast.success("Quiz Created Successfully!");
    navigate("/admin/quizzes");
  };

  return (
    <div className="p-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-primary dark:text-indigo-300 mb-4"
      >
        ➕ Add New Quiz
      </motion.h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">

        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
          Quiz Title
        </label>
        <input
          type="text"
          placeholder="Enter quiz title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
        />

        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
          Description
        </label>
        <textarea
          placeholder="Enter quiz description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 h-28"
        />

        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
          Category
        </label>
        <input
          type="text"
          placeholder="Enter category (e.g., C Programming)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
        />

        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
          Time Limit (in seconds)
        </label>
        <input
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
        />

        <div className="flex gap-4 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateQuiz}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Create Quiz
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/quizzes")}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </motion.button>
        </div>

      </div>
    </div>
  );
}
