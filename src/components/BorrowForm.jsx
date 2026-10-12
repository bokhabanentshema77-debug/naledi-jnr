import { useState } from "react";
import FormField from "./FormField";
import { validateBorrow } from "../utils/validators";
import { todayStr } from "../utils/helpers";

// Deduct stock when a book is borrowed
export default function BorrowForm({ books, users, onSubmit }) {
  const [values, setValues] = useState({ bookId: "", userId: "", dueDate: "" });
  const [errors, setErrors] = useState({});
  const available = books.filter((b) => b.qty > 0);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateBorrow(values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    const result = onSubmit(values.bookId, values.userId, values.dueDate);
    if (result.ok) {
      setValues({ bookId: "", userId: "", dueDate: "" });
      setErrors({});
    } else {
      setErrors(result.errors || {});
    }
  }

  return (
    <form className="panel form-grid" onSubmit={handleSubmit} noValidate>
      <FormField label="Book" error={errors.bookId}>
        <select name="bookId" value={values.bookId} onChange={handleChange}>
          <option value="">Select book</option>
          {available.map((b) => <option key={b.id} value={b.id}>{b.title} ({b.qty} left)</option>)}
        </select>
      </FormField>
      <FormField label="Member" error={errors.userId}>
        <select name="userId" value={values.userId} onChange={handleChange}>
          <option value="">Select member</option>
          {users.map((u) => <option key={u.id} value={u.id}>{u.name} ({u.memberId})</option>)}
        </select>
      </FormField>
      <FormField label="Due date" error={errors.dueDate}>
        <input name="dueDate" type="date" min={todayStr()} value={values.dueDate} onChange={handleChange} />
      </FormField>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Borrow Book</button>
      </div>
    </form>
  );
}
