export interface ReadingSnapshot {
  id: string;
  createdAt: string;
  cards: string[];
  notes?: string;
}

export interface EvolutionSuggestion {
  type: "clarify" | "deepen" | "close" | "reframe";
  message: string;
}

export const EvolutionEngine = {
  suggestNextStep(reading: ReadingSnapshot): EvolutionSuggestion {
    if (!reading.cards || reading.cards.length === 0) {
      return {
        type: "clarify",
        message: "Draw a card to begin shaping this reading.",
      };
    }

    if (reading.notes && reading.notes.length > 400) {
      return {
        type: "close",
        message: "You’ve gone deep. Consider closing this reading with a final reflection.",
      };
    }

    if (reading.cards.length >= 5) {
      return {
        type: "reframe",
        message: "You have a rich spread. Try reframing the story in one sentence.",
      };
    }

    return {
      type: "deepen",
      message: "Pull one more card to deepen the current thread.",
    };
  },
};

export default EvolutionEngine;
