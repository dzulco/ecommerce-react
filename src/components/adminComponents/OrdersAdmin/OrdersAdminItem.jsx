const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(Number(amount) || 0);

const formatDate = (timestamp) => {
  if (!timestamp) return "Fecha no disponible";

  const date =
    typeof timestamp.toDate === "function"
      ? timestamp.toDate()
      : new Date(timestamp);

  if (Number.isNaN(date.getTime())) return "Fecha no disponible";

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const OrdersAdminItem = ({ order }) => {
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <article className="order-admin">
      <header className="order-admin__header">
        <div>
          <h2>Orden {order.id}</h2>
          <p>{formatDate(order.createdAt)}</p>
        </div>
        <span className="order-admin__status">
          {order.status || "Sin estado"}
        </span>
      </header>

      <ul className="order-admin__items">
        {items.map((item, index) => (
          <li key={`${item.productId || item.id || "producto"}-${index}`}>
            <span>
              {item.name || "Producto"} × {Number(item.quantity) || 0}
            </span>
            <span>
              {formatCurrency(
                (Number(item.unitPrice) || 0) * (Number(item.quantity) || 0)
              )}
            </span>
          </li>
        ))}
      </ul>

      <p className="order-admin__total">
        Total: {formatCurrency(order.total)}
      </p>
    </article>
  );
};
