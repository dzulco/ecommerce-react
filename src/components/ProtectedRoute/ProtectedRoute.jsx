import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "../Spinner/Spinner";

export const ProtectedRoute = ({ children }) => {
{/*************** accede al contexto desde App -> ProtectedRoute -> si no hay usuario -> Login sino ->children (AdminLayout-> Dashboard)***************/}
    
  const { user, loading } = useAuth();

  if (loading) return <Spinner />; // 🔥 CLAVE: esperamos a saber si hay usuario autenticado antes de redirigir

  if (!user) return <Navigate to="/admin/login" />;

  return children;
};