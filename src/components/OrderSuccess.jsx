import { useParams } from "react-router-dom";
import { SuccessPage } from "./SuccessPage/SuccessPage";

export const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <SuccessPage
      type="order"
      title={`Orden generada con éxito (Nro. ${id})`}
      description="Gracias por su compra."
      actionText="Seguir comprando"
      actionTo="/"
    />
  );
};
