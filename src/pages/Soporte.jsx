import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import catBoxAnimation from "../animations/cat-box.json";
import "../styles/Soporte.css";

function Soporte() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [faqAbierto, setFaqAbierto] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const faqs = [
    {
      pregunta: "¿Cómo puedo realizar una devolución?",
      respuesta: "Para realizar una devolución, debes contactar con nuestro servicio de atención al cliente dentro de los 14 días posteriores a la compra. Te guiaremos en el proceso y te proporcionaremos una etiqueta de envío gratuita. El reembolso se procesará en un plazo de 3-5 días hábiles tras recibir el producto."
    },
    {
      pregunta: "¿Cuánto tiempo tarda en llegar mi pedido?",
      respuesta: "Los pedidos suelen procesarse en 24-48 horas. El tiempo de entrega estándar es de 2-5 días laborables para península. Para envíos a islas o zonas remotas, el tiempo puede extenderse hasta 7 días laborables. Ofrecemos seguimiento en tiempo real de todos los envíos."
    },
    {
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos múltiples métodos de pago para tu comodidad: tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal, transferencia bancaria, y pago contra reembolso. Todas las transacciones están protegidas con encriptación SSL."
    },
    {
      pregunta: "¿Ofrecen garantía en los productos?",
      respuesta: "Sí, todos nuestros productos tienen una garantía mínima de 2 años según la ley de consumidores. Algunos productos específicos pueden tener garantías extendidas de hasta 5 años según el fabricante. La garantía cubre defectos de fabricación y mal funcionamiento no causado por mal uso."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    try {
      // Simulamos el envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMensajeEnviado(true);
      setShowAnimation(true);
      setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
      
      // Reset del mensaje de éxito y la animación después de 5 segundos
      setTimeout(() => {
        setMensajeEnviado(false);
        setShowAnimation(false);
      }, 5000);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setEnviando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFaqClick = (index) => {
    setFaqAbierto(faqAbierto === index ? null : index);
  };

  const handleChatClick = () => {
    // Aquí iría la lógica para abrir el chat
    alert("El chat estará disponible próximamente");
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
                  onClick={() => handleFaqClick(index)}
                >
                  <div className="faq-pregunta">
                    <h3>{faq.pregunta}</h3>
                    <span className="faq-icon">{faqAbierto === index ? '−' : '+'}</span>
                  </div>
                  <div className={`faq-respuesta ${faqAbierto === index ? 'visible' : ''}`}>
                    <p>{faq.respuesta}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Formulario de Contacto */}
          <section className="contacto-section">
            <h2>Contacta con Nosotros</h2>
            {mensajeEnviado ? (
              <div className="mensaje-exito">
                <Player
                  autoplay
                  loop={false}
                  src={catBoxAnimation}
                  style={{ width: 200, height: 200 }}
                />
                <p>¡Gracias por contactarnos! Te responderemos en breve.</p>
              </div>
            ) : (
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
                    placeholder="Tu nombre completo"
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
                    placeholder="tu@email.com"
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
                    <option value="garantia">Garantía</option>
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
                    placeholder="Describe tu consulta en detalle..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${enviando ? 'enviando' : ''}`}
                  disabled={enviando}
                >
                  {enviando ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            )}
          </section>
        </div>

        {/* Información de Contacto */}
        <section className="info-contacto">
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <h3>Teléfono</h3>
            <p className="info-principal">900 123 456</p>
            <p className="info-secundaria">Lunes a Viernes: 9:00 - 18:00</p>
          </div>

          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p className="info-principal">soporte@miauthing.com</p>
            <p className="info-secundaria">Respuesta en 24h</p>
          </div>

          <div className="info-item">
            <i className="fas fa-comments"></i>
            <h3>Chat en vivo</h3>
            <p className="info-principal">Disponible 24/7</p>
            <button 
              className="chat-btn"
              onClick={handleChatClick}
            >
              Iniciar Chat
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Soporte;
