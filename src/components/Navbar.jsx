import { Search, ShoppingBag } from "lucide-react";
import logoImg from '../assets/images/xpower_logo.png';
import "./Navbar.css";

const Navbar = ({ onOpenCheckout }) => {
  return (
    <header className="navbar-wrapper">
      <div className="top-banner">
        Livraison gratuite partout à Dakar et paiement à la livraison 🚚
      </div>
      <nav className="navbar">
      <div className="container nav-container">
        <ul className="nav-links">
          <li>
            <a href="#hero" className="active">
              Accueil
            </a>
          </li>
          <li>
            <a href="#benefits">Bienfaits</a>
          </li>
          <li>
            <a href="#ingredients">Ingrédients</a>
          </li>
          <li>
            <a href="#about">À Propos</a>
          </li>
        </ul>

        <div className="logo">
          <img src={logoImg} alt="X-Power Logo" style={{ height: "60px", margin: "-10px 0" }} />
        </div>

        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="icon-btn" aria-label="Cart" onClick={onOpenCheckout}>
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
      </nav>
    </header>
  );
};

export default Navbar;
