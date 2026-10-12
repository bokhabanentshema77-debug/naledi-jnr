import { LOW_STOCK } from "../data/seed";
import StatusPill from "./StatusPill";

export default function BookCard({ book }) {
  const low = book.qty < LOW_STOCK;
  return (
    <div className={`book-card${low ? " book-card-low" : ""}`}>
      <div className="book-card-title">{book.title}</div>
      <div className="book-card-author">{book.author}</div>
      <StatusPill qty={book.qty} label={book.qty > 0 ? `${book.qty} available` : "Out of stock"} />
      {low && book.qty > 0 && <div className="low-note">Low stock</div>}
    </div>
  );
}
