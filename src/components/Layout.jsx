import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { page: "dashboard", to: "/", label: "Dashboard" },
  { page: "books", to: "/books", label: "Book Management" },
  { page: "transactions", to: "/transactions", label: "Transactions" },
  { page: "users", to: "/users", label: "User Management" },
];

export default function Layout() {
  const { currentUser, logout, canAccess } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Logged out: only the login page (inside User Management) is reachable
  const visibleItems = currentUser
    ? NAV_ITEMS.filter((item) => canAccess(item.page))
    : [{ page: "users", to: "/users", label: "Login" }];

  return (
    <div className="app">
      <header className="topbar">
        <button className="icon-btn" aria-label="Toggle navigation" onClick={() => setMenuOpen((o) => !o)}>
          &#9776;
        </button>
        <h1 className="brand">Welcome To Our Community Library</h1>
        <div className="topbar-right">
          {currentUser && (
            <>
              <span className="user-chip">{currentUser.name} ({currentUser.role})</span>
              <button className="btn btn-ghost" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </header>

      <div className="layout">
        <nav className={`sidebar${menuOpen ? " open" : ""}`}>
          {visibleItems.map((item) => (
            <NavLink
              key={item.page}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
