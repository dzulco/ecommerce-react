import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const productsRef = collection(db, "products");

// Función para subir productos a Firestore    
export const uploadInitialProducts = async () => {
        const productosRef = collection(db, "products");
        for (const item of listaProductos) {
            const { id, ...datosSinId } = item;
            try {
                await addDoc(productosRef, datosSinId);
            } catch (e) {
                console.error(e);
            }
        }
        alert("¡Productos cargados con éxito!");
};

export const getProducts = async () => {
    try {
        const snapshot = await getDocs(productsRef);
        const productsFormat = snapshot.docs.map((doc) => 
            ({ id: doc.id, ...doc.data() })
        );
        return productsFormat;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

export const getCategories = async () => {
    try {
        const snapshot = await getDocs(productsRef);
        const categories = new Set();
        snapshot.docs.map((doc) => {
            const productData = doc.data();
            if (productData.category) {
                categories.add(productData.category);
            }
        });
        return Array.from(categories);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        throw error;
    }
}

export const getProductById = async (id) => {
    try {
        const productRef = doc(productsRef, id);
        const snapshot = await getDoc(productRef);

        if(snapshot.exists()) {
            const product = {id: snapshot.id, ...snapshot.data()};
            return product;
        } else {
            return null; // Producto no encontrado
        }
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        throw error;
    }
};
        

