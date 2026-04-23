// src/engine/luna/LunaNarrationEngine.ts

export const LunaNarrationEngine = {
  getLineForPhase(phase: EvolutionPhase, cardName: string): string {
    if (phase === "AWAKENING") {
      return `The ${cardName} begins to stir… its message reaching for you.`;
    }

    if (phase === "BREACH") {
      return `The truth cannot be contained. Watch closely, seeker.`;
    }

    if (phase === "MANIFESTATION") {
      return `The prophecy reveals itself beyond the card. Listen with your intuition.`;
    }

    return "";
  },
};
