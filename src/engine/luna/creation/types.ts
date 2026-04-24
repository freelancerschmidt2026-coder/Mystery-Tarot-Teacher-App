// Core shared types for Luna's Tarot Creation Engine

export type ElementType = "FIRE" | "WATER" | "AIR" | "EARTH" | "SPIRIT";

export type CardOrientation = "UPRIGHT" | "REVERSED";

export interface TarotKeywordSet {
  light: string[];
  shadow: string[];
  neutral?: string[];
}

export interface TarotCardTemplate {
  id: string;
  name: string;
  suit?: string;
  arcana: "MAJOR" | "MINOR" | "CUSTOM";
  number?: number;
  element?: ElementType;
  archetypeTag: string;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: TarotKeywordSet;
  mythicSymbolism: string;
  emotionalTone: string;
  visualDescription: string;
  animationProfileId: string;
  voiceProfileId: string;
  pathMeaning: string;
}

export interface SpreadPosition {
  id: string;
  label: string;
  description: string;
  pathMeaning: string;
  recommendedOrientation?: CardOrientation;
}

export interface TarotSpreadTemplate {
  id: string;
  name: string;
  description: string;
  positions: SpreadPosition[];
  recommendedDeckId?: string;
}

export interface DeckBoxMeta {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bestUsedFor: string[];
  animated: boolean;
  hasVisualStorytelling: boolean;
  keyConcepts: string[];
  energySignature: string;
}

export interface DeckBoxVisualProfile {
  boxModelId: string;
  textureId: string;
  auraColorHex: string;
  particleProfileId: string;
}

export interface TarotDeckDefinition {
  id: string;
  name: string;
  description: string;
  purposeTags: string[];
  cards: TarotCardTemplate[];
  spreads: TarotSpreadTemplate[];
  boxMeta: DeckBoxMeta;
  boxVisual: DeckBoxVisualProfile;
}

export interface MemberProfileSnapshot {
  memberId: string;
  experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "MENTOR";
  dominantThemes: string[];
  frequentQuestions: string[];
  emotionalPatterns: string[];
  preferredDeckIds: string[];
}

export interface LunaDreamFragment {
  id: string;
  title: string;
  narrative: string;
  suggestedDeckSeed?: Partial<TarotDeckDefinition>;
  suggestedSpreadSeed?: Partial<TarotSpreadTemplate>;
  createdAt: string;
}
