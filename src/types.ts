export interface BaseCard {
  id: string;
  name: string;
  number: number;
  arcana?: "major" | "minor";
  symbol?: string;
  uprightMeaning?: string;
  reversedMeaning?: string;
  keywords?: string[];
  emotionalTone?: string;
}

export interface MinorArcanaCard extends BaseCard {
  suit: string;
  suitDesign: {
    symbol: {
      type: "svg";
      name: string;
      path: string;
    };
    count: number;
    animation: string;
  };
  upright: string;
  reversed: string;
  trainingPrompt: string;
}

export interface MajorArcanaCard extends BaseCard {
  arcana: "major";
  upright: {
    world: string;
    mechanic: string;
    prompt: string;
    experienceSummary: string;
    reward: {
      type: "charm" | "feature_unlock" | "page_unlock" | "badge" | "free_reading";
      name: string;
      description: string;
    };
    featureUnlock: {
      enabled: boolean;
      name: string;
      description: string;
    };
  };
  reversed: {
    world: string;
    mechanic: string;
    prompt: string;
    experienceSummary: string;
    reward: {
      type: "charm" | "feature_unlock" | "page_unlock" | "badge" | "free_reading";
      name: string;
      description: string;
    };
    featureUnlock: {
      enabled: boolean;
      name: string;
      description: string;
    };
  };
}

export type TarotCard = MinorArcanaCard | MajorArcanaCard | LegacyTarotCard;

// Legacy TarotCard for backward compatibility
export interface LegacyTarotCard extends BaseCard {
  symbol: string;
  uprightMeaning: string;
  reversedMeaning: string;
  emotionalTone: string;
  keywords: string[];
  image?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface NoteEntry {
  id: string;
  title: string;
  content: string;
  category: string; // Flash of Fate, Recall the Montra, etc.
  createdAt: string;
  pageNumber: number;
  templateId?: string;
  meta?: any;
}

export interface MemberProfile {
  name: string;
  level: number;
  achievements: Achievement[];
  completedFateThreads: string[];
  mastery: { [cardId: string]: number }; // 0-100
  notes: NoteEntry[];
}

export type TrainingMode = 
  | 'TrainingDeck' 
  | 'MysteryNameDeck' 
  | 'MeaningDeck' 
  | 'SymbolDeck' 
  | 'RightfulOwnerDeck' 
  | 'MatchingGame' 
  | 'QuickTests' 
  | 'MemoryDrills' 
  | 'StoryBuilder'
  | 'WhatIf'
  | 'TarotLanguage';
