import React, { useEffect, useState } from "react";
import "../styles/EjectTransition.css";

const EjectTransition = ({ isActive, onTransitionEnd }) => {
  const [currentNumber, setCurrentNumber] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let timers = [];

    if (isActive) {
      // Mostrar 3
      setCurrentNumber(3);
      setShowCountdown(true);

      // Mostrar 2
      timers.push(
        setTimeout(() => {
          setShowCountdown(false);
          setTimeout(() => {
            setCurrentNumber(2);
            setShowCountdown(true);
          }, 50);
        }, 1000)
      );

      // Mostrar 1
      timers.push(
        setTimeout(() => {
          setShowCountdown(false);
          setTimeout(() => {
            setCurrentNumber(1);
            setShowCountdown(true);
          }, 50);
        }, 2000)
      );

      // Iniciar explosión
      timers.push(
        setTimeout(() => {
          setShowCountdown(false);
          setShowExplosion(true);
        }, 3000)
      );

      // Mostrar mensaje
      timers.push(
        setTimeout(() => {
          setShowExplosion(false);
          setShowSuccess(true);
        }, 4000)
      );

      // Finalizar
      timers.push(
        setTimeout(() => {
          setShowSuccess(false);
          onTransitionEnd();
        }, 6000)
      );

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [isActive, onTransitionEnd]);

  if (!isActive && !showCountdown && !showExplosion && !showSuccess)
    return null;

  return (
    <>
      {showCountdown && (
        <div key={currentNumber} className="countdown active">
          {currentNumber}
        </div>
      )}
      <div className={`eject-overlay ${showExplosion ? "active" : ""}`}>
        <div className={`explosion ${showExplosion ? "active" : ""}`} />
      </div>
      <div className={`flash ${showExplosion ? "active" : ""}`} />
      {showSuccess && (
        <div className="success-message active">
          Sesión cerrada correctamente
        </div>
      )}
    </>
  );
};

export default EjectTransition;
