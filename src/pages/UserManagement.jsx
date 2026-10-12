import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

export default function UserManagement() {
  const { users, addUser, updateUser, deleteUser } = useLibrary();
  const { currentUser } = useAuth();
  const [editing, setEditing] = useState(null);

  // Not logged in: show the login form
  if (!currentUser) return <LoginForm />;
  // Only admins manage users
  if (currentUser.role !== "admin") return <Navigate to="/" replace />;

  function handleSubmit(data) {
    if (editing) {
      const result = updateUser(editing.id, data);
      if (result.ok) setEditing(null);
      return result;
    }
    return addUser(data);
  }

  function handleDelete(user) {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    const result = deleteUser(user.id, currentUser.id);
    if (result.ok && editing && editing.id === user.id) setEditing(null);
  }

  return (
    <section>
      <h2 className="page-title">User Management</h2>
      <UserForm editingUser={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />

      <div className="panel">
        <h3 className="section-title">All users</h3>
        <UserTable users={users} currentUserId={currentUser.id} onEdit={setEditing} onDelete={handleDelete} />
      </div>
    </section>
  );
}
