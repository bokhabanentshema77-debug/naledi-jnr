import { useState, useEffect } from "react";

// useState that is loaded from, and saved to, localStorage
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch (err) {
      /* corrupted data: fall back to the initial value */
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      /* storage full or blocked: ignore */
    }
  }, [key, value]);

  return [value, setValue];
}
