import React from "react";

export default function ProgressBar({ current, total }) {
  const percent = (current / total) * 100;

  return (
    <div className="w-full">
      {/* Background bar */}
      <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
        
        {/* Filled progress */}
        <div
          className="h-2 bg-accent rounded-full transition-all"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      {/* Text */}
      <p className="text-xs text-right mt-1 text-gray-700 dark:text-gray-300 font-medium">
        {current} / {total}
      </p>
    </div>
  );
}
