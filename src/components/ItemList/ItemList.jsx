import { Item } from "../Item/Item";
import { Link } from "react-router-dom";
import "./ItemList.css";

// Componente que recibe un array de productos y los renderiza en una lista
export const ItemList = ({ products }) => {
  if (!products.length) {
    return <p>No hay productos</p>;
  }

  return (
    <div className="products-container">

      {//Mapeamos los productos
       // por cada uno creamos un Link que nos lleva a la ruta del detalle del producto y
       // dentro del Link renderizamos el componente Item con las props del producto
      }


      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <Item {...product} />
        </Link>
      ))}
    </div>
  );
};
