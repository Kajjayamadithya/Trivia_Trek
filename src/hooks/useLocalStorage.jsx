import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "quiz";
const DEFAULT_VALUE = [];

export default function useQuizStorage() {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_VALUE;
    } catch {
      return DEFAULT_VALUE;
    }
  });

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  const persist = useCallback((newData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  const set = useCallback(
    (newData) => {
      setData(newData);
      if (mountedRef.current) persist(newData);
    },
    [persist]
  );

  const update = useCallback(
    (patch) => {
      setData((prev) => {
        const next = typeof patch === "function" ? patch(prev) : patch;
        if (mountedRef.current) persist(next);
        return next;
      });
    },
    [persist]
  );

  const reset = useCallback(() => {
    setData(DEFAULT_VALUE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const remove = useCallback(() => {
    setData(DEFAULT_VALUE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { data, set, update, reset, remove };
}