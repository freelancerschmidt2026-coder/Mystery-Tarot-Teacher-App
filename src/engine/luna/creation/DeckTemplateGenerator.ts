// Generates full tarot deck templates from archetypes + themes

import {
  TarotDeckDefinition,
  TarotCardTemplate,
  TarotKeywordSet,
} from "./types";
import { TarotArchetypeRegistry } from "./TarotArchetypeRegistry";

let deckIdCounter = 0;
let cardIdCounter = 0;

export class DeckTemplateGenerator {
  constructor(private archetypes: TarotArchetypeRegistry) {}

  createDeckFromTheme(theme: string): TarotDeckDefinition {
    const deckId = `LUNA_DECK_${++deckIdCounter}`;
    const name = this.generateDeckName(theme);
    const description = `A living deck forged by Luna around the theme of ${theme}.`;
    const purposeTags = [theme.toLowerCase(), "luna‑created", "evolving"];

    const archetypeSeeds = this.archetypes.suggestForTheme(theme);
    const cards: TarotCardTemplate[] = archetypeSeeds.map((arch, index) =>
      this.createCardFromArchetype(arch.id, index)
    );

    return {
      id: deckId,
      name,
      description,
      purposeTags,
      cards,
      spreads: [],
      boxMeta: {
        id: `${deckId}_BOX`,
        name,
        tagline: `A deck born from Luna’s evolving understanding of ${theme}.`,
        description,
        bestUsedFor: [theme.toLowerCase()],
        animated: true,
        hasVisualStorytelling: true,
        keyConcepts: archetypeSeeds.map((a) => a.coreTheme),
        energySignature: `${theme.toUpperCase()}_ARCANA`,
      },
      boxVisual: {
        boxModelId: "DEFAULT_LUNA_BOX",
        textureId: `TEXTURE_${theme.toUpperCase()}`,
        auraColorHex: "#E8C46A",
        particleProfileId: "LUNA_SPARKS",
      },
    };
  }

  private createCardFromArchetype(
    archetypeId: string,
    index: number
  ): TarotCardTemplate {
    const arch = this.archetypes.findById(archetypeId);
    if (!arch) {
      throw new Error(`Unknown archetype: ${archetypeId}`);
    }

    const id = `LUNA_CARD_${++cardIdCounter}`;
    const name = arch.name;
    const arcana: "MAJOR" | "MINOR" | "CUSTOM" = "CUSTOM";

    const keywords: TarotKeywordSet = {
      light: arch.typicalKeywords,
      shadow: arch.shadowKeywords,
    };

    return {
      id,
      name,
      suit: undefined,
      arcana,
      number: index + 1,
      element: arch.elementBias,
      archetypeTag: archetypeId,
      uprightMeaning: arch.coreTheme,
      reversedMeaning: `Blocked ${arch.coreTheme.toLowerCase()}`,
      keywords,
      mythicSymbolism: arch.mythicImagery,
      emotionalTone: "mythic, evolving, introspective",
      visualDescription: `A scene inspired by: ${arch.mythicImagery}`,
      animationProfileId: `ANIM_${archetypeId}`,
      voiceProfileId: `VOICE_${archetypeId}`,
      pathMeaning: `This card marks a step on the path of ${arch.coreTheme.toLowerCase()}.`,
    };
  }

  private generateDeckName(theme: string): string {
    const capitalized = theme
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    return `The ${capitalized} Arcana`;
  }
}
