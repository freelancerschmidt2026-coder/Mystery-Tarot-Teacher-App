// Types for Luna's evolving personality system

export type LunaMood =
  | "GENTLE"
  | "MYSTICAL"
  | "DIRECT"
  | "SHADOW"
  | "PLAYFUL"
  | "WISE"
  | "ASCENDED";

export interface LunaPersonalityProfile {
  mood: LunaMood;
  auraColor: string;
  voiceTone: string;
  behaviorTags: string[];
  evolutionLevel: number;
}

export interface MemberInteractionSnapshot {
  memberId: string;
  emotionalState: string;
  questionThemes: string[];
  ritualHistory: string[];
  deckUsage: string[];
  moonPhase: string;
}
