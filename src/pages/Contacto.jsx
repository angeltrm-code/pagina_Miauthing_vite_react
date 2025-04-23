import React from "react";
import ContactForm from "../components/ContactForm";
import "./Contacto.css";

const Contacto = () => {
  return (
    <div className="contacto-container">
      <div className="contacto-content">
        <h1>Contacto</h1>
        <p>¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría escucharte!</p>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contacto;
