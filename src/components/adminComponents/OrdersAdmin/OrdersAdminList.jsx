import { Link } from "react-router-dom";
import { OrdersAdminItem } from "./OrdersAdminItem";
import "./OrdersAdmin.css";

export const OrdersAdminList = ({ orders, loading, error }) => {
  return (
    <section className="orders-admin">
      <header className="orders-admin__header">
        <div>
          <h1>Órdenes</h1>
          <p>Listado de compras recibidas</p>
        </div>
        <Link className="orders-admin__back" to="/admin/dashboard">
          Volver al panel
        </Link>
      </header>

      {error && <p className="orders-admin__error" role="alert">{error}</p>}
      {loading ? (
        <p>Cargando órdenes...</p>
      ) : error ? null : orders.length === 0 ? (
        <p className="orders-admin__empty">Todavía no hay órdenes registradas.</p>
      ) : (
        <div className="orders-admin__list">
          {orders.map((order) => (
            <OrdersAdminItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
};
