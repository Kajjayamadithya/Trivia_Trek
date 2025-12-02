import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export default function ManageQuestions() {
  const { id } = useParams();
  const { quizzes, updateQuiz } = useQuiz();

  const quiz = quizzes.find((q) => q.id === id);

  const deleteQuestion = async (qId) => {
    const updatedQuiz = {
      ...quiz,
      questions: quiz.questions.filter((q) => q.id !== qId),
    };
    await updateQuiz(id, updatedQuiz);
  };

  // 🌙 Theme Toggle
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{quiz.title} — Manage Questions</h1>

        {/* Toggle Button */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-800 dark:bg-yellow-400 text-white dark:text-black rounded-lg shadow hover:opacity-80 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Add Question */}
      <Link
        to={`/admin/questions/add/${quiz.id}`}
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition inline-block mb-6"
      >
        + Add Question
      </Link>

      {/* Questions List */}
      <div className="space-y-5">
        {quiz.questions.map((q) => (
          <div
            key={q.id}
            className="border dark:border-gray-700 p-5 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2">{q.text}</h3>

            <ul className="ml-6 list-disc">
              {q.options.map((o) => (
                <li
                  key={o.id}
                  className={`py-1 ${
                    o.id === q.answerId
                      ? "text-green-600 font-semibold dark:text-green-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {o.text}
                </li>
              ))}
            </ul>

            <div className="flex gap-4 mt-4">
              <Link
                to={`/admin/questions/edit/${quiz.id}/${q.id}`}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteQuestion(q.id)}
                className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow"
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
