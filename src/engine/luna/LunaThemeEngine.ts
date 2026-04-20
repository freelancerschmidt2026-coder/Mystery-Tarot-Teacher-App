import { NotebookThemeId } from "../../../notepad/systems/themeSystem";

export interface LunaThemeSignal {
  themeId: NotebookThemeId;
  reason: string;
}

export const LunaThemeEngine = {
  fromTarotCards(cardNames: string[]): LunaThemeSignal {
    const lower = cardNames.map((c) => c.toLowerCase());

    // Moon / High Priestess / intuition cards → Starlight
    if (
      lower.includes("the moon") ||
      lower.includes("the high priestess") ||
      lower.includes("the star")
    ) {
      return {
        themeId: "starlight",
        reason: "Intuition, lunar energy, and inner vision.",
      };
    }

    // Cups / emotional spreads → Rose Veil
    if (lower.some((c) => c.includes("cups"))) {
      return {
        themeId: "rose-veil",
        reason: "Emotional flow, heart‑centered reflection.",
      };
    }

    // Swords / shadow work → Abyss
    if (lower.some((c) => c.includes("swords"))) {
      return {
        themeId: "abyss",
        reason: "Shadow work, clarity, and deep truth.",
      };
    }

    // Default → Void
    return {
      themeId: "void",
      reason: "Neutral grounding space.",
    };
  },

  fromSpread(spreadName: string): LunaThemeSignal {
    const name = spreadName.toLowerCase();

    if (name.includes("intuition") || name.includes("dream"))
      return { themeId: "starlight", reason: "Intuitive spread." };

    if (name.includes("heart") || name.includes("relationship"))
      return { themeId: "rose-veil", reason: "Heart‑centered spread." };

    if (name.includes("shadow") || name.includes("truth"))
      return { themeId: "abyss", reason: "Shadow‑oriented spread." };

    return { themeId: "void", reason: "Neutral spread." };
  },
};
