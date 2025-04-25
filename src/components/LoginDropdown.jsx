import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginDropdown.css";
import LottieTransition from "./LottieTransition";

const LoginDropdown = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {
      // Simulamos la autenticación
      if (username.toLowerCase() === "angeltrm-code" && password === "1234") {
        setShowAnimation(true); // Mostramos la animación
        onClose(); // Cerramos el dropdown
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    }
  };

  const handleAnimationComplete = () => {
    console.log("Animación completada, navegando al dashboard");
    setShowAnimation(false);
    navigate("/dashboard");
  };

  if (!isOpen && !showAnimation) return null;

  return (
    <>
      {isOpen && (
        <div className="login-dropdown-overlay" onClick={onClose}>
          <div className="login-dropdown" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}
      <LottieTransition
        isActive={showAnimation}
        onTransitionEnd={handleAnimationComplete}
      />
    </>
  );
};

export default LoginDropdown;
