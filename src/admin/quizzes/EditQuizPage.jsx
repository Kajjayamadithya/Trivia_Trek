import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";
import toast from "react-hot-toast";

export default function EditQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes, updateQuiz } = useQuiz();

  const quiz = quizzes.find((q) => q.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDescription(quiz.description);
    }
  }, [quiz]);

  const handleUpdate = async () => {
    const updated = { ...quiz, title, description };
    await updateQuiz(id, updated);
    toast.success("Quiz Updated");
    navigate("/admin/quizzes");
  };

  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-2xl 
        bg-white dark:bg-gray-800 
        shadow-lg dark:shadow-gray-900 
        border border-gray-200 dark:border-gray-700 
        rounded-xl p-6"
      >
        <h1 className="text-3xl font-semibold mb-6 
          text-gray-800 dark:text-white"
        >
          Edit Quiz
        </h1>

        {/* Title */}
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Quiz Title
        </label>
        <input
          className="w-full p-3 border 
            border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700 
            text-gray-800 dark:text-gray-100 
            rounded-lg mb-6
            focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 
            focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title"
        />

        {/* Description */}
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Description
        </label>
        <textarea
          className="w-full p-3 border 
            border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700
            text-gray-800 dark:text-gray-100 
            rounded-lg min-h-[120px]
            focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 
            focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter quiz description"
        />

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="mt-6 w-full py-3 
            bg-blue-600 hover:bg-blue-700 
            text-white rounded-lg text-lg font-medium 
            shadow-md transition"
        >
          Update Quiz
        </button>
      </div>
    </div>
  );
}
