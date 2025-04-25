import React from "react";
import "../styles/Inicio.css";

function Inicio() {
  const equipo = [
    {
      nombre: "Ana García",
      cargo: "CEO & Fundadora",
      descripcion: "Apasionada por la tecnología y el gaming, con más de 10 años de experiencia en el sector.",
      imagen: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=b6e3f4"
    },
    {
      nombre: "Carlos Rodríguez",
      cargo: "CTO",
      descripcion: "Experto en desarrollo web y sistemas, liderando la innovación tecnológica de MiauThing.",
      imagen: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=d1d4f9"
    },
    {
      nombre: "Laura Martínez",
      cargo: "Directora de Marketing",
      descripcion: "Especialista en marketing digital y estrategias de crecimiento para la comunidad gaming.",
      imagen: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura&backgroundColor=c0aede"
    },
    {
      nombre: "David Sánchez",
      cargo: "Director de Soporte",
      descripcion: "Comprometido con la excelencia en el servicio al cliente y la satisfacción del usuario.",
      imagen: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ffdfbf"
    }
  ];

  const servicios = [
    {
      titulo: "Productos Gaming",
      descripcion: "Amplia selección de productos gaming de alta calidad, desde periféricos hasta componentes de PC.",
      icono: "🎮"
    },
    {
      titulo: "Comunidad Activa",
      descripcion: "Únete a nuestra comunidad de gamers y comparte experiencias con otros entusiastas.",
      icono: "👥"
    },
    {
      titulo: "Soporte 24/7",
      descripcion: "Atención al cliente disponible las 24 horas para resolver cualquier consulta o problema.",
      icono: "🛟"
    },
    {
      titulo: "Envío Rápido",
      descripcion: "Entrega rápida y segura de todos nuestros productos a cualquier parte del mundo.",
      icono: "🚚"
    }
  ];

  return (
    <main className="main-inicio">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a MiauThing</h1>
          <p className="hero-subtitle">Tu destino definitivo para el mundo gaming</p>
          <div className="hero-buttons">
            <a href="/productos" className="btn-primary">Ver Productos</a>
            <a href="/comunidad" className="btn-secondary">Unirse a la Comunidad</a>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <div className="container-translucido">
        <section className="servicios-section">
          <h2>Nuestros Servicios</h2>
          <div className="servicios-grid">
            {servicios.map((servicio, index) => (
              <div key={index} className="servicio-card">
                <div className="servicio-icon">{servicio.icono}</div>
                <h3>{servicio.titulo}</h3>
                <p>{servicio.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sobre Nosotros Section */}
      <div className="container-translucido">
        <section className="sobre-nosotros-section">
          <div className="sobre-nosotros-content">
            <h2>Sobre MiauThing</h2>
            <p>
              En MiauThing, nos apasiona el mundo gaming y nos dedicamos a ofrecer la mejor experiencia
              a nuestros clientes. Nuestra misión es proporcionar productos de alta calidad y crear
              una comunidad vibrante donde los gamers puedan compartir su pasión.
            </p>
            <p>
              Fundada en 2023, hemos crecido rápidamente gracias a nuestro compromiso con la calidad
              y la satisfacción del cliente. Nuestro equipo está formado por expertos en tecnología
              y gaming que comparten la misma pasión que nuestros clientes.
            </p>
          </div>
        </section>
      </div>

      {/* Equipo Section */}
      <div className="container-translucido">
        <section className="equipo-section">
          <h2>Nuestro Equipo</h2>
          <div className="equipo-grid">
            {equipo.map((miembro, index) => (
              <div key={index} className="equipo-card">
                <img src={miembro.imagen} alt={miembro.nombre} className="equipo-imagen" />
                <h3>{miembro.nombre}</h3>
                <p className="equipo-cargo">{miembro.cargo}</p>
                <p className="equipo-descripcion">{miembro.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div className="container-translucido">
        <section className="cta-section">
          <div className="cta-content">
            <h2>¿Listo para unirte a MiauThing?</h2>
            <p>Descubre nuestra selección de productos y únete a nuestra comunidad</p>
            <div className="cta-buttons">
              <a href="/productos" className="btn-primary">Explorar Productos</a>
              <a href="/comunidad" className="btn-secondary">Conocer la Comunidad</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Inicio;
