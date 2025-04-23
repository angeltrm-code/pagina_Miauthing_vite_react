import React, { useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../animations/cat-transition-login.json";
import "./LottieTransition.css";

const LottieTransition = ({ isActive, onTransitionEnd }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (isActive && playerRef.current) {
      playerRef.current.play();
      console.log("Iniciando animación");
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="lottie-transition">
      <Player
        ref={playerRef}
        src={animationData}
        className="lottie-player"
        keepLastFrame={true}
        autoplay={true}
        speed={2}
        onEvent={(event) => {
          console.log("Evento Lottie:", event);
          if (event === "complete") {
            console.log("Animación completada");
            onTransitionEnd();
          }
          if (event === "error") {
            console.log("Error en la animación");
            onTransitionEnd();
          }
        }}
        style={{
          width: "400px",
          height: "400px",
        }}
      />
    </div>
  );
};

export default LottieTransition;
 