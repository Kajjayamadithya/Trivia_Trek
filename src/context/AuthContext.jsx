/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("triviatrek_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("triviatrek_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("triviatrek_user");
    }
  }, [user]);

  /* -----------------------------------------
     REGISTER NORMAL USER
  ------------------------------------------ */
  const register = (name, email, password) => {
    const newUser = { name, email, password, scores: [] };
    localStorage.setItem("triviatrek_registeredUser", JSON.stringify(newUser));
    return true;
  };

  /* -----------------------------------------
     LOGIN FUNCTION → ADMIN + USER
  ------------------------------------------ */
  const login = (email, password) => {
    // ---- ADMIN LOGIN ----
    if (email === "tarunadithya200@gmail.com" && password === "Adithya@123") {
      const adminUser = {
        name: "Administrator",
        email,
        role: "admin"
      };

      setUser(adminUser);
      return { success: true, isAdmin: true };
    }

    // ---- NORMAL USER LOGIN ----
    const stored = localStorage.getItem("triviatrek_registeredUser");
    if (!stored) return { success: false };

    const registeredUser = JSON.parse(stored);

    if (
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      const userObject = {
        name: registeredUser.name,
        email: registeredUser.email,
        role: "user",
        scores: registeredUser.scores || []
      };

      setUser(userObject);
      return { success: true, isAdmin: false };
    }

    return { success: false };
  };

  /* -----------------------------------------
     LOGOUT
  ------------------------------------------ */
  const logout = () => setUser(null);

  /* -----------------------------------------
     SAVE SCORE FOR NORMAL USER
  ------------------------------------------ */
  const saveUserScore = (quizId, score) => {
    if (!user || user.role !== "user") return;

    const updatedScores = [
      ...(user.scores || []),
      {
        quizId,
        score,
        date: new Date().toLocaleString()
      }
    ];

    // Update active session user
    const updatedUser = { ...user, scores: updatedScores };
    setUser(updatedUser);

    // Update stored user
    const stored = localStorage.getItem("triviatrek_registeredUser");
    if (stored) {
      const registeredUser = JSON.parse(stored);
      registeredUser.scores = updatedScores;

      localStorage.setItem(
        "triviatrek_registeredUser",
        JSON.stringify(registeredUser)
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        saveUserScore,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === "admin"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
