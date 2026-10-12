import { useLibrary } from "../context/LibraryContext";
import BorrowForm from "../components/BorrowForm";
import StockForm from "../components/StockForm";
import TransactionTable from "../components/TransactionTable";

export default function Transactions() {
  const { books, users, txns, addStock, borrowBook, returnBook } = useLibrary();

  return (
    <section>
      <h2 className="page-title">Transactions</h2>

      <h3 className="section-title">Borrow a book (deducts stock)</h3>
      <BorrowForm books={books} users={users} onSubmit={borrowBook} />

      <h3 className="section-title">Receive new copies (adds stock)</h3>
      <StockForm books={books} onSubmit={addStock} />

      <div className="panel">
        <h3 className="section-title">Transaction history</h3>
        <TransactionTable txns={txns} books={books} users={users} onReturn={returnBook} />
      </div>
    </section>
  );
}
