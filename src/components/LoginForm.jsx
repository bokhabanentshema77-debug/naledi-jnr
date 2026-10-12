import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validators";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ memberId: "", name: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    setLoginError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateLogin(values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    if (login(values.memberId, values.name)) {
      navigate("/");
    } else {
      setLoginError("Membership ID or name does not exist.");
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit} autoComplete="off" noValidate>
        <h2 className="login-title">Community Library</h2>
        <p className="login-sub">Sign in to the management system</p>

        <FormField label="Membership ID" error={errors.memberId}>
          <input name="memberId" value={values.memberId} onChange={handleChange} placeholder="Your membership ID" />
        </FormField>
        <FormField label="Name" error={errors.name}>
          <input name="name" value={values.name} onChange={handleChange} placeholder="Your name" />
        </FormField>

        <button type="submit" className="btn btn-primary btn-block">Login</button>
        {loginError && <p className="error">{loginError}</p>}
        <p className="hint">Demo admin &rarr; ID: <strong>901020611</strong>, Name: <strong>Ramakatsa Jnr</strong></p>
      </form>
    </div>
  );
}
