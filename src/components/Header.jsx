import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import LoginDropdown from "./LoginDropdown";
import EjectTransition from "./EjectTransition";
import AnimatedLogo from "./AnimatedLogo";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEjecting, setIsEjecting] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isPrivateArea = location.pathname === "/dashboard";
  const ejectButtonRef = useRef(null);

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
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Inicio
          </Link>
          <Link
            to="/productos"
            className={location.pathname === "/productos" ? "active" : ""}
          >
            Productos
          </Link>
          <Link
            to="/comunidad"
            className={location.pathname === "/comunidad" ? "active" : ""}
          >
            Comunidad
          </Link>
          <Link
            to="/soporte"
            className={location.pathname === "/soporte" ? "active" : ""}
          >
            Soporte
          </Link>
          <Link
            to="/contacto"
            className={location.pathname === "/contacto" ? "active" : ""}
          >
            Contacto
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
