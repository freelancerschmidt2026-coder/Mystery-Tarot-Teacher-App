import type { MajorArcanaCard } from "../../types";

export type MajorOrientation = "upright" | "reversed";

export interface MajorExperienceContext {
  card: MajorArcanaCard;
  orientation: MajorOrientation;
  userInput: string;
  timestamp: string;
  userId?: string;
}

export interface MajorExperienceVisualEffect {
  id: string;
  payload?: Record<string, unknown>;
}

export interface MajorExperienceResult {
  cardId: string;
  orientation: MajorOrientation;
  prompt: string;
  userInput: string;
  experienceSummary: string;
  reward: MajorArcanaCard["upright"]["reward"];
  featureUnlock: MajorArcanaCard["upright"]["featureUnlock"];
  visualEffects: MajorExperienceVisualEffect[];
}
