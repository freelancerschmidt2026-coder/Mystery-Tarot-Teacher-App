import {
  TarotDeckDefinition,
  TarotCardTemplate,
  TarotSpreadTemplate,
} from "../creation/types";

export interface UILivingCard {
  cardId: string;
  name: string;
  animationProfileId: string;
  voiceProfileId: string;
  visualDescription: string;
  uprightMeaning: string;
  reversedMeaning: string;
}

export interface UIDeckBox {
  name: string;
  tagline: string;
  description: string;
  auraColorHex: string;
  textureId: string;
  boxModelId: string;
}

export class LunaUIBridge {
  convertDeckToUI(deck: TarotDeckDefinition): UIDeckBox {
    return {
      name: deck.boxMeta.name,
      tagline: deck.boxMeta.tagline,
      description: deck.boxMeta.description,
      auraColorHex: deck.boxVisual.auraColorHex,
      textureId: deck.boxVisual.textureId,
      boxModelId: deck.boxVisual.boxModelId,
    };
  }

  convertCardToUI(card: TarotCardTemplate): UILivingCard {
    return {
      cardId: card.id,
      name: card.name,
      animationProfileId: card.animationProfileId,
      voiceProfileId: card.voiceProfileId,
      visualDescription: card.visualDescription,
      uprightMeaning: card.uprightMeaning,
      reversedMeaning: card.reversedMeaning,
    };
  }

  convertSpreadToUI(spread: TarotSpreadTemplate) {
    return spread.positions.map((pos) => ({
      id: pos.id,
      label: pos.label,
      description: pos.description,
      pathMeaning: pos.pathMeaning,
    }));
  }
}
