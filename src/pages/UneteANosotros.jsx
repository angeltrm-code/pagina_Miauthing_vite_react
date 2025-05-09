import React, { useState } from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import catBoxAnimation from "../animations/cat-box.json";
import '../styles/UneteANosotros.css';

function UneteANosotros() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    posicion: '',
    experiencia: '',
    mensaje: ''
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeEnviado(true);
    setShowAnimation(true);
    
    // Reset después de 5 segundos
    setTimeout(() => {
      setMensajeEnviado(false);
      setShowAnimation(false);
      setFormData({
        nombre: '',
        email: '',
        posicion: '',
        experiencia: '',
        mensaje: ''
      });
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="main-contacto">
      <div className="container-translucido">
        {/* Bloque izquierdo: Introducción y beneficios */}
        <div className="left-block">
          <div className="intro-section">
            <h1>Únete a Nuestro Equipo</h1>
            <p className="team-description">
              ¿Te apasionan la tecnologia y los gatos? ¿Quieres ser parte de una comunidad innovadora?
              Estamos buscando personas talentosas y creativas para expandir nuestro equipo.
            </p>
          </div>

          <div className="benefits-section">
            <h2>¿POR QUÉ UNIRTE A NOSOTROS?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <i className="fas fa-laptop-code"></i>
                <h3>Trabajo Remoto</h3>
                <p>Flexibilidad para trabajar desde donde quieras</p>
              </div>
              <div className="benefit-card">
                <i className="fas fa-users"></i>
                <h3>Equipo Increíble</h3>
                <p>Colabora con profesionales apasionados</p>
              </div>
              <div className="benefit-card">
                <i className="fas fa-rocket"></i>
                <h3>Crecimiento</h3>
                <p>Oportunidades de desarrollo profesional</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloque derecho: Formulario */}
        <div className="right-block">
          {mensajeEnviado ? (
            <div className="mensaje-exito">
              <Player
                autoplay
                loop={false}
                src={catBoxAnimation}
                style={{ width: 200, height: 200 }}
              />
              <p>¡Gracias por tu interés! Te contactaremos pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Tu email"
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="posicion"
                  value={formData.posicion}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una posición</option>
                  <option value="desarrollo">Desarrollo</option>
                  <option value="diseño">Diseño</option>
                  <option value="marketing">Marketing</option>
                  <option value="soporte">Soporte</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  required
                >
                  <option value="">Años de experiencia</option>
                  <option value="junior">0-2 años</option>
                  <option value="mid">2-5 años</option>
                  <option value="senior">5+ años</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="¿Por qué quieres unirte a nuestro equipo?"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-submit">Enviar</button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default UneteANosotros;
