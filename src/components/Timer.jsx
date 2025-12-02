import React, { useState, useEffect } from "react";

export default function Timer({ total, onExpire }) {
  const [time, setTime] = useState(total);

  // Reset timer when question changes
  useEffect(() => {
    setTime(total);
  }, [total]);

  // Countdown
  useEffect(() => {
    if (time <= 0) {
      onExpire?.();
      return;
    }

    const timerId = setTimeout(() => setTime(time - 1), 1000);

    return () => clearTimeout(timerId);
  }, [time]);

  const percent = (time / total) * 100;

  return (
    <div className="w-full">
      {/* Background bar */}
      <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
        
        {/* Progress bar */}
        <div
          className="h-2 bg-primary rounded-full transition-all"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      {/* Timer text */}
      <p className="text-xs text-right mt-1 font-medium text-gray-700 dark:text-gray-300">
        {time}s
      </p>
    </div>
  );
}
