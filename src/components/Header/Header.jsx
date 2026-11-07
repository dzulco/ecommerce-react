import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/MarketTech.png";
import "./Header.css";

export const Header = ({ isSearchEnabled, searchTerm, onSearchChange }) => {
  return (
    <header className="site-header">
      <div className="logo-container">
        <Link to={"/"}>
          <img src={logo} alt="logo MarketTech" />
          <span>MarketTech</span>
        </Link>
      </div>
      {isSearchEnabled && (
        <input
          className="header-search"
          type="search"
          aria-label="Buscar producto"
          placeholder="Buscar producto"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      )}
      <Nav />
    </header>
  );
};
