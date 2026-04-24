import React, { useState, useEffect } from "react";
import { EvolutionPhaseRenderer } from "./EvolutionPhaseRenderer";
import { LunaNarrationSync } from "./LunaNarrationSync";
import { PremiumGateWrapper } from "./PremiumGateWrapper";
import { SpatialAudioPlayer } from "./SpatialAudioPlayer";

export const LivingTarotUIFlow = ({ cardName, evolutionScenes, user }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  const currentPhase = evolutionScenes[phaseIndex];

  useEffect(() => {
    if (!currentPhase) return;

    const timer = setTimeout(() => {
      setPhaseIndex((prev) => prev + 1);
    }, currentPhase.durationMs);

    return () => clearTimeout(timer);
  }, [currentPhase]);

  return (
    <PremiumGateWrapper user={user}>
      <SpatialAudioPlayer phase={currentPhase.phase} />
      <LunaNarrationSync
        phase={currentPhase.phase}
        cardName={cardName}
      />
      <EvolutionPhaseRenderer
        phase={currentPhase.phase}
        animationId={currentPhase.animationId}
      />
    </PremiumGateWrapper>
  );
};
