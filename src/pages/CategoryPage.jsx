import React from "react";
import { useQuiz } from "../context/QuizContext";
import { useQuizContext } from "../context/LocalStorageContext";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import PageFade from "../components/PageFade";

export default function CategoryPage() {
  const { quizzes } = useQuiz();
  const { quiz: quizResults } = useQuizContext();
  const navigate = useNavigate();

  const startQuiz = (quizId) => {
    const attemptsForQuiz = quizResults.filter(item => item.originalId === quizId);
    const nextAttemptId = attemptsForQuiz.length;
    navigate(`/quiz/${quizId}/${nextAttemptId}`);
  };

  return (
    <PageFade>
      {/* FULL BACKGROUND IMAGE */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-psd/3d-rendering-questions-background_23-2151455632.jpg?semt=ais_incoming&w=740&q=80")',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-10">

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Choose a Quiz Category
          </h2>

          {/* Quiz Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {quizzes.map((q) => (
              <QuizCard
                key={q.id}
                quiz={q}
                onStart={() => startQuiz(q.id)}
              />
            ))}
          </div>

        </div>
      </div>
    </PageFade>
  );
}
