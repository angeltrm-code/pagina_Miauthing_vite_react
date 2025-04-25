import React, { useState } from "react";
import "../styles/Soporte.css";

function Soporte() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [faqAbierto, setFaqAbierto] = useState(null);

  const faqs = [
    {
      pregunta: "¿Cómo puedo realizar una devolución?",
      respuesta: "Para realizar una devolución, debes contactar con nuestro servicio de atención al cliente dentro de los 14 días posteriores a la compra. Te guiaremos en el proceso y te proporcionaremos una etiqueta de envío gratuita."
    },
    {
      pregunta: "¿Cuánto tiempo tarda en llegar mi pedido?",
      respuesta: "Los pedidos suelen procesarse en 24-48 horas. El tiempo de entrega depende de tu ubicación, pero generalmente es de 2-5 días laborables."
    },
    {
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal, y transferencia bancaria."
    },
    {
      pregunta: "¿Ofrecen garantía en los productos?",
      respuesta: "Sí, todos nuestros productos tienen una garantía mínima de 2 años. Algunos productos pueden tener garantías extendidas según el fabricante."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    alert("Gracias por contactarnos. Te responderemos en breve.");
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="main-soporte">
      <div className="soporte-container">
        <h1>Centro de Soporte</h1>
        <p className="soporte-descripcion">
          Estamos aquí para ayudarte. Elige la opción que mejor se adapte a tus necesidades.
        </p>

        <div className="soporte-grid">
          {/* Sección de FAQ */}
          <section className="faq-section">
            <h2>Preguntas Frecuentes</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${faqAbierto === index ? 'abierto' : ''}`}
                  onClick={() => setFaqAbierto(faqAbierto === index ? null : index)}
                >
                  <div className="faq-pregunta">
                    <h3>{faq.pregunta}</h3>
                    <span className="faq-icon">{faqAbierto === index ? '−' : '+'}</span>
                  </div>
                  {faqAbierto === index && (
                    <div className="faq-respuesta">
                      <p>{faq.respuesta}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Formulario de Contacto */}
          <section className="contacto-section">
            <h2>Contacta con Nosotros</h2>
            <form onSubmit={handleSubmit} className="contacto-form">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="asunto">Asunto</label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="devolucion">Devolución</option>
                  <option value="pedido">Estado del pedido</option>
                  <option value="producto">Información de producto</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Enviar Mensaje
              </button>
            </form>
          </section>
        </div>

        {/* Información de Contacto */}
        <section className="info-contacto">
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <h3>Teléfono</h3>
            <p>900 123 456</p>
            <p>Lunes a Viernes: 9:00 - 18:00</p>
          </div>

          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>soporte@miauthing.com</p>
            <p>Respuesta en 24h</p>
          </div>

          <div className="info-item">
            <i className="fas fa-comments"></i>
            <h3>Chat en vivo</h3>
            <p>Disponible 24/7</p>
            <button className="chat-btn">Iniciar Chat</button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Soporte;
