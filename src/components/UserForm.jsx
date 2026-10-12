import { useState, useEffect } from "react";
import FormField from "./FormField";
import { ROLES } from "../data/seed";
import { validateUser } from "../utils/validators";

const EMPTY = { name: "", memberId: "", role: "member" };

export default function UserForm({ editingUser, onSubmit, onCancel }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(editingUser ? { name: editingUser.name, memberId: editingUser.memberId, role: editingUser.role } : EMPTY);
    setErrors({});
  }, [editingUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateUser(values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    const result = onSubmit({ name: values.name.trim(), memberId: values.memberId.trim(), role: values.role });
    if (result.ok) {
      setValues(EMPTY);
      setErrors({});
    } else {
      setErrors(result.errors || {});
    }
  }

  return (
    <form className="panel form-grid" onSubmit={handleSubmit} autoComplete="off" noValidate>
      <FormField label="Name" error={errors.name}>
        <input name="name" value={values.name} onChange={handleChange} />
      </FormField>
      <FormField label="Membership ID" error={errors.memberId}>
        <input name="memberId" value={values.memberId} onChange={handleChange} />
      </FormField>
      <FormField label="Role" error={errors.role}>
        <select name="role" value={values.role} onChange={handleChange}>
          {ROLES.map((r) => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
        </select>
      </FormField>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{editingUser ? "Save Changes" : "Add User"}</button>
        {editingUser && <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
