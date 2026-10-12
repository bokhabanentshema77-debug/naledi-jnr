import { todayStr } from "../utils/helpers";

export default function TransactionTable({ txns, books, users, onReturn }) {
  const rows = txns.slice().reverse(); // newest first

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr><th>Date</th><th>Type</th><th>Book</th><th>Member</th><th>Qty</th><th>Due</th><th>Returned</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan="9" className="empty">No transactions yet.</td></tr>
          )}
          {rows.map((t) => {
            const book = books.find((b) => b.id === t.bookId);
            const user = users.find((u) => u.id === t.userId);
            const isBorrow = t.type === "borrow";
            const overdue = isBorrow && !t.returnDate && t.dueDate < todayStr();
            let pillClass = "pill-ok";
            let pillText = "Stock added";
            if (isBorrow) {
              if (t.returnDate) { pillClass = "pill-ok"; pillText = "Returned"; }
              else if (overdue) { pillClass = "pill-danger"; pillText = "Overdue"; }
              else { pillClass = "pill-warn"; pillText = "Borrowed"; }
            }
            return (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{isBorrow ? "Borrow" : "Restock"}</td>
                <td>{book ? book.title : "(deleted book)"}</td>
                <td>{isBorrow ? (user ? user.name : "(deleted user)") : "-"}</td>
                <td>{isBorrow ? `-${t.qty}` : `+${t.qty}`}</td>
                <td>{t.dueDate || "-"}</td>
                <td>{t.returnDate || "-"}</td>
                <td><span className={`pill ${pillClass}`}>{pillText}</span></td>
                <td className="actions">
                  {isBorrow && !t.returnDate && (
                    <button className="btn btn-sm btn-primary" onClick={() => onReturn(t.id)}>Return</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
