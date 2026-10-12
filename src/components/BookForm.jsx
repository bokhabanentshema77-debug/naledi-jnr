import { useState, useEffect } from "react";
import FormField from "./FormField";
import { GENRES } from "../data/seed";
import { validateBook } from "../utils/validators";

const EMPTY = { title: "", author: "", genre: "", isbn: "", qty: "1" };

export default function BookForm({ editingBook, onSubmit, onCancel }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  // Fill the form when "Update" is clicked on a row; clear it otherwise
  useEffect(() => {
    setValues(
      editingBook
        ? { title: editingBook.title, author: editingBook.author, genre: editingBook.genre, isbn: editingBook.isbn, qty: String(editingBook.qty) }
        : EMPTY
    );
    setErrors({});
  }, [editingBook]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateBook(values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    const result = onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      genre: values.genre,
      isbn: values.isbn.trim(),
      qty: parseInt(values.qty, 10),
    });
    if (result.ok) {
      setValues(EMPTY);
      setErrors({});
    } else {
      setErrors(result.errors || {});
    }
  }

  return (
    <form className="panel form-grid" onSubmit={handleSubmit} autoComplete="off" noValidate>
      <FormField label="Title" error={errors.title}>
        <input name="title" value={values.title} onChange={handleChange} />
      </FormField>
      <FormField label="Author" error={errors.author}>
        <input name="author" value={values.author} onChange={handleChange} />
      </FormField>
      <FormField label="Genre" error={errors.genre}>
        <select name="genre" value={values.genre} onChange={handleChange}>
          <option value="">Select genre</option>
          {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </FormField>
      <FormField label="ISBN" error={errors.isbn}>
        <input name="isbn" value={values.isbn} onChange={handleChange} placeholder="978-0798141235" />
      </FormField>
      <FormField label={editingBook ? "Quantity" : "Initial quantity"} error={errors.qty}>
        <input name="qty" type="number" min="0" value={values.qty} onChange={handleChange} />
      </FormField>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{editingBook ? "Save Changes" : "Add Book"}</button>
        {editingBook && <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
