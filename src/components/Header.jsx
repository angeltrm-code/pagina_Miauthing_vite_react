import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import LoginDropdown from "./LoginDropdown";
import EjectTransition from "./EjectTransition";
import AnimatedLogo from "./AnimatedLogo";
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEjecting, setIsEjecting] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isPrivateArea = location.pathname === "/dashboard";
  const ejectButtonRef = useRef(null);
  const { toggleCart, getCartItemsCount } = useCart();
  const itemCount = getCartItemsCount();

  const handleLogout = () => {
    if (ejectButtonRef.current) {
      const rect = ejectButtonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsEjecting(true);
    // El sonido se reproducirá solo si el usuario ha interactuado con la página
    try {
      const audio = new Audio("/eject-sound.mp3");
      audio.play().catch(() => {}); // Ignoramos errores si el navegador bloquea el audio
    } catch (error) {
      console.log("Audio no soportado");
    }
  };

  const handleTransitionEnd = () => {
    setIsEjecting(false);
    setButtonPosition(null);
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/">
            <AnimatedLogo />
          </Link>
          <div className="search-form">
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
            />
          </div>
        </div>

        <nav className="nav">
          <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
            Inicio
          </Link>
          <Link
            to="/productos"
            className={location.pathname === "/productos" ? "nav-link active" : "nav-link"}
          >
            Productos
          </Link>
          <Link
            to="/comunidad"
            className={location.pathname === "/comunidad" ? "nav-link active" : "nav-link"}
          >
            Comunidad
          </Link>
          <Link
            to="/soporte"
            className={location.pathname === "/soporte" ? "nav-link active" : "nav-link"}
          >
            Soporte
          </Link>
          <Link
            to="/unete-a-nosotros"
            className={`${location.pathname === "/unete-a-nosotros" ? "nav-link active" : "nav-link"} unete-link`}
          >
            Únete a nosotros
          </Link>
        </nav>

        <div className="header-right">
          {isPrivateArea ? (
            <button
              ref={ejectButtonRef}
              onClick={handleLogout}
              className="logout-button"
            >
              Eject
            </button>
          ) : (
            <button className="login-btn" onClick={() => setIsLoginOpen(true)}>
              Login
            </button>
          )}
          <button className="cart-button" onClick={toggleCart}>
            <span className="cart-icon">🛒</span>
            {itemCount > 0 && (
              <span className="cart-count">{itemCount}</span>
            )}
          </button>
        </div>
      </header>

      <LoginDropdown
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <EjectTransition
        isActive={isEjecting}
        onTransitionEnd={handleTransitionEnd}
        buttonPosition={buttonPosition}
      />
    </>
  );
};

export default Header;
