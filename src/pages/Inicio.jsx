import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";

const Inicio = () => {
  return (
    <div className="inicio">
      <div className="inicio-content">
        <h1>Bienvenido a MiauThing</h1>
        <p>
          Descubre el futuro de la tecnología felina. Nuestra plataforma combina
          innovación y diversión para crear experiencias únicas para tu gato.
        </p>
        <p>
          Únete a nuestra comunidad y sé parte de la revolución tecnológica para
          mascotas.
        </p>
        <Link to="/productos" className="cta-button">
          Explorar Productos
        </Link>
      </div>
    </div>
  );
};

export default Inicio;
