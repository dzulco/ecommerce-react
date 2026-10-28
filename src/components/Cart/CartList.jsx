// este componente se encarga de mostrar la lista de productos en el carrito,
// y busca en el contexto el cart
// y renderiza por cada item un CartItem 

import { useCart } from "../../context/CartContext.jsx";
import { CartItem } from "./CartItem.jsx";

export const CartList = () => {
  const { cart } = useCart();

  return (
    <section className="cart-list">
      

      <div className="cart-items-list">
        {cart.map((product) => (
          <CartItem key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};