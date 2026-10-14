import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import {CartView} from "./components/Cart/CartView.jsx";
import React from "react";
import { Admin } from "./components/Admin/Admin.jsx";


function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
