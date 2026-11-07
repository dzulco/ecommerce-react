import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useOutletContext, useParams } from "react-router-dom";
import { getProducts } from "../../services/productsService";
import { Spinner } from "../Spinner/Spinner";
import "./ItemListContainer.css";
import { normalizeText } from "../../utils/strings";

// Carga los productos y permite filtrarlos localmente por categoría y búsqueda.
export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const {category} = useParams();
  const { searchTerm = "" } = useOutletContext() ?? {};

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

  const normalizedSearch = normalizeText(searchTerm.trim());
  const filteredProducts = products.filter((product) => {
    const searchableText = normalizeText(
      [product.name, product.description, product.category].join(" ")
    );
    return searchableText.includes(normalizedSearch);
  });

  if (loading) return <Spinner/>;
  if (errors) return <p>{errors}</p>;

  return (
    <section>
        <h1>{category ? `Productos de ${category}` : "Productos"}</h1>
        {filteredProducts.length > 0 ? (
          <ItemList products={filteredProducts} />
        ) : (
          <p className="product-search-empty">
            {searchTerm.trim()
              ? `No se encontraron productos para "${searchTerm.trim()}".`
              : "No hay productos"}
          </p>
        )}
    </section>
  );
};
