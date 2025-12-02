/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",  // <-- ADD THIS
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        accent: "#F97316",
      },
    },
  },
  plugins: [],
};
