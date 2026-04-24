import { TarotCardTemplate } from "../creation/types";

export interface UIAnimationPhase {
  phase: "STILL" | "AWAKENING" | "BREACH" | "MANIFESTATION";
  animationId: string;
  durationMs: number;
}

export class LunaAnimationBridge {
  getAnimationPhases(card: TarotCardTemplate): UIAnimationPhase[] {
    return [
      {
        phase: "STILL",
        animationId: `${card.animationProfileId}_STILL`,
        durationMs: 1500,
      },
      {
        phase: "AWAKENING",
        animationId: `${card.animationProfileId}_AWAKENING`,
        durationMs: 2000,
      },
      {
        phase: "BREACH",
        animationId: `${card.animationProfileId}_BREACH`,
        durationMs: 1800,
      },
      {
        phase: "MANIFESTATION",
        animationId: `${card.animationProfileId}_MANIFEST`,
        durationMs: 3000,
      },
    ];
  }
}
