import React, { useEffect } from "react";
import { SpatialAudioEngine } from "../../engine/luna/SpatialAudioEngine";

export const SpatialAudioPlayer = ({ phase }) => {
  useEffect(() => {
    let cues = [];

    if (phase === "AWAKENING") cues = SpatialAudioEngine.mysticalWhisper();
    if (phase === "BREACH") cues = SpatialAudioEngine.lunaFlyAcross();
    if (phase === "MANIFESTATION") cues = [SpatialAudioEngine.lunaLandingThud()];

    cues.forEach((cue) => {
      const audio = new Audio(`/sounds/${cue.soundId}.mp3`);
      audio.volume = cue.volume;
      audio.play();
    });
  }, [phase]);

  return null;
};
