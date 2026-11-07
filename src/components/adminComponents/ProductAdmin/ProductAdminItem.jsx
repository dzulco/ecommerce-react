import { Link } from "react-router-dom";

export const ProductAdminItem = ({ product, deleting, onDelete }) => {
  return (
    <li className="product-list-item">
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
          disabled={deleting}
        >
          {deleting ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </li>
  );
};
