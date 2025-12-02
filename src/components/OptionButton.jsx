import React from "react";
import { motion } from "framer-motion";

export default function OptionButton({
  text,
  onClick,
  selected,
  disabled,
  correct,
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className={`w-full flex items-center gap-3 p-4 rounded-xl border 
                  transition text-left

                  ${
                    selected
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-gray-300 dark:border-gray-700"
                  }

                  ${
                    correct === true
                      ? "border-green-500 bg-green-100 dark:bg-green-900/30"
                      : correct === false
                      ? "border-red-500 bg-red-100 dark:bg-red-900/30"
                      : ""
                  }

                  ${
                    disabled && !selected
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
      `}
    >
      {/* Radio Button */}
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${
                      selected
                        ? "border-blue-600"
                        : "border-gray-400 dark:border-gray-600"
                    }
                    ${
                      correct === true
                        ? "border-green-600"
                        : correct === false
                        ? "border-red-600"
                        : ""
                    }
        `}
      >
        {/* Inner filled circle */}
        {(selected || correct === true || correct === false) && (
          <div
            className={`w-3 h-3 rounded-full
                        ${
                          correct === true
                            ? "bg-green-600"
                            : correct === false
                            ? "bg-red-600"
                            : "bg-blue-600"
                        }
            `}
          ></div>
        )}
      </div>

      {/* Text */}
      <span className="text-gray-900 dark:text-gray-100 font-medium">
        {text}
      </span>
    </motion.button>
  );
}
