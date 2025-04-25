import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import catBoxAnimation from "../animations/cat-box.json";
import curiousCatAnimation from "../animations/curious-appearing-cat.json";
import "../styles/ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [showCat, setShowCat] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowCat(true);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
      });
    }, 3000);
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Contáctanos</h2>

        <div className={`cat-animation ${showCat ? "visible" : ""}`}>
          <Player
            autoplay
            loop={false}
            speed={0.3}
            src={curiousCatAnimation}
            style={{ width: "60px", height: "60px" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onFocus={() => setShowCat(true)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setShowCat(true)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            onFocus={() => setShowCat(true)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Enviar Mensaje
        </button>
      </form>

      {showAnimation && (
        <div className="animation-container">
          <Player
            autoplay
            loop={false}
            src={catBoxAnimation}
            style={{ width: 200, height: 200 }}
          />
          <p>¡Miausaje enviado!</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
