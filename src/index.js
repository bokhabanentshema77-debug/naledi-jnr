import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastProvider } from "./context/ToastContext";
import { LibraryProvider } from "./context/LibraryContext";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <LibraryProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LibraryProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
