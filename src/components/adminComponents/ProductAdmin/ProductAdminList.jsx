import { Link } from "react-router-dom";
import { ProductAdminItem } from "./ProductAdminItem";
import "./ProductAdmin.css";

export const ProductAdminList = ({
  products,
  loading,
  error,
  deletingId,
  onDelete,
}) => {
  return (
    <section className="product-list">
      <header className="product-list-header">
        <h2>Administrar productos</h2>
        <Link className="product-list-dashboard-link" to="/admin/dashboard">
          Volver al panel
        </Link>
      </header>

      {error && <p className="product-list-error">{error}</p>}

      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length === 0 ? (
        <p>No hay productos para mostrar.</p>
      ) : (
        <ul className="product-list-items">
          {products.map((product) => (
            <ProductAdminItem
              key={product.id}
              product={product}
              deleting={deletingId === product.id}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
};