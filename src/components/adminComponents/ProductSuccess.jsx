import { useParams } from "react-router-dom";
import { SuccessPage } from "../SuccessPage/SuccessPage";

export const ProductSuccess = () => {
  const { id } = useParams();

  return (
    <SuccessPage
      type="product"
      title="Producto creado correctamente"
      description="El producto fue registrado en el catálogo."
      id={id}
      idLabel="ID del producto"
      actionText="Volver a productos"
      actionTo="/admin/products"
    />
  );
};