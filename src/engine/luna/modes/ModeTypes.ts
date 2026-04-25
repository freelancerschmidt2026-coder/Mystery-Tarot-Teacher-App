export type LunaMode =
  | "DEFAULT"
  | "SHADOW"
  | "MANIFESTATION";

export interface ModeProfile {
  mode: LunaMode;
  uiThemeTag: string;
  lunaMoodBias: string;
  animationIntensity: "LOW" | "MEDIUM" | "HIGH";
  voiceToneBias: string;
  recommendedRituals: string[];
  recommendedDeckTags: string[];
}

export interface ModeTriggerContext {
  emotionalState: string;
  questionThemes: string[];
  moonPhase: string;
  recentRituals: string[];
  recentDecks: string[];
}
