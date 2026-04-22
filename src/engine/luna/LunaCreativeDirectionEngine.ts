// src/engine/luna/LunaCreativeDirectionEngine.ts

export interface CreativeDirectionContext {
  deckId: string;
  cardId?: string;
  artTags?: string[];
  color?: string;
  border?: string;
  font?: string;
  clarityScore?: number;
  consistencyScore?: number;
}

export interface CreativeDirectionSuggestion {
  id: string;
  message: string;
  category: "theme" | "symbolism" | "palette" | "layout" | "cohesion";
  createdAt: string;
}

export const LunaCreativeDirectionEngine = {
  generate(context: CreativeDirectionContext): CreativeDirectionSuggestion[] {
    const suggestions: CreativeDirectionSuggestion[] = [];
    const now = new Date().toISOString();

    if (context.artTags && context.artTags.length < 2) {
      suggestions.push({
        id: `cd-${Date.now()}-1`,
        message: "Consider adding a secondary art motif to strengthen the card’s symbolism.",
        category: "symbolism",
        createdAt: now
      });
    }

    if (context.color && context.color === "#FFFFFF") {
      suggestions.push({
        id: `cd-${Date.now()}-2`,
        message: "A warmer color palette might bring more emotional depth to this card.",
        category: "palette",
        createdAt: now
      });
    }

    if (context.consistencyScore && context.consistencyScore < 70) {
      suggestions.push({
        id: `cd-${Date.now()}-3`,
        message: "Your deck could benefit from a unifying theme across all suits.",
        category: "cohesion",
        createdAt: now
      });
    }

    if (context.clarityScore && context.clarityScore < 60) {
      suggestions.push({
        id: `cd-${Date.now()}-4`,
        message: "Try refining the meanings to make the message clearer and more powerful.",
        category: "theme",
        createdAt: now
      });
    }

    return suggestions;
  }
};

export default LunaCreativeDirectionEngine;
