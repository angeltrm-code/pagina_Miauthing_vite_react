import React, { useEffect, useRef, useMemo } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../animations/cat-transition-login.json";
import "../styles/LottieTransition.css";

const LottieTransition = ({ isActive, onTransitionEnd }) => {
  const playerRef = useRef(null);

  // Memoizamos los estilos para evitar recreaciones innecesarias
  const playerStyle = useMemo(() => ({
    width: "400px",
    height: "400px",
  }), []);

  useEffect(() => {
    if (isActive && playerRef.current) {
      playerRef.current.play();
    }
  }, [isActive]);

  // Limpiamos la animación cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="lottie-transition">
      <div className="lottie-card">
        <Player
          ref={playerRef}
          src={animationData}
          className="lottie-player"
          keepLastFrame={true}
          autoplay={true}
          speed={2}
          loop={false}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
            progressiveLoad: true,
            hideOnTransparent: true
          }}
          onEvent={(event) => {
            if (event === "complete") {
              onTransitionEnd();
            }
            if (event === "error") {
              onTransitionEnd();
            }
          }}
          style={playerStyle}
        />
      </div>
    </div>
  );
};

export default LottieTransition;
 