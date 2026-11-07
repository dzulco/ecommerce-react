import { Item } from "../Item/Item";
import "./ItemDetail.css";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

// Componente que muestra el detalle de un item y permite agregarlo al carrito
export const ItemDetail = ({ item }) => {

  const { addItem, getAvailableStock } = useCart();
  const [quantity, setQuantity] = useState(1);
  const availableToAdd = getAvailableStock(item);

  const addToCart = () => {
    addItem(item, quantity);
  };

  const increaseQuantity = () => {
    if (quantity < availableToAdd) {
      setQuantity(quantity + 1);
    } else {
      alert("No hay stock suficiente para agregar más productos.");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="detail-wrapper">
      <Item {...item}>
        <p className="item-stock">Disponibles: {availableToAdd}</p>
        <button
          className="btn bg-primary primary"
          onClick={addToCart}
          disabled={availableToAdd < 1 || quantity > availableToAdd}
        >
          {availableToAdd > 0 ? "Agregar al carrito" : "Sin stock disponible"}
        </button>
        
        <div className="quantity-wrapper">
          <button
            className="btn bg-secondary secondary"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button
            className="btn bg-secondary secondary"
            onClick={increaseQuantity}
            disabled={quantity >= availableToAdd}
          >
            +
          </button>
        </div>
      
      </Item>
    </div>
  );
};
