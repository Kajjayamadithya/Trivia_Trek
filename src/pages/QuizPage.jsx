import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { useSound } from "../context/SoundContext";
import Timer from "../components/Timer";
import OptionButton from "../components/OptionButton";
import ProgressBar from "../components/ProgressBar";
import PageFade from "../components/PageFade";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizContext } from "../context/LocalStorageContext";

export default function QuizPage() {
  const { id, attemptId } = useParams();
  const navigate = useNavigate();

  const { quizzes, saveAnswer, getQuizAnswers } = useQuiz();
  const { play } = useSound();
  const { updateQuiz, ready } = useQuizContext();

  const quiz = quizzes.find((q) => q.id === id);

  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  const currentAttemptId = parseInt(attemptId) || 0;
  const currentAnswers = getQuizAnswers(id, currentAttemptId);

  // ---------------- SAFETY CHECKS ----------------

  if (!quiz) {
    return (
      <PageFade>
        <div className="text-center py-20 text-xl text-red-500">
          ❌ Quiz not found.
        </div>
      </PageFade>
    );
  }

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <PageFade>
        <div className="text-center py-20 text-xl text-red-500">
          ❗ This quiz has no questions yet.
          <br />
          Ask the admin to add questions.
        </div>
      </PageFade>
    );
  }

  const question = quiz.questions[index];
  const total = quiz.questions.length;

  // ----------------------------------------------------

  const handleSelect = (optionId) => {
    if (locked) return;

    play("click");
    saveAnswer(id, currentAttemptId, question.id, optionId);
    setLocked(true);

    const isCorrect = optionId === question.answerId;

    if (isCorrect) {
      setScore((p) => p + 1);
      setTimeout(() => play("correct"), 120);
    } else {
      setScore((p) => p - 1);
      setTimeout(() => play("wrong"), 120);
    }
  };

  const handleNext = () => {
    if (index + 1 < total) {
      setIndex(index + 1);
      setLocked(false);
    } else {
      // ---------- Calculate Final Score ----------
      const finalScore = quiz.questions.reduce((acc, q) => {
        return acc + (currentAnswers[q.id] === q.answerId ? 1 : 0);
      }, 0);

      const quizResult = {
        id: `${id}-${currentAttemptId}`,
        originalId: id,
        attemptId: currentAttemptId,
        subject: quiz.title,
        score: finalScore,
        total: quiz.questions.length,
        data: currentAnswers,
        date: new Date().toISOString(),
      };

      updateQuiz((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.id === `${id}-${currentAttemptId}`
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = quizResult;
          return updated;
        }
        return [...prev, quizResult];
      });

      navigate(`/result/${id}/${currentAttemptId}`);
    }
  };

  const handlePrev = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setLocked(false);
  };

  return (
    <PageFade>
      <div className="max-w-3xl mx-auto px-4 py-10 transition">
        {/* Header */}
        <motion.div
          className="mb-6 rounded-lg p-4 bg-gradient-to-r from-primary/20 to-accent/10 dark:from-primary/30 dark:to-accent/5 flex justify-between items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {quiz.title} — Attempt {currentAttemptId + 1}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {index + 1} / {total}
            </p>
          </div>

          <motion.div
            className="text-lg font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.4 }}
          >
            Score:
            <span
              className={
                score >= 0
                  ? "text-green-600 dark:text-green-400 ml-2"
                  : "text-red-600 dark:text-red-400 ml-2"
              }
            >
              {score}
            </span>
          </motion.div>
        </motion.div>

        {/* Question Box */}
        <motion.div
          className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {quiz.description}
            </div>
            <div className="w-40">
              <Timer total={quiz.timeLimitSec || 60} onExpire={handleNext} />
            </div>
          </div>

          <ProgressBar current={index + 1} total={total} />

          {/* QUESTION TEXT */}
          <AnimatePresence mode="wait">
            <motion.p
              key={question.id}
              className="mt-6 text-lg font-semibold text-gray-900 dark:text-gray-100"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
            >
              {question.text}
            </motion.p>
          </AnimatePresence>

          {/* OPTIONS */}
          <div className="mt-5 space-y-3">
            {question.options.map((opt) => {
              const isSelected = currentAnswers[question.id] === opt.id;
              return (
                <OptionButton
                  key={opt.id}
                  text={opt.text}
                  onClick={() => handleSelect(opt.id)}
                  disabled={locked}
                  selected={isSelected}
                  correct={
                    locked
                      ? opt.id === question.answerId
                        ? true
                        : isSelected
                          ? false
                          : null
                      : null
                  }
                />
              );
            })}
          </div>

          {/* NAV BUTTONS */}
          <div className="mt-6 flex justify-between">
            <motion.button
              onClick={handlePrev}
              disabled={index === 0}
              className={`px-3 py-1 rounded bg-gradient-to-r from-[#7F00FF] to-[#00A8FF] text-white 
                ${index === 0 ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"}`}
              whileTap={{ scale: 0.9 }}
            >
              Previous
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="px-3 py-1 rounded bg-gradient-to-r from-[#7F00FF] to-[#00A8FF] text-white hover:opacity-90"
              whileTap={{ scale: 0.9 }}
            >
              {index + 1 === total ? "Finish" : "Next"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </PageFade>
  );
}
