import { useLibrary } from "../context/LibraryContext";
import { LOW_STOCK } from "../data/seed";
import StatCard from "../components/StatCard";
import BookCard from "../components/BookCard";

export default function Dashboard() {
  const { books, txns } = useLibrary();

  const totalCopies = books.reduce((sum, b) => sum + b.qty, 0);
  const borrowed = txns.filter((t) => t.type === "borrow" && !t.returnDate).length;
  const lowStockBooks = books.filter((b) => b.qty < LOW_STOCK);

  return (
    <section>
      <h2 className="page-title">Dashboard</h2>

      <div className="stats">
        <StatCard label="Titles" value={books.length} />
        <StatCard label="Total copies" value={totalCopies} />
        <StatCard label="Currently borrowed" value={borrowed} />
        <StatCard label="Low stock" value={lowStockBooks.length} />
      </div>

      {lowStockBooks.length > 0 && (
        <div className="alert">
          <strong>Low stock:</strong> {lowStockBooks.map((b) => b.title).join(", ")}
        </div>
      )}

      <h3 className="section-title">Books we have in our library</h3>
      <div className="card-grid">
        {books.map((b) => <BookCard key={b.id} book={b} />)}
      </div>
    </section>
  );
}
