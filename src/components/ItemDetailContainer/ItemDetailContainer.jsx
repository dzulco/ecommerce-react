import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/productsService";

// Este componente tiene la logica para obtener por id
// el detalle de un producto y renderizarlo con ItemDetail

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Si volvieramos a renderizar el componente porque usamos "productos relacionados"
    //Se tendria que volver a renderizar ItemDetailContainer con el nuevo detalle.
    //Entonces: el array de dependencias del useEffect debe llevar el "id" y deberiamos
    //Resetear los estados de loading y error
    setItemDetail(null);
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => setItemDetail(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!itemDetail) return <p>Producto no encontrado</p>;

  return (
    <section>
      <h1>Detalles del producto</h1>
      <div className="products-container">
        <ItemDetail item={itemDetail} />
      </div>
    </section>
  );
};
