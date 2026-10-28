import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/ordersService";

/* -------------------------------------------------------------------------- */
/*                              CREAMOS CONTEXTO                              */
/* -------------------------------------------------------------------------- */
const CartContext = createContext();

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM HOOK                                */
/* -------------------------------------------------------------------------- */
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};

/* -------------------------------------------------------------------------- */
/*                                  PROVEEDOR                                 */
/* -------------------------------------------------------------------------- */
export const CartProvider = ({ children }) => {
    const navigate = useNavigate();
    // Estado del carrito ( array de items del carrito )
    const [cart, setCart] = useState([]);
    

    const isInCart = (item) => {
        const inCart = cart.some((element) => element.id === item.id);
        return inCart;
    };

    // agrega productos al carrito, si el producto ya esta en el carrito, actualiza la cantidad
    const addItem = (item, quantity) => {

        // Validamos que el item tenga id y no sea undefined
        if (!item || !item.id) {
            alert("Error al agregar al carrito ❌ - Item inválido");
            return;
        }
        // Validamos que la cantidad sea mayor a 0
        const quantityNumber = Number(quantity);
        if (!Number.isInteger(quantityNumber) || quantityNumber <= 0) {
            alert("Error al agregar al carrito ❌ - Cantidad inválida");
            return;
        }

        const availableStock = Number(item.stock);
        if (!Number.isInteger(availableStock) || availableStock < 0) {
            alert("No se pudo verificar el stock de este producto.");
            return;
        }

        const existingItem = cart.find((element) => element.id === item.id);
        const currentQuantity = Number(existingItem?.quantity) || 0;
        if (currentQuantity + quantityNumber > availableStock) {
            alert(`Solo quedan ${Math.max(availableStock - currentQuantity, 0)} unidades disponibles.`);
            return;
        }

        // Bandera para saber si el item ya existía en el carrito
        let itemEncontrado = false;

        // Recorremos una sola vez con .map()
        let updatedCart = cart.map((element) => {
            if (element.id === item.id) {
                itemEncontrado = true; // Marcamos que ya existía
                return { ...element, quantity: element.quantity + quantityNumber }; // Sumamos cantidad
            }
            return element; // Si no es, lo dejamos igual
        });

        // Si terminó el mapa y NUNCA se encontró el item, es un producto nuevo
        if (!itemEncontrado) {
            updatedCart = [...cart, { ...item, quantity: quantityNumber }];
        }

        setCart(updatedCart);
        alert(`Agregaste ${quantityNumber} ${item.name} al carrito 🎉`);
    };

    // Eliminar del carrito
    const removeItem = (id) => {
        // filtra los elementos que no tengan el id pasado por parametro
        const updatedCart = cart.filter((element) => element.id !== id);
        setCart(updatedCart);
        alert("Producto eliminado ✅");

        //Forma funcional "prev"
        //setCart((prev) => prev.filter((element) => element.id !== id));
    };

    // Vacia el carrito
    const clearCart = () => {
        setCart([]);
    };

    //Total de items en carrito (sin importar la cantidad de cada item)
    const getTotalItems = () => {
        return cart.reduce((acc, element) => acc + 1, 0);
    };

    //Total a pagar
    const getCartTotal = () => {
        return cart.reduce((acc, element) => acc + (Number(element.price) * Number(element.quantity)), 0);
    };

    //Checkout
    const checkout = async () => {
        try {
            const orderId = await createOrder(cart);
            clearCart();
            navigate(`/order/success/${orderId}`);
        } catch (error) {
            console.error("Error al crear la orden:", error);
            alert(error.message || "No se pudo guardar la compra. Intenta nuevamente.");
        }
    };

    // Evalua si el carrito esta vacio
    const isCartEmpty = () => {
        return !cart.length;
    };

    //obtiene la cantidad de un item en el carrito, si no esta devuelve 0
    const getQuantity = (item) => {
        const foundItem = findItem(item);
        return foundItem ? foundItem.quantity : 0;
    }

    function findItem(item) {
        return cart.find((element) => element.id === item.id);
    }

    const values = {
        cart,
        addItem,
        clearCart,
        removeItem,
        getCartTotal,
        getTotalItems,
        checkout,
        isCartEmpty,
        getQuantity
    };

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
