// src/engine/luna/TarotEvolutionEngine.ts

export type EvolutionPhase =
  | "STILL"
  | "AWAKENING"
  | "BREACH"
  | "MANIFESTATION";

export interface EvolutionScene {
  phase: EvolutionPhase;
  animationId: string;
  durationMs: number;
  narration: string | null;
}

export const TarotEvolutionEngine = {
  buildEvolution(cardName: string): EvolutionScene[] {
    switch (cardName) {
      case "The Sun":
        return [
          {
            phase: "STILL",
            animationId: "sun_static",
            durationMs: 2000,
            narration: null,
          },
          {
            phase: "AWAKENING",
            animationId: "sun_glow",
            durationMs: 3000,
            narration: "The warmth begins to rise…",
          },
          {
            phase: "BREACH",
            animationId: "sun_child_breaks_frame",
            durationMs: 2500,
            narration: "Joy breaks through the boundaries of your doubt.",
          },
          {
            phase: "MANIFESTATION",
            animationId: "sun_child_scene",
            durationMs: 6000,
            narration:
              "The path ahead is illuminated. Step forward with confidence.",
          },
        ];

      default:
        return [
          {
            phase: "STILL",
            animationId: `${cardName}_static`,
            durationMs: 2000,
            narration: null,
          },
        ];
    }
  },
};
