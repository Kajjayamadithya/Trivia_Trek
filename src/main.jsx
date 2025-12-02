import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { SoundProvider } from "./context/SoundContext";
import { QuizProvider } from "./context/QuizContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <SoundProvider>
            <App />
            <Toaster position="top-center" reverseOrder={false} />
          </SoundProvider>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
