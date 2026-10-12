import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [message, setMessage] = useState("");

  // Lifecycle: start a timer whenever a new message appears, clear it on change/unmount
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => setMessage(""), 2400);
    return () => clearTimeout(timer);
  }, [message]);

  const notify = useCallback((text) => setMessage(text), []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      {message && <div className="toast" role="status">{message}</div>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
