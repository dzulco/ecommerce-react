import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useCart} from "../../context/CartContext.jsx";
import { getCategories } from "../../services/productsService.js";



export const Nav = () => {

  const{ getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const [menuOpen, setMenuOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  return (
      <nav>
        <ul className="nav-list">

          <li className="dropdown" ref={dropdownRef}>
            <button className="dropdown-btn" type="button" onClick={() => setMenuOpen(!menuOpen)}>            
              Categorías
            </button>

            {menuOpen && (
                <ul className="dropdown-menu">
                  {categories.map((category) => (
                      <li key={category}>
                        <Link
                            to={`/category/${category}`}
                            onClick={() => setMenuOpen(false)}
                        >
                          {category}
                        </Link>
                      </li>
                  ))}
                </ul>
            )}
          </li>

          <li>
            <Link to={"/cart"}>
              Carrito🛒
              {totalItems > 0 && <span className="incart">{totalItems}</span>}
            </Link>
          </li>
        </ul>
      </nav>
  );
};