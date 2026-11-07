import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { useState } from "react";

export const PublicLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  //Outlet es como un children, para renderizar cada Route que envuelva PublicLayout
  return (
    <>
      <Header
        isSearchEnabled={isHomePage}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <main>
        <Outlet context={{ searchTerm: isHomePage ? searchTerm : "" }} />
      </main>
      <Footer />
    </>
  );
};