import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import BookManagement from "./pages/BookManagement";
import Transactions from "./pages/Transactions";
import UserManagement from "./pages/UserManagement";
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProtectedRoute page="dashboard"><Dashboard /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute page="books"><BookManagement /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute page="transactions"><Transactions /></ProtectedRoute>} />
        {/* Login lives here, so this route is public; the page itself decides what to show */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
