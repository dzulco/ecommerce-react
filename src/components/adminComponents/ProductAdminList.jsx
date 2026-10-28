import { Link } from "react-router-dom";
import "./ProductAdminListContainer.css";

export const ProductAdminList = ({
  products,
  loading,
  error,
  deletingId,
  onDelete,
}) => {
  return (
    <section className="product-list">
      <h2>Administrar productos</h2>

      {error && <p className="product-list-error">{error}</p>}

      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length === 0 ? (
        <p>No hay productos para mostrar.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li className="product-list-item" key={product.id}>
              {product.image ? (
                <img
                  className="product-list-thumbnail"
                  src={product.image}
                  alt={`Imagen de ${product.name}`}
                />
              ) : (
                <div className="product-list-thumbnail product-list-no-image">
                  Sin imagen
                </div>
              )}

              <div className="product-list-info">
                <span className="product-list-name">{product.name}</span>
                <span>${product.price}</span>
              </div>

              <div className="product-list-actions">
                <Link to={`/admin/products/edit/${product.id}`}>Editar</Link>

                <button
                  className="product-delete-button"
                  type="button"
                  onClick={() => onDelete(product)}
                  disabled={deletingId === product.id}
                >
                  {deletingId === product.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};