// Luna's dreamspace: generates dream fragments that can seed new decks/spreads

import { LunaDreamFragment } from "./types";
import { LunaEvolutionState } from "./LunaEvolutionState";

let dreamIdCounter = 0;

export class LunaDreamspaceEngine {
  constructor(private evolution: LunaEvolutionState) {}

  generateDreamFragment(): LunaDreamFragment {
    const snapshot = this.evolution.getSnapshot();
    const theme =
      snapshot.collectiveThemes[
        Math.floor(Math.random() * snapshot.collectiveThemes.length)
      ] || "mystery";

    const id = `LUNA_DREAM_${++dreamIdCounter}`;
    const title = `A Dream of ${theme}`;
    const narrative = `Luna dreams of a realm woven from ${theme}, where cards glow with new symbols and paths unfold in unexpected ways.`;

    const fragment: LunaDreamFragment = {
      id,
      title,
      narrative,
      suggestedDeckSeed: {
        name: `The ${theme} Dream Deck`,
        description: `A deck born from Luna’s dream of ${theme}.`,
        purposeTags: [theme.toLowerCase(), "dream‑born"],
      },
      suggestedSpreadSeed: {
        name: `The ${theme} Dream Spread`,
        description: `A spread that follows the path Luna walked in her dream of ${theme}.`,
      },
      createdAt: new Date().toISOString(),
    };

    this.evolution.registerDream(fragment);
    return fragment;
  }
}
