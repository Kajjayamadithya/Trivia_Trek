import React, { createContext, useContext, useEffect, useState } from "react";
import useQuizStorage from "../hooks/useLocalStorage";

const QuizStorageContext = createContext(undefined);

export const LocalStorageProvider = ({ children }) => {
  const quizStorage = useQuizStorage();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(t);
  }, []);

  const value = {
    quiz: quizStorage.data,
    setQuiz: quizStorage.set,
    updateQuiz: quizStorage.update,
    resetQuiz: quizStorage.reset,
    removeQuiz: quizStorage.remove,
    ready,
  };

  return (
    <QuizStorageContext.Provider value={value}>
      {children}
    </QuizStorageContext.Provider>
  );
};

export function useQuizContext() {
  const ctx = useContext(QuizStorageContext);
  if (!ctx) throw new Error("useQuizContext must be used inside QuizStorageProvider");
  return ctx;
}