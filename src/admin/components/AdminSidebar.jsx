import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiFilePlus, FiList } from "react-icons/fi";

export default function AdminSidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FiHome /> },
    { name: "Manage Quizzes", path: "/admin/quizzes", icon: <FiList /> },
    { name: "Add Quiz", path: "/admin/quizzes/add", icon: <FiFilePlus /> },
    { name: "Manage Questions", path: "/admin/questions", icon: <FiList /> }, // NEW
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-indigo-400">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            {item.icon} {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
