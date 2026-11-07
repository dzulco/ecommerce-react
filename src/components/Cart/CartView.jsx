// Modulo de vista del carrito de compras
// Este componente se encargara de mostrar los productos que el usuario agrego al carrito
// y permitirle eliminar productos, vaciar el carrito o finalizar la compra
// Tambien mostrara el total de productos y el total a pagar
// Si el carrito esta vacio, mostrara un mensaje indicando que no hay productos en el carrito
// sino mostrará CartList y CartSummary
import { useCart } from "../../context/CartContext.jsx";
import { CartList } from "./CartList.jsx";
import { CartSummary } from "./CartSummary.jsx";
import { CartEmpty } from "./CartEmpty.jsx";
import { Link } from "react-router-dom";
import "./Cart.css";

export const CartView = () => {
  const { isCartEmpty } = useCart();
  const emptyCart = isCartEmpty();

  return (
    <div className="cart-view">
      <h1>Carrito de compras</h1>

      {emptyCart ? (
        <CartEmpty />
      ) : (
        <div className="cart-content">
          <CartList />
          <CartSummary />
        </div>
      )}

      <Link to="/" className="cart-link">
        Seguir comprando 🛍️
      </Link>
    </div>
  );
};