import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useLibrary } from "./LibraryContext";
import { ROLE_ACCESS } from "../data/seed";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { users } = useLibrary();
  // Only the user's id is stored; the user itself is looked up live so
  // role changes or deletions take effect immediately.
  const [sessionId, setSessionId] = useLocalStorage("clms_session", null);
  const currentUser = users.find((u) => u.id === sessionId) || null;

  function login(memberId, name) {
    const id = memberId.trim().toUpperCase();
    const nm = name.trim().toLowerCase();
    const found = users.find((u) => u.memberId.toUpperCase() === id && u.name.toLowerCase() === nm);
    if (!found) return false;
    setSessionId(found.id);
    return true;
  }

  function logout() {
    setSessionId(null);
  }

  function canAccess(page) {
    return !!currentUser && ROLE_ACCESS[currentUser.role].includes(page);
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, canAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
