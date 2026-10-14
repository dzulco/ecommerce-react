import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/productsService";

// busca en el archivo products.json los productos y los renderiza con ItemList
// si hay una categoría en la URL, filtra los productos por esa categoría
export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const {category} = useParams();

  useEffect(() => {

    getProducts()
      .then((data) => {
          {/*Si hay una categoría en la URL, filtramos los productos por esa categoría, sino mostramos todos los productos*/}
              const filteredProducts = category ?
                  data.filter((product) => product.category === category)
                : data;
          setProducts(filteredProducts);
      })
      .catch((error) => setErrors(error.message))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p>Cargando...</p>;
  if (errors) return <p>{errors}</p>;

  return (
    <section>
        <h1>{category ? `Productos de ${category}` : "Productos"}</h1>
        <ItemList products={products} />
    </section>
  );
};
