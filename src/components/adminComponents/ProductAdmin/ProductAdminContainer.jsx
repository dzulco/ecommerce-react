import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../../services/productsService";
import { ProductAdminList } from "./ProductAdminList";

export const ProductAdminContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((loadError) => {
        setError(loadError.message || "No se pudieron cargar los productos.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `¿Querés eliminar el producto "${product.name}"?`
    );

    if (!confirmed) return;

    setDeletingId(product.id);
    setError("");

    try {
      await deleteProduct(product.id);
      setProducts((currentProducts) =>
        currentProducts.filter((item) => item.id !== product.id)
      );
    } catch (deleteError) {
      setError(
        deleteError.message || "No se pudo eliminar el producto."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ProductAdminList
      products={products}
      loading={loading}
      error={error}
      deletingId={deletingId}
      onDelete={handleDelete}
    />
  );
};