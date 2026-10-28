import { useEffect, useState } from "react";
import { getOrders } from "../../../services/ordersService";
import { OrdersAdminList } from "./OrdersAdminList";

export const OrdersAdminContainer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((loadError) => {
        console.error("Error al cargar las órdenes:", loadError);
        setError(loadError.message || "No se pudieron cargar las órdenes.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <OrdersAdminList
      orders={orders}
      loading={loading}
      error={error}
    />
  );
};
