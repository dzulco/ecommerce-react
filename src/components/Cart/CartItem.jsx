import {Item} from "../Item/Item.jsx";
import {useCart} from "../../context/CartContext.jsx";

export const CartItem = (item) => {
    const { removeItem, getQuantity } = useCart();

    const quantityInCart = getQuantity(item);
    console.log("Cantidad en el carrito para el item:", quantityInCart);

    const removeFromCart = () => {
        removeItem(item.id);
    };

    return (
        <div className="detail-wrapper">
            <Item {...item}>
                <span className="quantity">Cantidad: {quantityInCart}</span>
                <button className="btn bg-primary primary" onClick={removeFromCart}>
                    Quitar del carrito 🗑️
                </button>
            </Item>
        </div>
    );
};