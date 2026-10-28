import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProducts";
import { uploadImage } from "../../../services/uploadImage";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../../services/productsService";
import "./ProductFormContainer.css";

const emptyProduct = {
  name: "",
  price: "",
  category: "",
  description: "",
  image: "",
};

export const ProductFormContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(Boolean(id));
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    if (!id) {
      setInitialLoading(false);
      return;
    }

    getProductById(id)
      .then((productData) => {
        if (!productData) {
          setErrors({ general: "No se encontró el producto." });
          return;
        }

        setProduct({
          name: productData.name ?? "",
          price: productData.price ?? "",
          category: productData.category ?? "",
          description: productData.description ?? "",
          image: productData.image ?? "",
        });
      })
      .catch((error) => {
        setErrors({ general: error.message });
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((previous) => ({ ...previous, [name]: value }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0] ?? null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateProduct({ ...product, file });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const image = file ? await uploadImage(file) : product.image;
      const productData = {
        name: product.name.trim(),
        price: Number(product.price),
        category: product.category.trim(),
        description: product.description.trim(),
        image,
      };

      if (id) {
        await updateProduct(id, productData);
        navigate("/admin/products");
      } else {
        const newId = await createProduct(productData);
        navigate(`/admin/products/success/${newId}`, { replace: true });
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <p>Cargando producto...</p>;
  }

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      isEditing={Boolean(id)}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};