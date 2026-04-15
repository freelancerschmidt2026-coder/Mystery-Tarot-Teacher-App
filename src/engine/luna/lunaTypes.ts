export type LunaReadingTone = "gentle" | "direct" | "deep" | "practical" | "mystical";

export type LunaLifeArea =
  | "love"
  | "career"
  | "purpose"
  | "healing"
  | "shadow"
  | "money"
  | "creativity"
  | "family"
  | "self_growth";

export type LunaDepthPreference = "short" | "medium" | "deep";

export type LunaVisualPreference = "on" | "off";

export interface LunaPersonalProfile {
  tonePreference: LunaReadingTone;
  visualPreference: LunaVisualPreference;
  depthPreference: LunaDepthPreference;
  lifeAreaHistory: LunaLifeArea[];
  prefersShadowWork: boolean;
}

export interface LunaGlobalEvolution {
  popularLifeAreas: LunaLifeArea[];
  popularTones: LunaReadingTone[];
  visualUptakeRate: number;
}

export interface LunaAppKnowledge {
  // Placeholder for now – later you can add features, rooms, store items, etc.
  version: string;
}
