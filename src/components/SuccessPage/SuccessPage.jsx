import { Link } from "react-router-dom";
import "./SuccessPage.css";

const SuccessIcon = ({ type }) => {
  if (type === "order") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 17h28l-2 25H12l-2-25Z" />
        <path d="M18 18v-5a6 6 0 0 1 12 0v5" />
        <path d="m19 30 4 4 8-9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 11h7l4 21h19l5-15H17" />
      <circle cx="22" cy="39" r="2.5" />
      <circle cx="36" cy="39" r="2.5" />
      <path d="m23 24 4 4 8-9" />
    </svg>
  );
};

export const SuccessPage = ({
  type,
  title,
  description,
  id,
  idLabel,
  actionText,
  actionTo,
}) => {
  return (
    <section className="success-page">
      <div className={`success-icon success-icon--${type}`}>
        <SuccessIcon type={type} />
      </div>

      <h2>{title}</h2>
      {id && <p className="success-page__id">{idLabel}: {id}</p>}
      <p className="success-page__description">{description}</p>

      <div className="success-actions">
        <Link className="btn bg-success primary" to={actionTo}>
          {actionText}
        </Link>
      </div>
    </section>
  );
};
