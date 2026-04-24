// Generates custom spreads for a given deck

import { TarotDeckDefinition, TarotSpreadTemplate, SpreadPosition } from "./types";

let spreadIdCounter = 0;

export class SpreadGenerator {
  createSpreadForDeck(deck: TarotDeckDefinition): TarotSpreadTemplate {
    const id = `LUNA_SPREAD_${++spreadIdCounter}`;
    const name = `${deck.name} Path Spread`;
    const description = `A spread designed by Luna to unlock the path within the ${deck.name} deck.`;

    const positions: SpreadPosition[] = [
      {
        id: `${id}_POS_1`,
        label: "The Call",
        description: "What is calling you into this reading.",
        pathMeaning: "Entry point into the deck’s myth.",
      },
      {
        id: `${id}_POS_2`,
        label: "The Shadow",
        description: "What you are not seeing or resisting.",
        pathMeaning: "The hidden obstacle on your path.",
      },
      {
        id: `${id}_POS_3`,
        label: "The Flame",
        description: "What ignites your transformation.",
        pathMeaning: "The catalyst that moves you forward.",
      },
      {
        id: `${id}_POS_4`,
        label: "The Gate",
        description: "What must be faced or crossed.",
        pathMeaning: "The threshold of change.",
      },
      {
        id: `${id}_POS_5`,
        label: "The Crown",
        description: "What you become through this journey.",
        pathMeaning: "The integration of the deck’s lesson.",
      },
    ];

    return {
      id,
      name,
      description,
      positions,
      recommendedDeckId: deck.id,
    };
  }
}
