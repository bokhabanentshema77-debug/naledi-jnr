import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";
import { SEED_BOOKS, SEED_USERS } from "../data/seed";
import { uid, todayStr, normalizeIsbn } from "../utils/helpers";

const LibraryContext = createContext(null);

const isOpenLoan = (t) => t.type === "borrow" && !t.returnDate;

/*
  Transaction shapes stored in `txns`:
    { id, type: "borrow",  bookId, userId, qty: 1, date, dueDate, returnDate }
    { id, type: "restock", bookId, userId: null, qty: n, date, dueDate: null, returnDate: null }

  Every action returns { ok: true } or { ok: false, errors: { field: "message" } }
*/
export function LibraryProvider({ children }) {
  const notify = useToast();
  const [books, setBooks] = useLocalStorage("clms_books", SEED_BOOKS);
  const [users, setUsers] = useLocalStorage("clms_users", SEED_USERS);
  const [txns, setTxns] = useLocalStorage("clms_txns", []);

  /* ----- Books ----- */
  function addBook(data) {
    if (books.some((b) => normalizeIsbn(b.isbn) === normalizeIsbn(data.isbn))) {
      return { ok: false, errors: { isbn: "A book with this ISBN already exists." } };
    }
    setBooks((prev) => [...prev, { ...data, id: uid() }]);
    notify("Book added.");
    return { ok: true };
  }

  function updateBook(id, data) {
    if (books.some((b) => b.id !== id && normalizeIsbn(b.isbn) === normalizeIsbn(data.isbn))) {
      return { ok: false, errors: { isbn: "Another book already uses this ISBN." } };
    }
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
    notify("Book updated.");
    return { ok: true };
  }

  function deleteBook(id) {
    if (txns.some((t) => t.bookId === id && isOpenLoan(t))) {
      notify("Cannot delete: copies of this book are currently borrowed.");
      return { ok: false };
    }
    setBooks((prev) => prev.filter((b) => b.id !== id));
    notify("Book deleted.");
    return { ok: true };
  }

  /* ----- Availability / transactions ----- */
  function addStock(bookId, qty) {
    setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, qty: b.qty + qty } : b)));
    setTxns((prev) => [
      ...prev,
      { id: uid(), type: "restock", bookId, userId: null, qty, date: todayStr(), dueDate: null, returnDate: null },
    ]);
    notify(`Added ${qty} cop${qty === 1 ? "y" : "ies"} to stock.`);
    return { ok: true };
  }

  function borrowBook(bookId, userId, dueDate) {
    const book = books.find((b) => b.id === bookId);
    if (!book || book.qty < 1) {
      return { ok: false, errors: { bookId: "That book is not available." } };
    }
    if (!users.some((u) => u.id === userId)) {
      return { ok: false, errors: { userId: "That member no longer exists." } };
    }
    setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, qty: b.qty - 1 } : b)));
    setTxns((prev) => [
      ...prev,
      { id: uid(), type: "borrow", bookId, userId, qty: 1, date: todayStr(), dueDate, returnDate: null },
    ]);
    notify("Book borrowed. Stock reduced by 1.");
    return { ok: true };
  }

  function returnBook(txnId) {
    const txn = txns.find((t) => t.id === txnId);
    if (!txn || !isOpenLoan(txn)) return { ok: false };
    setTxns((prev) => prev.map((t) => (t.id === txnId ? { ...t, returnDate: todayStr() } : t)));
    setBooks((prev) => prev.map((b) => (b.id === txn.bookId ? { ...b, qty: b.qty + 1 } : b)));
    notify("Book returned.");
    return { ok: true };
  }

  /* ----- Users ----- */
  const adminCount = (list) => list.filter((u) => u.role === "admin").length;

  function addUser(data) {
    const memberId = data.memberId.toUpperCase();
    if (users.some((u) => u.memberId.toUpperCase() === memberId)) {
      return { ok: false, errors: { memberId: "That membership ID is already in use." } };
    }
    setUsers((prev) => [...prev, { ...data, memberId, id: uid() }]);
    notify("User added.");
    return { ok: true };
  }

  function updateUser(id, data) {
    const memberId = data.memberId.toUpperCase();
    if (users.some((u) => u.id !== id && u.memberId.toUpperCase() === memberId)) {
      return { ok: false, errors: { memberId: "That membership ID is already in use." } };
    }
    const existing = users.find((u) => u.id === id);
    if (existing && existing.role === "admin" && data.role !== "admin" && adminCount(users) === 1) {
      return { ok: false, errors: { role: "There must be at least one admin." } };
    }
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data, memberId } : u)));
    notify("User updated.");
    return { ok: true };
  }

  function deleteUser(id, currentUserId) {
    const target = users.find((u) => u.id === id);
    if (!target) return { ok: false };
    if (id === currentUserId) {
      notify("You can't delete the account you're logged in as.");
      return { ok: false };
    }
    if (target.role === "admin" && adminCount(users) === 1) {
      notify("You can't delete the last admin.");
      return { ok: false };
    }
    if (txns.some((t) => t.userId === id && isOpenLoan(t))) {
      notify("Cannot delete: this member still has borrowed books.");
      return { ok: false };
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    notify("User deleted.");
    return { ok: true };
  }

  const value = {
    books, users, txns,
    addBook, updateBook, deleteBook,
    addStock, borrowBook, returnBook,
    addUser, updateUser, deleteUser,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  return useContext(LibraryContext);
}
