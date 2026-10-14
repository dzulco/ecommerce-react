import { Item } from "../Item/Item";
import "./ItemDetail.css";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

// Componente que muestra el detalle de un item y permite agregarlo al carrito
export const ItemDetail = ({ item }) => {

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    addItem(item, quantity);

  };

  const increaseQuantity = () => {
    if (quantity < item.stock) {
      setQuantity(quantity + 1);
    } else {
      alert("No hay stock suficiente para agregar mas productos ❌");
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
        <button className="btn bg-primary primary" onClick={addToCart}>
          Agregar al carrito
        </button>
        
        <div className="quantity-wrapper">
          <button className="btn bg-secondary secondary" onClick={decreaseQuantity}>
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button className="btn bg-secondary secondary" onClick={increaseQuantity}>
            +
          </button>
        </div>
      
      </Item>
    </div>
  );
};
