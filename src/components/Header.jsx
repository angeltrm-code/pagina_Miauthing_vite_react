<<<<<<< HEAD
import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import catImage from "../images/cat.png";
import LoginDropdown from "./LoginDropdown";
import EjectTransition from "./EjectTransition";

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
          <img src={catImage} alt="Logo" className="logo" />
          <form className="search-form">
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
            />
          </form>
        </div>
        <nav className="nav">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/comunidad">Comunidad</Link>
          <Link to="/soporte">Soporte</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
        {isPrivateArea ? (
          <button
            ref={ejectButtonRef}
            onClick={handleLogout}
            className="logout-button"
          >
            Eject
          </button>
        ) : (
          <>
            <button className="login-btn" onClick={() => setIsLoginOpen(true)}>
              Login
            </button>
            <LoginDropdown
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
            />
          </>
        )}
      </header>
      <EjectTransition
        isActive={isEjecting}
        onTransitionEnd={handleTransitionEnd}
        buttonPosition={buttonPosition}
      />
    </>
  );
};

export default Header;
=======
import '../styles/Header.css';  // Importar los estilos del Header

import { Link } from 'react-router-dom';
import logo from '../assets/cat.png';  // Importar el logo

export default function Header() {
  return (
    <header>
      <nav className="nav-container">
        <div className="nav-izquierda">
          <img src={logo} alt="Logo Gatito" className="logo" />
          <input type="text" placeholder="Buscar..." className="search" />
        </div>
        <div className="nav-derecha">
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/comunidad">Comunidad</Link></li>
            <li><Link to="/soporte">Soporte</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
>>>>>>> 9853fd3627d961828286247ddc2a0e186dfd14b5
