import React, { useEffect } from "react";
import { LunaNarrationEngine } from "../../engine/luna/LunaNarrationEngine";

export const LunaNarrationSync = ({ phase, cardName }) => {
  useEffect(() => {
    const line = LunaNarrationEngine.getLineForPhase(phase, cardName);
    if (line) window.speechSynthesis.speak(new SpeechSynthesisUtterance(line));
  }, [phase, cardName]);

  return null;
};
