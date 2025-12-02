import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function AddQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes, updateQuiz } = useQuiz();

  const quiz = quizzes.find((q) => q.id === id);

  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAdd = async () => {
    if (!questionText || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      toast.error("Please fill all fields!");
      return;
    }

    const newQuestion = {
      id: `q-${Date.now()}`,
      text: questionText,
      options: [
        { id: "a", text: optionA },
        { id: "b", text: optionB },
        { id: "c", text: optionC },
        { id: "d", text: optionD },
      ],
      answerId: correctAnswer,
    };

    const updatedQuiz = {
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    };

    const success = await updateQuiz(quiz.id, updatedQuiz);

    if (!success) {
      toast.error("Failed to add question");
      return;
    }

    toast.success("Question added successfully!");
    navigate("/admin");
  };

  if (!quiz)
    return <div className="text-center p-10 text-xl dark:text-white">Quiz not found.</div>;

  return (
    <motion.div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-8">
        Add Question — {quiz.title}
      </h1>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col gap-5">
          <input
            placeholder="Question"
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          {[
            { label: "Option A", value: optionA, set: setOptionA, id: "a" },
            { label: "Option B", value: optionB, set: setOptionB, id: "b" },
            { label: "Option C", value: optionC, set: setOptionC, id: "c" },
            { label: "Option D", value: optionD, set: setOptionD, id: "d" },
          ].map((o) => (
            <div key={o.id}>
              <div className="flex gap-3 items-center">
                <input
                  className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  placeholder={o.label}
                  value={o.value}
                  onChange={(e) => o.set(e.target.value)}
                />

                <input
                  type="radio"
                  name="correct"
                  checked={correctAnswer === o.id}
                  onChange={() => setCorrectAnswer(o.id)}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAdd}
          className="mt-8 w-full py-3 bg-indigo-600 text-white rounded-lg"
        >
          Add Question
        </button>
      </div>
    </motion.div>
  );
}
