/**
 * Luna App Core Data Models
 * Defined by Jennifer, the GateKeeper
 */

export type LunaTone = "warm" | "calm" | "playful" | "mystic" | "supportive";
export type LunaTeachingStyle = "step-by-step" | "big-picture" | "intuitive" | "structured";
export type LunaSupportLevel = "gentle" | "deep" | "encouraging" | "observational";

export interface Member {
  id: string;                 // MEMBER_ID (UUID or short hash)
  displayName: string;        // chosen Member Name
  mysteryName?: string;       // Optional mystery name
  pronouns?: string;          // Optional pronouns
  email: string;
  createdAt: string;
  lunaProfileId: string;
  subscriptionTier?: string;
  isActivated: boolean;
  hasMetLuna: boolean;        // Whether the member has met Luna
}

export interface ActivationInfo {
  activatedAt: string;
  activatedByLink: boolean;
  memberId: string;
}

export interface LunaProfile {
  id: string;
  memberId: string;
  tone: LunaTone;
  teachingStyle: LunaTeachingStyle;
  supportLevel: LunaSupportLevel;
  lastInteractionAt: string;
  interactionCount: number;
  tags: string[];
}

export interface LunaReading {
  id: string;
  memberId: string;
  title: string;
  summary: string;
  content: string; // The full conversation or reading text
  createdAt: string;
  tags: string[];
  pageNumber: number;
}

export interface NotePadPage {
  id: string;
  memberId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  pageNumber: number;
  type: "reading" | "index" | "manual" | "gatekeeper_note";
  linkedReadingId?: string;
}

export interface BackPocketItem {
  id: string;
  memberId: string;
  label: string;
  description: string;
  type: "charm" | "key" | "tool" | "secret";
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface SentimentAnalysis {
  score: number; // -1 to 1
  label: "positive" | "negative" | "neutral";
}

export interface InteractionContext {
  type: "learning" | "exploration" | "crisis" | "casual";
  content: string;
}
