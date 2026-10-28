import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const createOrder = async (cart) => {
  if (!cart.length) {
    throw new Error("El carrito está vacío");
  }

  const items = cart.map((product) => ({
    productId: product.id,
    name: product.name,
    unitPrice: Number(product.price),
    quantity: Number(product.quantity),
  }));

  const total = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const orderRef = await addDoc(collection(db, "orders"), {
    items,
    total,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return orderRef.id;
};

export const getOrders = async () => {
  const ordersQuery = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((orderDoc) => ({
    id: orderDoc.id,
    ...orderDoc.data(),
  }));
};