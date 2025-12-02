/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const QuizContext = createContext();
export const useQuiz = () => useContext(QuizContext);

export function QuizProvider({ children }) {
  const API_URL = "http://localhost:3001/quizzes";

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* -----------------------------------
      USER ANSWERS (LOCAL STORAGE)
  ----------------------------------- */
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("triviatrek_answers");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("triviatrek_answers", JSON.stringify(answers));
  }, [answers]);

  const saveAnswer = (quizId, attemptId, questionId, optionId) => {
    const key = `${quizId}-${attemptId}`;
    setAnswers((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [questionId]: optionId,
      },
    }));
  };

  const getQuizAnswers = (quizId, attemptId) => {
    const key = `${quizId}-${attemptId}`;
    return answers[key] || {};
  };

  /* -----------------------------------
      FETCH QUIZZES
  ----------------------------------- */
  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setQuizzes(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      setError("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------------
      ADD QUIZ
  ----------------------------------- */
  const addQuiz = async (quiz) => {
    try {
      const res = await axios.post(API_URL, quiz, {
        headers: { "Content-Type": "application/json" },
      });
      setQuizzes((prev) => [...prev, res.data]);
      return true;
    } catch (err) {
      console.error("Error adding quiz:", err);
      return false;
    }
  };

  /* -----------------------------------
      UPDATE QUIZ
  ----------------------------------- */
  const updateQuiz = async (id, updatedQuiz) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedQuiz, {
        headers: { "Content-Type": "application/json" },
      });

      setQuizzes((prev) =>
        prev.map((quiz) => (quiz.id === id ? res.data : quiz))
      );

      return true;
    } catch (err) {
      console.error("Error updating quiz:", err);
      return false;
    }
  };

  /* -----------------------------------
      DELETE QUIZ
  ----------------------------------- */
  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
      return true;
    } catch (err) {
      console.error("Error deleting quiz:", err);
      return false;
    }
  };

  /* -----------------------------------
      LOAD WHEN APP STARTS
  ----------------------------------- */
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        loading,
        error,

        // CRUD
        addQuiz,
        updateQuiz,
        deleteQuiz,

        // Fetch
        fetchQuizzes,

        // User answers
        saveAnswer,
        getQuizAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
