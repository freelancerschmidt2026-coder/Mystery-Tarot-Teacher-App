export interface TarotInterpretationInput {
  cards: string[];
  spreadName?: string;
  question?: string;
}

export interface TarotInterpretation {
  summary: string;
  themes: string[];
  tone: "light" | "shadow" | "mixed" | "neutral";
}

export const TarotInterpretationEngine = {
  interpret(input: TarotInterpretationInput): TarotInterpretation {
    const cardsLower = input.cards.map((c) => c.toLowerCase());

    const themes: string[] = [];
    let tone: TarotInterpretation["tone"] = "neutral";

    if (cardsLower.some((c) => c.includes("tower") || c.includes("death"))) {
      themes.push("transformation", "disruption");
      tone = "shadow";
    }

    if (cardsLower.some((c) => c.includes("sun") || c.includes("star"))) {
      themes.push("hope", "clarity");
      tone = tone === "shadow" ? "mixed" : "light";
    }

    if (cardsLower.some((c) => c.includes("moon"))) {
      themes.push("intuition", "mystery");
    }

    if (themes.length === 0) {
      themes.push("ongoing journey");
    }

    const summary = `This reading centers around ${themes.join(
      ", "
    )}, with an overall ${tone} tone.`;

    return {
      summary,
      themes,
      tone,
    };
  },
};

export default TarotInterpretationEngine;
