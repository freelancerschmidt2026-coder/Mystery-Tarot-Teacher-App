// Core shared types for Luna's Tarot Creation Engine

// ELEMENTS & ORIENTATION
export type ElementType = "FIRE" | "WATER" | "AIR" | "EARTH" | "SPIRIT";
export type CardOrientation = "UPRIGHT" | "REVERSED";

// KEYWORDS
export interface TarotKeywordSet {
  light: string[];
  shadow: string[];
  neutral?: string[];
}

// TAROT CARD TEMPLATE
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

// SPREAD POSITION
export interface SpreadPosition {
  id: string;
  label: string;
  description: string;
  pathMeaning: string;
  recommendedOrientation?: CardOrientation;
}

// SPREAD TEMPLATE
export interface TarotSpreadTemplate {
  id: string;
  name: string;
  description: string;
  positions: SpreadPosition[];
  recommendedDeckId?: string;
}

// DECK BOX META
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

// DECK BOX VISUAL PROFILE
export interface DeckBoxVisualProfile {
  boxModelId: string;
  textureId: string;
  auraColorHex: string;
  particleProfileId: string;
}

// TAROT DECK DEFINITION
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

// 🌙 NEW — PAST READING SNAPSHOT (Unified for Ethereal Mode)
export interface PastReadingSnapshot {
  id: string;
  question: string;
  answerSummary: string;
  createdAt: string;
  auraColor: string;
}

// MEMBER PROFILE SNAPSHOT (UPDATED)
export interface MemberProfileSnapshot {
  memberId: string;
  experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "MENTOR";
  dominantThemes: string[];
  frequentQuestions: string[];
  emotionalPatterns: string[];
  preferredDeckIds: string[];

  // 🌙 NEW FIELD — REQUIRED FOR ETHEREAL MODE
  pastReadings: PastReadingSnapshot[];
}

// DREAM FRAGMENTS
export interface LunaDreamFragment {
  id: string;
  title: string;
  narrative: string;
  suggestedDeckSeed?: Partial<TarotDeckDefinition>;
  suggestedSpreadSeed?: Partial<TarotSpreadTemplate>;
  createdAt: string;
}
