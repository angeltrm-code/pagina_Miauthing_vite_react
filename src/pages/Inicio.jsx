import React from "react";
import { Link } from "react-router-dom";
import "../styles/Inicio.css";

function Inicio() {
  const equipo = [
    {
      nombre: "Angeltrm-code",
      cargo: "CEO & Fundador",
      descripcion: "Apasionado de los gatos, la programación y el diseño web. Liderando la innovación en MiauThing con creatividad y visión única.",
      imagen: "/src/images/programmerNena.jpg"
    },
    {
      nombre: "Carlos Rodríguez",
      cargo: "CTO",
      descripcion: "Arquitecto del motor que da vida a MiauThing. Apasionado de las soluciones elegantes, el código limpio y los desafíos técnicos. Siempre con un gato cerca del teclado",
      imagen: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60"
    },
    {
      nombre: "Laura Martínez",
      cargo: "Directora de Marketing",
      descripcion: "Especialista en marketing digital y estrategias de crecimiento para la comunidad gaming.",
      imagen: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60"
    },
    {
      nombre: "Alex Torres",
      cargo: "Director de Soporte",
      descripcion: "Gamer de corazón y experto en experiencia de usuario. Dedicado a hacer que cada interacción con MiauThing sea excepcional y memorable.",
      imagen: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60"
    }
  ];

  const servicios = [
    {
      titulo: "Productos Gaming",
      descripcion: "Descubre nuestra selección premium de periféricos y componentes gaming.",
      icono: "🎮",
      link: "/productos"
    },
    {
      titulo: "Comunidad Activa",
      descripcion: "Únete a miles de gamers apasionados. Comparte, aprende y crece con nosotros.",
      icono: "👥",
      link: "/comunidad"
    },
    {
      titulo: "Soporte 24/7",
      descripcion: "Estamos aquí para ayudarte. Soporte técnico profesional siempre disponible.",
      icono: "🛟",
      link: "/soporte"
    }
  ];

  const caracteristicas = [
    {
      titulo: "Envíos Rápidos",
      descripcion: "Entrega en 24/48h en península",
      icono: "🚚"
    },
    {
      titulo: "Garantía Extendida",
      descripcion: "2 años en todos los productos",
      icono: "✨"
    },
    {
      titulo: "Devolución Gratuita",
      descripcion: "30 días para devoluciones",
      icono: "↩️"
    }
  ];

  const productosDestacados = [
    {
      id: 1,
      nombre: "Teclado Mecánico RGB",
      precio: 89.99,
      imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60",
      categoria: "Periféricos"
    },
    {
      id: 2,
      nombre: "Mouse Gaming Pro",
      precio: 49.99,
      imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60",
      categoria: "Periféricos"
    },
    {
      id: 3,
      nombre: "Monitor Gaming 144Hz",
      precio: 299.99,
      imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
      categoria: "Monitores"
    },
    {
      id: 4,
      nombre: "Auriculares Gaming",
      precio: 79.99,
      imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
      categoria: "Audio"
    }
  ];

  return (
    <main className="main-inicio">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            <span className="welcome-text">Bienvenido a</span>
            <span className="brand-name">MiauThing</span>
          </h1>
          <p className="hero-description">
            Donde la pasión por la tecnología y los gatos se encuentra con la excelencia gaming
          </p>
          <div className="hero-buttons">
            <Link to="/productos" className="btn-primary">Explorar Productos</Link>
            <Link to="/unete-a-nosotros" className="btn-secondary">Únete al Equipo</Link>
          </div>
          <div className="hero-features">
            {caracteristicas.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">{feature.icono}</span>
                <div className="feature-text">
                  <h3>{feature.titulo}</h3>
                  <p>{feature.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=60" 
            alt="Gaming Setup" 
            className="hero-img"
          />
          <div className="hero-overlay"></div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="servicios-section">
        <div className="section-header">
          <h2>Nuestros Servicios</h2>
          <p>Descubre todo lo que MiauThing tiene para ofrecerte</p>
        </div>
        <div className="servicios-grid">
          {servicios.map((servicio, index) => (
            <Link to={servicio.link} key={index} className="servicio-card">
              <div className="servicio-icon">{servicio.icono}</div>
              <h3>{servicio.titulo}</h3>
              <p>{servicio.descripcion}</p>
              <span className="servicio-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Productos Destacados</h2>
          <p>Los favoritos de nuestra comunidad</p>
        </div>
        <div className="featured-grid">
          {productosDestacados.map((producto) => (
            <div key={producto.id} className="featured-card">
              <div className="featured-image">
                <img src={producto.imagen} alt={producto.nombre} />
                <div className="featured-overlay">
                  <Link to={`/productos/${producto.id}`} className="btn-primary">
                    Ver Detalles
                  </Link>
                </div>
              </div>
              <div className="featured-info">
                <h3>{producto.nombre}</h3>
                <p className="featured-category">{producto.categoria}</p>
                <p className="featured-price">{producto.precio}€</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/productos" className="ver-mas-link">
          Ver todos los productos <span className="arrow">→</span>
        </Link>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <div className="community-content">
          <h2>Únete a Nuestra Comunidad</h2>
          <p>Conecta con otros apasionados de la tecnología y el gaming</p>
          <div className="community-stats">
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Miembros</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Productos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Soporte</span>
            </div>
          </div>
          <Link to="/comunidad" className="btn-primary">Unirse Ahora</Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>¿Quieres estar al día?</h2>
          <p>Suscríbete a nuestro newsletter y recibe las últimas novedades y ofertas exclusivas</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Tu email" required />
            <button type="submit" className="btn-primary">Suscribirse</button>
          </form>
        </div>
      </section>

      {/* About Section - Unificada */}
      <section className="about-section">
        {/* Sobre Nosotros */}
        <div className="about-content">
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

        {/* Equipo */}
        <div className="equipo-content">
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
        </div>

        {/* CTA */}
        <div className="cta-content">
          <h2>¿Listo para unirte a MiauThing?</h2>
          <p>Descubre nuestra selección de productos y únete a nuestra comunidad</p>
          <div className="cta-buttons">
            <Link to="/productos" className="btn-primary">Explorar Productos</Link>
            <Link to="/comunidad" className="btn-secondary">Conocer la Comunidad</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Inicio;
