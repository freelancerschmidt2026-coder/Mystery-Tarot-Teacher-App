import { TarotCardTemplate, SpreadPosition } from "../creation/types";

export class LunaVoiceBridge {
  getCardExplanation(card: TarotCardTemplate): string {
    return `This is ${card.name}. ${card.uprightMeaning}. Keywords include ${card.keywords.light.join(
      ", "
    )}.`;
  }

  getSpreadPositionExplanation(pos: SpreadPosition): string {
    return `${pos.label}: ${pos.description}. This position represents ${pos.pathMeaning}.`;
  }

  getDeckIntroduction(deckName: string, theme: string): string {
    return `Welcome to the ${deckName}. A deck created around the theme of ${theme}.`;
  }
}
