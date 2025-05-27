import React from "react";
import { Link } from "react-router-dom";
import "../styles/MobileMenu.css"; // Importar el nuevo CSS

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay oscuro */}
      {isOpen && <div className="mobile-menu-overlay" onClick={onClose}></div>}

      {/* Menú de navegación móvil */}
      <nav className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}>
        <Link to="/" className="mobile-nav-link" onClick={onClose}>Inicio</Link>
        <Link to="/productos" className="mobile-nav-link" onClick={onClose}>Productos</Link>
        <Link to="/comunidad" className="mobile-nav-link" onClick={onClose}>Comunidad</Link>
        <Link to="/soporte" className="mobile-nav-link" onClick={onClose}>Soporte</Link>
        <Link to="/unete-a-nosotros" className={`mobile-nav-link unete-link`} onClick={onClose}>Únete a nosotros</Link>
      </nav>
    </>
  );
};

export default MobileMenu; 