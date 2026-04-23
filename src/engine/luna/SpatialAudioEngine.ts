// src/engine/luna/SpatialAudioEngine.ts

export interface SpatialAudioCue {
  soundId: string;
  pan: number;      // -1 = left, 0 = center, 1 = right
  volume: number;   // 0–1
  delayMs: number;  // timing offset
}

export const SpatialAudioEngine = {
  /**
   * Luna flies from left → right across the screen.
   */
  lunaFlyAcross(): SpatialAudioCue[] {
    return [
      { soundId: "wing_flap", pan: -1, volume: 0.6, delayMs: 0 },
      { soundId: "wing_flap", pan: -0.5, volume: 0.7, delayMs: 200 },
      { soundId: "wing_flap", pan: 0, volume: 0.8, delayMs: 400 },
      { soundId: "wing_flap", pan: 0.5, volume: 0.7, delayMs: 600 },
      { soundId: "wing_flap", pan: 1, volume: 0.6, delayMs: 800 },
    ];
  },

  /**
   * Luna lands in front of the user.
   */
  lunaLandingThud(): SpatialAudioCue {
    return {
      soundId: "landing_thud",
      pan: 0,
      volume: 1,
      delayMs: 0,
    };
  },

  /**
   * Whisper that moves around the user’s head.
   */
  mysticalWhisper(): SpatialAudioCue[] {
    return [
      { soundId: "whisper", pan: -0.7, volume: 0.4, delayMs: 0 },
      { soundId: "whisper", pan: 0.7, volume: 0.4, delayMs: 300 },
      { soundId: "whisper", pan: 0, volume: 0.6, delayMs: 600 },
    ];
  },
};
