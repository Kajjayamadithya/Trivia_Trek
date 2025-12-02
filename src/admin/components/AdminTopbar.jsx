import React from "react";
import ThemeToggle from "../../components/ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminTopbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <div className="w-full py-4 px-6 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">

      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Admin Dashboard
      </h1>
    </div>
  );
}
