import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import LoginDropdown from "./LoginDropdown";
import EjectTransition from "./EjectTransition";
import AnimatedLogo from "./AnimatedLogo";
import { useCart } from '../context/CartContext';
import { apiUrl, headers } from '../config';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEjecting, setIsEjecting] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isPrivateArea = location.pathname === "/dashboard" || location.pathname === "/dashboard-cliente";
  const ejectButtonRef = useRef(null);
  const { toggleCart, getCartItemsCount } = useCart();
  const itemCount = getCartItemsCount();

  // Estado para controlar la visibilidad del menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Búsqueda global ---
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Obtener productos al montar
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${apiUrl}/productos`, { headers });
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setProductos([]);
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    if (busqueda.trim().length === 0) {
      setSugerencias([]);
      setShowDropdown(false);
      return;
    }
    // Filtrar sugerencias por nombre, marca o categoría
    const texto = busqueda.toLowerCase();
    const sugerenciasFiltradas = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.marca.toLowerCase().includes(texto) ||
      p.categoria.toLowerCase().includes(texto)
    ).slice(0, 7);
    setSugerencias(sugerenciasFiltradas);
    setShowDropdown(sugerenciasFiltradas.length > 0);
  }, [busqueda, productos]);

  // Cerrar dropdown de búsqueda al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSugerenciaClick = (producto) => {
    setBusqueda("");
    setShowDropdown(false);
    navigate(`/productos/${producto.id}`);
  };

  const handleBusquedaSubmit = (e) => {
    e.preventDefault();
    if (busqueda.trim().length > 0) {
      navigate(`/productos?busqueda=${encodeURIComponent(busqueda)}`);
      setShowDropdown(false);
    }
  };

  // --- Logout ---
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
      // console.log("Audio no soportado");
    }
  };

  const handleTransitionEnd = () => {
    setIsEjecting(false);
    setButtonPosition(null);
    navigate("/");
  };

  // Función para alternar el estado del menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/">
            <AnimatedLogo />
          </Link>
          {/* Botón de menú móvil (hamburguesa) */}
          <button className="menu-button" onClick={toggleMobileMenu}>
            ☰
          </button>
          {/* Formulario de búsqueda */}
          <form className="search-form" onSubmit={handleBusquedaSubmit} autoComplete="off">
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
              value={busqueda}
              onChange={handleBusquedaChange}
              ref={searchInputRef}
              onFocus={() => busqueda && sugerencias.length > 0 && setShowDropdown(true)}
            />
            {/* Dropdown de sugerencias de búsqueda */}
            {showDropdown && (
              <div className="search-suggestions-dropdown" ref={dropdownRef}>
                {sugerencias.map((p) => (
                  <div
                    key={p.id}
                    className="suggestion-item"
                    onClick={() => handleSugerenciaClick(p)}
                  >
                    <img src={p.imagen} alt={p.nombre} className="suggestion-img" />
                    <div className="suggestion-info">
                      <span className="suggestion-nombre">{p.nombre}</span>
                      <span className="suggestion-marca">{p.marca} | {p.categoria}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Navegación principal - se mostrará u ocultará en móvil */}
        <nav className={`nav ${isMobileMenuOpen ? 'nav--open' : ''}`}> {/* Clase condicional */}
          <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
          <Link to="/productos" className={location.pathname === "/productos" ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>Productos</Link>
          <Link to="/comunidad" className={location.pathname === "/comunidad" ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>Comunidad</Link>
          <Link to="/soporte" className={location.pathname === "/soporte" ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>Soporte</Link>
          <Link to="/unete-a-nosotros" className={`${location.pathname === "/unete-a-nosotros" ? "nav-link active" : "nav-link"} unete-link`} onClick={() => setIsMobileMenuOpen(false)}>Únete a nosotros</Link>
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
            <button className="header-login-btn" onClick={() => setIsLoginOpen(true)}>
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

      {/* Overlay oscuro cuando el menú móvil está abierto */}
      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}

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
