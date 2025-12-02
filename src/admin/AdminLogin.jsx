import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import PageFade from "../components/PageFade";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    const result = login(email, password);

    if (!result?.success || !result?.isAdmin) {
      toast.error("Invalid Admin Credentials");
      return;
    }

    toast.success("Admin Login Successful!");
    navigate("/admin");
  };

  return (
    <PageFade>
      <div
        className="min-h-screen flex items-center justify-center px-4 py-10"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-psd/3d-rendering-questions-background_23-2151455632.jpg?semt=ais_incoming&w=740&q=80")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                     p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center text-primary dark:text-indigo-300">
            Admin Login
          </h1>

          <p className="text-center text-gray-700 dark:text-gray-400 mb-6">
            Authorized Access Only
          </p>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border dark:border-gray-700 
                         bg-gray-50 dark:bg-gray-900 
                         text-gray-800 dark:text-gray-200"
            />

            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border dark:border-gray-700 
                         bg-gray-50 dark:bg-gray-900 
                         text-gray-800 dark:text-gray-200"
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAdminLogin}
              className="w-full py-3 bg-primary text-white rounded-lg 
                         hover:bg-primary/90 transition"
            >
              Login as Admin
            </motion.button>
          </div>
        </motion.div>
      </div>
    </PageFade>
  );
}
