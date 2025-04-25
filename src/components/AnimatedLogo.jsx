import React, { useRef, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useLocation } from "react-router-dom";
import animationData from "../animations/bad-cat-logo.json";
import "../styles/AnimatedLogo.css";

const AnimatedLogo = () => {
  const playerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Detener la animación actual
    if (playerRef.current) {
      playerRef.current.stop();
    }

    const timer = setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.play();
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, [location.pathname]);

  return (
    <div className="animated-logo">
      <Player
        ref={playerRef}
        src={animationData}
        className="logo-player"
        keepLastFrame={true}
        autoplay={false}
        loop={false}
        speed={0.5}
        style={{
          width: "100px",
          height: "100px",
        }}
      />
    </div>
  );
};

export default AnimatedLogo;
