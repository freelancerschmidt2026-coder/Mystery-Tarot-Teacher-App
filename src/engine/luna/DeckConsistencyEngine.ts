// src/engine/luna/DeckConsistencyEngine.ts

export interface DeckCardStyle {
  cardId: string;
  border: string;
  font: string;
  color: string;
  artStyleTags: string[];
  clarityScore: number;
}

export interface DeckConsistencyResult {
  score: number; // 0–100
  inconsistentBorders: boolean;
  inconsistentFonts: boolean;
  inconsistentColors: boolean;
  inconsistentArt: boolean;
  lowClarityCards: string[];
}

export const DeckConsistencyEngine = {
  evaluate(cards: DeckCardStyle[]): DeckConsistencyResult {
    const borders = new Set(cards.map((c) => c.border));
    const fonts = new Set(cards.map((c) => c.font));
    const colors = new Set(cards.map((c) => c.color));

    const inconsistentBorders = borders.size > 1;
    const inconsistentFonts = fonts.size > 1;
    const inconsistentColors = colors.size > 1;

    const inconsistentArt =
      cards.some((c) => c.artStyleTags.length === 0) ||
      cards.some((c) => c.artStyleTags.length > 0 && c.artStyleTags.length < 2);

    const lowClarityCards = cards
      .filter((c) => c.clarityScore < 60)
      .map((c) => c.cardId);

    let score = 100;
    if (inconsistentBorders) score -= 20;
    if (inconsistentFonts) score -= 20;
    if (inconsistentColors) score -= 20;
    if (inconsistentArt) score -= 20;
    if (lowClarityCards.length > 0) score -= 20;

    return {
      score: Math.max(0, score),
      inconsistentBorders,
      inconsistentFonts,
      inconsistentColors,
      inconsistentArt,
      lowClarityCards
    };
  }
};

export default DeckConsistencyEngine;
