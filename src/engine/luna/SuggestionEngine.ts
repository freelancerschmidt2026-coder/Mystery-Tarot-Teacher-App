// src/engine/luna/LunaSuggestionEngine.ts

export type LunaSuggestionType =
  | "change_border"
  | "change_font"
  | "change_color"
  | "refine_meanings"
  | "review_entire_deck"
  | "propose_store_submission";

export interface LunaSuggestion {
  id: string;
  type: LunaSuggestionType;
  cardId?: string;
  deckId?: string;
  message: string;
  createdAt: string;
}

export interface LunaSuggestionContext {
  deckId: string;
  cardId?: string;
  hasManySelfChanges?: boolean;
  meaningsIncomplete?: boolean;
  visualInconsistent?: boolean;
  nearingCompletion?: boolean;
}

export const LunaSuggestionEngine = {
  generate(context: LunaSuggestionContext): LunaSuggestion[] {
    const suggestions: LunaSuggestion[] = [];
    const now = new Date().toISOString();

    if (context.meaningsIncomplete && context.cardId) {
      suggestions.push({
        id: `sugg-${Date.now()}-1`,
        type: "refine_meanings",
        cardId: context.cardId,
        deckId: context.deckId,
        message: "Would you like help refining the upright and reversed meanings for this card?",
        createdAt: now
      });
    }

    if (context.visualInconsistent && context.cardId) {
      suggestions.push({
        id: `sugg-${Date.now()}-2`,
        type: "change_border",
        cardId: context.cardId,
        deckId: context.deckId,
        message: "This card looks a bit different from the rest. Want to try a different border or color?",
        createdAt: now
      });
    }

    if (context.hasManySelfChanges) {
      suggestions.push({
        id: `sugg-${Date.now()}-3`,
        type: "review_entire_deck",
        deckId: context.deckId,
        message: "You’ve been doing a lot of work. Want me to review the whole deck for consistency?",
        createdAt: now
      });
    }

    if (context.nearingCompletion) {
      suggestions.push({
        id: `sugg-${Date.now()}-4`,
        type: "propose_store_submission",
        deckId: context.deckId,
        message: "This deck looks nearly complete. Shall we see if it’s worthy of the Mystery Store?",
        createdAt: now
      });
    }

    return suggestions;
  }
};

export default LunaSuggestionEngine;
