// src/engine/luna/TemplateApplicationEngine.ts

export interface TemplateStyleSet {
  borders: string[];   // 5 border style tokens
  fonts: string[];     // 5 font families
  colors: string[];    // 5 hex colors
}

export interface TemplateLayout {
  titlePosition: "top";
  numberPosition: "bottom";
  artPosition: "center";
}

export interface TemplateMeaningSet {
  upright: string;
  reversed: string;
}

export interface AppliedCardTemplate {
  cardId: string;
  border: string;
  font: string;
  color: string;
  layout: TemplateLayout;
  meanings: TemplateMeaningSet;
}

export interface TemplateApplicationResult {
  applied: AppliedCardTemplate[];
}

export const TemplateApplicationEngine = {
  /**
   * Apply a template to a list of card IDs.
   */
  applyTemplate(params: {
    cardIds: string[];
    style: TemplateStyleSet;
    layout: TemplateLayout;
    meanings: Record<string, TemplateMeaningSet>; // keyed by cardId
  }): TemplateApplicationResult {
    const applied = params.cardIds.map((id) => {
      const meaning = params.meanings[id] || {
        upright: "",
        reversed: ""
      };

      return {
        cardId: id,
        border: params.style.borders[0],
        font: params.style.fonts[0],
        color: params.style.colors[0],
        layout: params.layout,
        meanings: meaning
      };
    });

    return { applied };
  },

  /**
   * Cycle border/font/color for a specific card.
   */
  cycleStyle(
    card: AppliedCardTemplate,
    style: TemplateStyleSet,
    type: "border" | "font" | "color"
  ): AppliedCardTemplate {
    const list = style[type + "s" as keyof TemplateStyleSet] as string[];
    const current = card[type];
    const idx = list.indexOf(current);
    const next = list[(idx + 1) % list.length];

    return {
      ...card,
      [type]: next
    };
  }
};

export default TemplateApplicationEngine;
