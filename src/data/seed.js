export const GENRES = ["Romance", "Drama", "Mystery", "History", "Technology", "Novel"];
export const ROLES = ["member", "librarian", "admin"];

// A book is "low stock" when it has fewer than this many copies (assignment: fewer than 2)
export const LOW_STOCK = 2;

// Which pages each role may open
export const ROLE_ACCESS = {
  admin: ["dashboard", "books", "transactions", "users"],
  librarian: ["dashboard", "transactions"],
  member: ["dashboard"],
};

export const SEED_BOOKS = [
  { id: "b1", title: "Mosali a nkhola", author: "M.S.Phafoli", genre: "Drama", isbn: "978-0798141235", qty: 10 },
  { id: "b2", title: "Meokho ea thabo", author: "S.M.Mofokeng", genre: "Romance", isbn: "978-0798103059", qty: 5 },
  { id: "b3", title: "Makotulo", author: "Z.S.Phoka", genre: "History", isbn: "978-0798127329", qty: 13 },
];

export const SEED_USERS = [
  { id: "u1", name: "Ramakatsa Jnr", memberId: "901020611", role: "admin" },
  { id: "u2", name: "Millie", memberId: "59700294", role: "librarian" },
  { id: "u3", name: "Thato", memberId: "20250001", role: "member" },
];
