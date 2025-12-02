import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-primary dark:text-indigo-300 mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-4 text-gray-700 dark:text-gray-200">

          <Link
            to="/admin"
            className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/admin/quizzes"
            className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            🗂 Manage Quizzes
          </Link>

          {/* ❗ REMOVED invalid “Manage Questions” link */}

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

        <Outlet />
      </main>
    </div>
  );
}
