import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";

export const CartSummary = () => {
    const { getCartTotal, getTotalItems, clearCart, checkout } = useCart();
    const [checkingOut, setCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setCheckingOut(true);
        try {
            await checkout();
        } finally {
            setCheckingOut(false);
        }
    };

    return (
        <div className="cart-summary">
            <h2>Resumen del carrito</h2>
            <p>Total de productos: {getTotalItems()}</p>
            <p>Total a pagar: ${getCartTotal()}</p>
            <button
                className="btn bg-primary primary checkout-button"
                onClick={handleCheckout}
                disabled={checkingOut}
                aria-busy={checkingOut}
            >
                {checkingOut && (
                    <span className="checkout-spinner" aria-hidden="true" />
                )}
                <span>{checkingOut ? "Procesando compra..." : "Finalizar compra"}</span>
            </button>
            <button
                className="btn bg-secondary secondary"
                onClick={clearCart}
                disabled={checkingOut}
            >
                Vaciar carrito
            </button>
        </div>
    );
};