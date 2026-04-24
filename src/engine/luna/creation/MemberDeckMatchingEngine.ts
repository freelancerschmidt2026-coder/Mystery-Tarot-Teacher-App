// Matches a member + question to the best Luna-created deck

import {
  MemberProfileSnapshot,
  TarotDeckDefinition,
} from "./types";

export interface DeckMatchResult {
  deck: TarotDeckDefinition;
  score: number;
  reasons: string[];
}

export class MemberDeckMatchingEngine {
  findBestDeck(
    member: MemberProfileSnapshot,
    question: string,
    availableDecks: TarotDeckDefinition[]
  ): DeckMatchResult | null {
    if (availableDecks.length === 0) return null;

    const lowerQ = question.toLowerCase();

    const scored = availableDecks.map((deck) => {
      let score = 0;
      const reasons: string[] = [];

      deck.purposeTags.forEach((tag) => {
        if (lowerQ.includes(tag.toLowerCase())) {
          score += 3;
          reasons.push(`Question matches deck theme: ${tag}`);
        }
      });

      member.dominantThemes.forEach((theme) => {
        if (deck.purposeTags.includes(theme.toLowerCase())) {
          score += 2;
          reasons.push(`Member’s dominant theme aligns with deck: ${theme}`);
        }
      });

      if (member.preferredDeckIds.includes(deck.id)) {
        score += 5;
        reasons.push("Member has used and liked this deck before.");
      }

      return { deck, score, reasons };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0];
  }
}
