// ModeEngine.js
// Handles reading modes: SHADOW, HEALING, MANIFESTATION, CLARITY

export const ModeEngine = {
  getModeProfile(mode) {
    const map = {
      SHADOW: { tone: "deep", intensity: 90 },
      HEALING: { tone: "warm", intensity: 80 },
      MANIFESTATION: { tone: "bright", intensity: 95 },
      CLARITY: { tone: "clean", intensity: 85 }
    };
    return map[mode] || { tone: "neutral", intensity: 70 };
  }
};
