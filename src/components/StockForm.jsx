import { useState } from "react";
import FormField from "./FormField";
import { validateStock } from "../utils/validators";

// Add stock when new copies arrive
export default function StockForm({ books, onSubmit }) {
  const [values, setValues] = useState({ bookId: "", qty: "1" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateStock(values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    onSubmit(values.bookId, parseInt(values.qty, 10));
    setValues({ bookId: "", qty: "1" });
  }

  return (
    <form className="panel form-grid" onSubmit={handleSubmit} noValidate>
      <FormField label="Book" error={errors.bookId}>
        <select name="bookId" value={values.bookId} onChange={handleChange}>
          <option value="">Select book</option>
          {books.map((b) => <option key={b.id} value={b.id}>{b.title} ({b.qty} in stock)</option>)}
        </select>
      </FormField>
      <FormField label="Copies received" error={errors.qty}>
        <input name="qty" type="number" min="1" value={values.qty} onChange={handleChange} />
      </FormField>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Add Stock</button>
      </div>
    </form>
  );
}
