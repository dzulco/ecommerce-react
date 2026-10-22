import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProducts";
import { uploadImage } from "../../../services/uploadImage";
import { createProduct } from "../../../services/productsService";
import "./ProductFormContainer.css";

export const ProductFormContainer = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: ""
    });

    // cada vez que cambia algun input del form
    const handleChange = (e) => {
        const{name,value} = e.target;
        setProduct({...product, [name]:value});
    };
    
    // cada vez que cambia el file del form
    const handleFileChange = (e) => {
        const file = e.target.files[0] || null;
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrors({});

        //validar datos
        const newErrors = validateProduct({...product,file});
        if(Object.keys(newErrors).length>0){
            setErrors(newErrors);
            setLoading(false);
            return;
        }
 
        try {
            //subir imagen
            const imageURL = await uploadImage(file);
            //armar el producto
            const productData = {
                ...product,
                price: Number (product.price),
                image: imageURL, 
            }

            //alta de producto
            const id = await createProduct(productData);

            //vaciar form
            setProduct({});
            setFile(null);

            //navegar a la pag de exito
            //replace true, no permite que vuelva para atrás ( borra del historial de navegacion)
            //si iría para atras tendria los datos viejos del form
            navigate(`/admin/products/success/${id}`, { replace: true });
            
        } catch (error) {
          setErrors({general: error.message});
        } finally {
            setLoading(false);
        }
    };

    return(<ProductFormUI
        product={product}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        />
    );
};
