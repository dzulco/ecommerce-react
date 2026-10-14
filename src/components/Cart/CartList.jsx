// este componente se encarga de mostrar la lista de productos en el carrito,
// y recibe como props el array de productos y
// la funcion para eliminar un producto del carrito

import { useCart } from "../../context/CartContext.jsx";
import {CartItem} from "./CartItem.jsx";

export const CartList = () => {
    const { cart } = useCart();
    return (
        <div>
            <h2>Productos en el carrito</h2>
            <div className="products-container">
                {cart.map((product) => (
                    <CartItem key={product.id} {...product} />
                ))}
            </div>
        </div>
    )
};