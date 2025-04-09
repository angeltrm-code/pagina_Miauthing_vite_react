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
