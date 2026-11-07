import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import {CartView} from "./components/Cart/CartView.jsx";
import React from "react";
import { ProductFormContainer } from "./components/adminComponents/ProductForm/ProductFormContainer.jsx";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess.jsx";
import { PublicLayout } from "./layouts/PublicLayout.jsx";
import { AdminLayout } from "./layouts/AdminLayout.jsx";
import { Login } from "./components/Login/Login.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard.jsx";
import { ProductAdminContainer } from "./components/adminComponents/ProductAdmin/ProductAdminContainer.jsx";
import { OrdersAdminContainer } from "./components/adminComponents/OrdersAdmin/OrdersAdminContainer.jsx";
import { OrderSuccess } from "./components/OrderSuccess.jsx";


function App() {
  return (
    <React.Fragment>
        <Routes>
          {/******************* RUTAS PUBLICAS ********************/}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/product/:id" element={<ItemDetailContainer />} />
            <Route path="/category/:category" element={<ItemListContainer />} />
            <Route path="/order/success/:id" element={<OrderSuccess />} />
          </Route>
          {/* Login por fuera de AdminLayout para acceder si no estamos logueados */}
          <Route path="/admin/login" element={<Login />} />
          {/**************************** ADMIN *********************/}
          <Route path="/admin" element={<ProtectedRoute>
                                          <AdminLayout />
                                        </ProtectedRoute>
                                        }>
          
            {/**va directo a dashboard pq tiene index */}
            <Route index element={<Navigate to={"dashboard"} />} /> 
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products/new" element={<ProductFormContainer />} />
            <Route path="products/success/:id" element={<ProductSuccess />} />
            <Route path="products/edit/:id" element={<ProductFormContainer />} />
            <Route path="products" element={<ProductAdminContainer />} />
            <Route path="orders" element={<OrdersAdminContainer />} />
            
          </Route>
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    </React.Fragment>
  );
}

export default App;
