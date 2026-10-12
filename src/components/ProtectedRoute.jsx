import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Sends logged-out visitors to the login (User Management) page,
// and logged-in users without permission back to the dashboard.
export default function ProtectedRoute({ page, children }) {
  const { currentUser, canAccess } = useAuth();
  if (!currentUser) return <Navigate to="/users" replace />;
  if (!canAccess(page)) return <Navigate to="/" replace />;
  return children;
}
