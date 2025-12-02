import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageFade from "../components/PageFade";

export default function LandingPage() {
  return (
    <PageFade>
      {/* FULL BACKGROUND WITH DARK OVERLAY */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-psd/3d-rendering-questions-background_23-2151455632.jpg?semt=ais_incoming&w=740&q=80")',
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* CONTENT ABOVE OVERLAY */}
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* LEFT SIDE (TEXT) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-extrabold text-white leading-tight">
                TriviaTrek
              </h1>

              <motion.p
                className="mt-4 text-lg text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Journey through a world of questions — fun, fast, and beautiful.
              </motion.p>

              {/* BUTTONS */}
              <motion.div
                className="mt-8 flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/categories"
                    className="px-6 py-3 bg-gradient-to-r from-[#7F00FF] to-[#00A8FF] 
                               text-white rounded-full shadow-[0_0_20px_rgba(127,0,255,0.5)]
                               hover:shadow-[0_0_30px_rgba(0,168,255,0.7)]
                               transition-all duration-300"
                  >
                    Start Trek
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/categories"
                    className="px-6 py-3 bg-gradient-to-r from-[#7F00FF] to-[#00A8FF] 
                               text-white rounded-full shadow-[0_0_20px_rgba(127,0,255,0.5)]
                               hover:shadow-[0_0_30px_rgba(0,168,255,0.7)]
                               transition-all duration-300"
                  >
                    Browse
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE CARD + FLOATING ICONS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* FLOATING ❓ */}
              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ repeat: Infinity, duration: 2.8 }}
                className="text-[60px] text-white absolute -left-6 top-4 drop-shadow-xl"
              >
                ❓
              </motion.div>

              {/* FLOATING 💡 */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 2.4 }}
                className="text-[55px] text-yellow-300 absolute right-4 top-24 drop-shadow-xl"
              >
                💡
              </motion.div>

              {/* FLOATING 🧠 */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3.2 }}
                className="text-[70px] absolute left-16 bottom-8 drop-shadow-xl"
              >
                🧠
              </motion.div>

              {/* CARD */}
              <div
                className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md 
                           p-10 rounded-3xl border border-gray-200 dark:border-gray-700 
                           shadow-xl flex justify-center items-center 
                           text-3xl font-bold text-primary dark:text-indigo-300"
              >
                🌍 Quiz World
              </div>
            </motion.div>

          </div>

          {/* WHY TRIVIATREK SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">
              Why TriviaTrek?
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              
              {/* CARD 1 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/20 backdrop-blur-xl text-white 
                           rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">🎮 Interactive Fun</h3>
                <p>Play beautifully designed quizzes with smooth animations.</p>
              </motion.div>

              {/* CARD 2 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/20 backdrop-blur-xl text-white 
                           rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">📊 Track Progress</h3>
                <p>Monitor attempts, scores, charts, and performance easily.</p>
              </motion.div>

              {/* CARD 3 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/20 backdrop-blur-xl text-white 
                           rounded-2xl shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">🧠 Grow Knowledge</h3>
                <p>Learn while enjoying hundreds of fun and fast questions.</p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </PageFade>
  );
}
