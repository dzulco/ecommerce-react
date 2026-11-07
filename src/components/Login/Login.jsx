import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import { useState } from "react";
import { validateLogin } from "../../utils/validateLogin";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors]= useState({});

  {/*************** HANDLE CHANGE ***************/}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));// limpia campo si el usuario lo corrige
  };

  {/*************** HANDLE SUBMIT ***************/}
  const handleSubmit = async (e) => {
    e.preventDefault();

  const validationErrors = validateLogin(formData);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    return;
  }
    
  try {
      await login(formData.email, formData.password);
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar sesión</h2>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Correo electronico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      

      <button className="btn bg-primary" type="submit">
        Ingresar
      </button>
    </form>
  );
};