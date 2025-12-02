import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav
  className="sticky top-0 z-50 w-full 
             bg-gradient-to-r from-white/60 to-white/30 
             dark:from-gray-900/60 dark:to-gray-900/30 
             backdrop-blur-lg border-b border-gray-200 
             dark:border-gray-800 shadow-sm"
>
  <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

    {/* LOGO */}
    <Link
      to="/"
      className="text-3xl font-extrabold bg-gradient-to-r from-[#00E5FF] to-[#00C853] 
                 bg-clip-text text-transparent tracking-wide 
                 drop-shadow-[0_0_6px_rgba(0,229,255,0.5)]"
    >
      TriviaTrek
    </Link>

    {/* RIGHT MENU */}
    <div className="flex gap-4 items-center text-gray-800 dark:text-gray-200">

      <Link to="/" className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        Home
      </Link>

      <Link to="/categories" className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        Categories
      </Link>

      {isAuthenticated && (
        <Link
          to="/profile"
          className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Profile
        </Link>
      )}

      <ThemeToggle />

      {!isAuthenticated ? (
        <>
          <Link
            to="/login"
            className="px-3 py-1 rounded bg-gradient-to-r from-[#7F00FF] to-[#00A8FF] 
                       text-white shadow-[0_0_15px_rgba(127,0,255,0.5)]
                       hover:opacity-90 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-3 py-1 rounded bg-gradient-to-r from-[#7F00FF] to-[#00A8FF] 
                       text-white shadow-[0_0_15px_rgba(127,0,255,0.5)]
                       hover:opacity-90 transition"
          >
            Register
          </Link>
          <Link
            to="/admin-login"
            className="px-3 py-1 rounded bg-gradient-to-r from-[#7F00FF] to-[#00A8FF] 
                       text-white shadow-[0_0_15px_rgba(127,0,255,0.5)]
                       hover:opacity-90 transition"
          >
            Admin
          </Link>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Hi, {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
</nav>

  );
}