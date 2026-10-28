import { useCart } from "../../context/CartContext.jsx";

export const CartItem = (item) => {
  const { removeItem, getQuantity } = useCart();
  const quantityInCart = getQuantity(item);

  return (
    <article className="cart-item">
      {item.image ? (
        <img
          className="cart-item-image"
          src={item.image}
          alt={`Imagen de ${item.name}`}
        />
      ) : (
        <div className="cart-item-image cart-item-no-image">Sin imagen</div>
      )}

      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p className="cart-item-price">${item.price}</p>
        <p>Cantidad: {quantityInCart}</p>
      </div>

      <button
        className="btn bg-primary primary cart-item-remove"
        type="button"
        onClick={() => removeItem(item.id)}
      >
        Quitar del carrito 🗑️
      </button>
    </article>
  );
};