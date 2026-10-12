export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Today's date as YYYY-MM-DD in the user's local time zone
export function todayStr() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function normalizeIsbn(isbn) {
  return String(isbn).replace(/[^0-9Xx]/g, "").toUpperCase();
}
