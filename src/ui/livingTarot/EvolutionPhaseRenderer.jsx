import React from "react";
import Lottie from "lottie-react";

export const EvolutionPhaseRenderer = ({ phase, animationId }) => {
  return (
    <div className="evolution-container">
      <Lottie
        animationData={require(`../../animations/${animationId}.json`)}
        loop={phase === "MANIFESTATION"}
        autoplay
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 10,
        }}
      />
    </div>
  );
};
