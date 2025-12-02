import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageFade from "../components/PageFade";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";


export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    setError("Both fields are required.");
    toast.error("Both fields are required.");
    return;
  }

  const ok = login(form.email, form.password);

  if (!ok) {
    setError("Invalid email or password.");
    toast.error("Invalid email or password.");
    return;
  }

  toast.success("Login successful!");

  navigate("/categories");
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
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-2xl
                     bg-gray-900/80 backdrop-blur-xl
                     border border-gray-700
                     shadow-[0_0_25px_rgba(0,150,255,0.3)]"
        >
          <h2 className="text-3xl font-bold text-white text-center">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-center mt-2 mb-6">
            Login to continue
          </p>

          {error && (
            <div className="text-red-400 text-sm text-center mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-gray-300 mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 
                           border border-gray-600 focus:ring-2 
                           focus:ring-cyan-400 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-300 mb-1 block">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 
                           border border-gray-600 focus:ring-2 
                           focus:ring-cyan-400 outline-none"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-lg 
                         bg-gradient-to-r from-cyan-500 to-blue-600 text-white 
                         font-semibold shadow-[0_0_18px_rgba(0,150,255,0.6)] 
                         hover:opacity-90 transition"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:underline">
              Register
            </Link>
          </p>

        </motion.div>
      </div>
    </PageFade>
  );
}
