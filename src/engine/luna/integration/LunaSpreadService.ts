import { TarotSpreadTemplate, TarotDeckDefinition } from "../creation/types";

export class LunaSpreadService {
  getSpreadForDeck(deck: TarotDeckDefinition): TarotSpreadTemplate {
    return deck.spreads[0];
  }

  getSpreadPositions(spread: TarotSpreadTemplate) {
    return spread.positions;
  }
}
