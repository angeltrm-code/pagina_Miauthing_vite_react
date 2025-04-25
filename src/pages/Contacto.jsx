import React from "react";
import ContactForm from "../components/ContactForm";
import "../styles/Contacto.css";

function Contacto() {
  return (
    <main className="main-contacto">
      <div className="contacto-content">
        <h1>Contacto</h1>
        <p className="contacto-descripcion">¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría escucharte!</p>
        <ContactForm />
      </div>
    </main>
  );
}

export default Contacto;
