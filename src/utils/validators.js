import { ROLES } from "../data/seed";
import { normalizeIsbn, todayStr } from "./helpers";

// Every validator returns an object of { fieldName: "message" } (empty = valid)

export function validateBook(v) {
  const e = {};
  if (v.title.trim().length < 2) e.title = "Title must be at least 2 characters.";
  if (v.author.trim().length < 2) e.author = "Author must be at least 2 characters.";
  if (!v.genre) e.genre = "Please select a genre.";
  const isbn = normalizeIsbn(v.isbn);
  if (!(/^\d{13}$/.test(isbn) || /^\d{9}[\dX]$/.test(isbn))) {
    e.isbn = "ISBN must have 10 or 13 digits (hyphens allowed).";
  }
  const qty = Number(v.qty);
  if (v.qty === "" || !Number.isInteger(qty) || qty < 0) e.qty = "Quantity must be a whole number, 0 or more.";
  return e;
}

export function validateUser(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
  if (!/^[A-Za-z0-9]{4,15}$/.test(v.memberId.trim())) {
    e.memberId = "Membership ID must be 4-15 letters or digits.";
  }
  if (!ROLES.includes(v.role)) e.role = "Please select a role.";
  return e;
}

export function validateLogin(v) {
  const e = {};
  if (!v.memberId.trim()) e.memberId = "Membership ID is required.";
  if (!v.name.trim()) e.name = "Name is required.";
  return e;
}

export function validateBorrow(v) {
  const e = {};
  if (!v.bookId) e.bookId = "Select a book.";
  if (!v.userId) e.userId = "Select a member.";
  if (!v.dueDate) e.dueDate = "Choose a due date.";
  else if (v.dueDate < todayStr()) e.dueDate = "Due date cannot be in the past.";
  return e;
}

export function validateStock(v) {
  const e = {};
  if (!v.bookId) e.bookId = "Select a book.";
  const qty = Number(v.qty);
  if (v.qty === "" || !Number.isInteger(qty) || qty < 1) e.qty = "Enter a whole number of 1 or more.";
  return e;
}
