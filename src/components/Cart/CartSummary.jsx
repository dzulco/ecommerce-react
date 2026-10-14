import {useCart} from "../../context/CartContext.jsx";

export const CartSummary = () => {
    const { getCartTotal, getTotalItems, clearCart, checkout } = useCart();

    return (
        <div className="cart-summary">
            <h2>Resumen del carrito</h2>
            <p>Total de productos: {getTotalItems()}</p>
            <p>Total a pagar: ${getCartTotal()}</p>
            <button className="btn bg-primary primary" onClick={() => checkout()}>
                Finalizar compra
            </button>
            <button className="btn bg-secondary secondary" onClick={() => {clearCart();}}>
                Vaciar carrito
            </button>
        </div>
    );
};