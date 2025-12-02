import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CategoryPage from "./pages/CategoryPage";
import Profile from "./pages/UserProfilePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import ReviewPage from "./pages/ReviewPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { LocalStorageProvider } from "./context/LocalStorageContext";
/* ---------------------- ADMIN IMPORTS ---------------------- */
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import ManageQuizzes from "./admin/ManageQuizzes";
import AddQuizPage from "./admin/quizzes/AddQuizPage";
import EditQuizPage from "./admin/quizzes/EditQuizPage";
import ManageQuestions from "./admin/ManageQuestions";
import AddQuestion from "./admin/questions/AddQuestion";
import EditQuestion from "./admin/questions/EditQuestion";
/* ----------------------------------------------------------- */

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <LocalStorageProvider>
        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* USER PROTECTED ROUTES */}
          <Route path="/categories" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>}/>
          <Route path="/quiz/:id/:attemptId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>}/>
          <Route path="/result/:id/:attemptId" element={<ProtectedRoute><ResultPage /></ProtectedRoute>}/>
          <Route path="/review/:id/:attemptId" element={ <ProtectedRoute><ReviewPage /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          {/* ---------------------- ADMIN ROUTES ---------------------- */}
          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
            {/* QUIZZES */}
            <Route path="quizzes" element={<ManageQuizzes />} />
            <Route path="quizzes/add" element={<AddQuizPage />} />
            <Route path="quizzes/edit/:id" element={<EditQuizPage />} />

            {/* QUESTIONS */}
            <Route path="questions" element={<ManageQuizzes />} /> 
            <Route path="questions/:id" element={<ManageQuestions />} />
            <Route path="questions/add/:id" element={<AddQuestion />} />
            <Route path="questions/edit/:quizId/:questionId" element={<EditQuestion />} />
          </Route>
        </Routes>
      </LocalStorageProvider>
    </div>
  );
}
