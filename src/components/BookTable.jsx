import StatusPill from "./StatusPill";

export default function BookTable({ books, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Qty</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr><td colSpan="7" className="empty">No books found.</td></tr>
          )}
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.genre}</td>
              <td>{b.isbn}</td>
              <td>{b.qty}</td>
              <td><StatusPill qty={b.qty} /></td>
              <td className="actions">
                <button className="btn btn-sm btn-edit" onClick={() => onEdit(b)}>Update</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(b)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
