import { useState, useMemo } from "react";
import { useLibrary } from "../context/LibraryContext";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";

export default function BookManagement() {
  const { books, addBook, updateBook, deleteBook } = useLibrary();
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) => `${b.title} ${b.author} ${b.isbn}`.toLowerCase().includes(q));
  }, [books, search]);

  function handleSubmit(data) {
    if (editing) {
      const result = updateBook(editing.id, data);
      if (result.ok) setEditing(null);
      return result;
    }
    return addBook(data);
  }

  function handleDelete(book) {
    if (!window.confirm(`Delete "${book.title}"?`)) return;
    if (editing && editing.id === book.id) setEditing(null);
    deleteBook(book.id);
  }

  return (
    <section>
      <h2 className="page-title">Book Management</h2>
      <BookForm editingBook={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />

      <div className="panel">
        <div className="panel-head">
          <h3 className="section-title">All books</h3>
          <input
            type="search"
            className="search"
            placeholder="Search title, author, ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <BookTable books={filtered} onEdit={setEditing} onDelete={handleDelete} />
      </div>
    </section>
  );
}
