import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/MarketTech.png";
import "./Header.css";

export const Header = () => {
  return (
    <header className="site-header">
      <div className="logo-container">
        <Link to={"/"}>
          <img src={logo} alt="logo MarketTech" />
          <span>MarketTech</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};
