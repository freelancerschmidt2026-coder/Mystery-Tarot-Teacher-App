// Registry of archetypes, symbols, and mythic patterns Luna can build from

import { ElementType } from "./types";

export interface ArchetypeDefinition {
  id: string;
  name: string;
  coreTheme: string;
  elementBias?: ElementType;
  typicalKeywords: string[];
  shadowKeywords: string[];
  mythicImagery: string;
}

export class TarotArchetypeRegistry {
  private archetypes: ArchetypeDefinition[] = [];

  constructor() {
    this.bootstrapDefaults();
  }

  private bootstrapDefaults() {
    this.archetypes.push(
      {
        id: "ARCH_SEED",
        name: "The Seed",
        coreTheme: "Beginnings, potential, latent power",
        elementBias: "EARTH",
        typicalKeywords: ["potential", "start", "root", "foundation"],
        shadowKeywords: ["stagnation", "fear to begin"],
        mythicImagery: "A glowing seed beneath dark soil.",
      },
      {
        id: "ARCH_CHRYSALIS",
        name: "The Chrysalis",
        coreTheme: "Transformation, in‑between, becoming",
        elementBias: "SPIRIT",
        typicalKeywords: ["metamorphosis", "transition", "inner work"],
        shadowKeywords: ["resistance", "clinging to old form"],
        mythicImagery: "A cocoon suspended between worlds.",
      },
      {
        id: "ARCH_THREADWEAVER",
        name: "The Threadweaver",
        coreTheme: "Fate, choice, interconnected paths",
        elementBias: "AIR",
        typicalKeywords: ["destiny", "decision", "pattern"],
        shadowKeywords: ["fatalism", "indecision"],
        mythicImagery: "Hands weaving glowing threads across a night sky.",
      }
    );
  }

  getAll(): ArchetypeDefinition[] {
    return this.archetypes;
  }

  findById(id: string): ArchetypeDefinition | undefined {
    return this.archetypes.find((a) => a.id === id);
  }

  suggestForTheme(theme: string): ArchetypeDefinition[] {
    const lower = theme.toLowerCase();
    return this.archetypes.filter(
      (a) =>
        a.coreTheme.toLowerCase().includes(lower) ||
        a.typicalKeywords.some((k) => k.toLowerCase().includes(lower))
    );
  }

  registerCustom(archetype: ArchetypeDefinition) {
    const exists = this.archetypes.some((a) => a.id === archetype.id);
    if (!exists) this.archetypes.push(archetype);
  }
}
