import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";
import toast from "react-hot-toast";

export default function EditQuestion() {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const { quizzes, updateQuiz } = useQuiz();

  const quiz = quizzes.find((q) => q.id === quizId);
  const question = quiz?.questions.find((q) => q.id === questionId);

  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const [answerId, setAnswerId] = useState("");

  useEffect(() => {
    if (question) {
      setText(question.text);
      setOptions(question.options.map((opt) => opt.text));
      setAnswerId(question.answerId);
    }
  }, [question]);

  const handleSave = async () => {
    if (!text.trim()) return toast.error("Enter the question text");

    const updatedQuestion = {
      ...question,
      text,
      options: options.map((t, i) => ({
        id: `o-${i + 1}`,
        text: t,
      })),
      answerId,
    };

    const updatedQuiz = {
      ...quiz,
      questions: quiz.questions.map((q) =>
        q.id === questionId ? updatedQuestion : q
      ),
    };

    const success = await updateQuiz(quizId, updatedQuiz);

    if (!success) {
      toast.error("Failed to update question");
      return;
    }

    toast.success("Question updated successfully!");
    navigate("/admin");
  };

  if (!quiz || !question)
    return <p className="text-center p-10">❌ Question not found</p>;

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-300 dark:border-gray-700">

        <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Edit Question
        </h1>

        {/* Question Text */}
        <label className="font-medium dark:text-gray-300">Question</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-lg mt-2 mb-6 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
        />

        {/* Options */}
        <div className="space-y-6">
          {options.map((opt, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600">
              <label className="font-medium dark:text-gray-300">Option {i + 1}</label>

              <input
                className="w-full p-2 mt-2 rounded bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600"
                value={opt}
                onChange={(e) => {
                  const updated = [...options];
                  updated[i] = e.target.value;
                  setOptions(updated);
                }}
              />

              <label className="flex items-center gap-2 mt-3">
                <input
                  type="radio"
                  name="correct"
                  checked={answerId === `o-${i + 1}`}
                  onChange={() => setAnswerId(`o-${i + 1}`)}
                />
                <span className="text-gray-800 dark:text-gray-300">
                  Mark as Correct Answer
                </span>
              </label>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Save Question
        </button>
      </div>
    </div>
  );
}
