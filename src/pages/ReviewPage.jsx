import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { useQuizContext } from "../context/LocalStorageContext";
import PageFade from "../components/PageFade";
import { motion } from "framer-motion";

export default function ReviewPage() {
  const { id, attemptId } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useQuiz();
  const { quiz: quizResults } = useQuizContext();

  const resultId = `${id}-${attemptId}`;
  const result = quizResults.find((item) => item.id === resultId);
  const quiz = quizzes.find((q) => q.id === id);

  if (!result || !quiz) {
    navigate("/review/selectQuiz");
    return null;
  }

  return (
    <PageFade>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200"
        >
          Review Answers — {quiz.title} - Attempt {parseInt(attemptId) + 1}
        </motion.h2>

        <div className="space-y-5">
          {quiz.questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow dark:shadow-gray-800"
            >
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {q.text}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 space-y-2"
              >
                {q.options.map((o) => {
                  const isCorrect = o.id === q.answerId;
                  const isSelected = o.id === result.data[q.id];

                  return (
                    <div
                      key={o.id}
                      className={`p-2 rounded border transition ${
                        isCorrect
                          ? "bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400 dark:text-green-200"
                          : isSelected
                          ? "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-400 dark:text-red-200"
                          : "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {o.text}
                    </div>
                  );
                })}
              </motion.div>

              {q.explanation && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="font-semibold">Explanation:</span>{" "}
                  {q.explanation}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PageFade>
  );
}