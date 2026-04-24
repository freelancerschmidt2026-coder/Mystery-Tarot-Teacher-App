// Types for the Cross-Card Story Engine

export interface StoryBeat {
  id: string;
  description: string;
  animationId: string;
  voiceLine: string;
}

export interface CardStoryRole {
  cardId: string;
  role: "PAST" | "PRESENT" | "FUTURE" | "OBSTACLE" | "ALLY" | "OUTCOME";
}

export interface CrossCardStory {
  id: string;
  title: string;
  beats: StoryBeat[];
  involvedCards: CardStoryRole[];
}
