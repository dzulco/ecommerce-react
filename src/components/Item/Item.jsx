import "./Item.css";

// recibe las props del producto y renderiza un card con la informacion del producto
export const Item = ({ name, price, description, image, children }) => {
  return (
    <article className="card">
      <img src={image} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>${price}</p>

      {/* usamos children para reutilizar este componente */}
      {children}
    </article>
  );
};
