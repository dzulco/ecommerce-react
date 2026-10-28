export const validateLogin = ({ email, password }) => {
  const errors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    errors.email = "El email es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Ingresá un email válido";
  }

  if (!password) {
      errors.password = "La contraseña es obligatoria";
  } else if (password.length < 6 || password.length > 20) {
    errors.password = "Debe tener entre 6 y 20 caracteres";
  }

  return errors;
};