// Spinner.jsx
import './Spinner.css';

export const Spinner = ({ size = 'medium', fullPage = false }) => {
  // Construimos las clases dinámicas según las props
  const containerClass = `spinner-container ${fullPage ? 'spinner-full-page' : ''}`;
  const spinnerClass = `spinner spinner-${size}`;

  return (
  <div className={containerClass} role="status" aria-live="polite">
    <div className={spinnerClass} aria-hidden="true"></div>
    <span className="spinner-label">Cargando...</span>
  </div>
 );
};
