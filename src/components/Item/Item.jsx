import "./Item.css";
import { useCart } from "../../context/CartContext";

// recibe las props del producto y renderiza un card con la informacion del producto
export const Item = ({ id, name, price, description, image, stock, children }) => {
  const { getAvailableStock } = useCart();

  return (
    <article className="card">
      <img src={image} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="item-price">${price}</p>
      
      {/* usamos children para reutilizar este componente */}
      {children}
    </article>
  );
};
