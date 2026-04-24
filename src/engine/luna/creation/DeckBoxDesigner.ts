// Logic for 3D deck box meta + visual profile

import { TarotDeckDefinition } from "./types";

export class DeckBoxDesigner {
  enhanceDeckWithBox(deck: TarotDeckDefinition): TarotDeckDefinition {
    const energy = deck.purposeTags[0] ?? "mystery";

    const auraColorHex =
      energy.toLowerCase().includes("shadow") ? "#4A2E7F" :
      energy.toLowerCase().includes("love") ? "#FF4FB2" :
      energy.toLowerCase().includes("career") ? "#E8C46A" :
      "#3FA6A6";

    return {
      ...deck,
      boxMeta: {
        ...deck.boxMeta,
        description: `${deck.description} Best used for questions about ${deck.purposeTags.join(
          ", "
        )}.`,
      },
      boxVisual: {
        ...deck.boxVisual,
        auraColorHex,
      },
    };
  }
}
