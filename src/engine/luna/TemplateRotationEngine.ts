// src/engine/luna/TemplateRotationEngine.ts

export interface TemplateVariant {
  id: string;          // e.g. "variant-1"
  border: string;
  font: string;
  color: string;
}

export interface TemplateRotationState {
  cardId: string;
  variants: TemplateVariant[];
  activeVariantId: string;
}

export const TemplateRotationEngine = {
  init(params: {
    cardId: string;
    variants: TemplateVariant[];
  }): TemplateRotationState {
    const first = params.variants[0];
    return {
      cardId: params.cardId,
      variants: params.variants,
      activeVariantId: first ? first.id : ""
    };
  },

  nextVariant(state: TemplateRotationState): TemplateRotationState {
    if (!state.variants.length) return state;
    const idx = state.variants.findIndex(v => v.id === state.activeVariantId);
    const next = state.variants[(idx + 1) % state.variants.length];
    return { ...state, activeVariantId: next.id };
  },

  getActiveVariant(state: TemplateRotationState): TemplateVariant | null {
    return state.variants.find(v => v.id === state.activeVariantId) || null;
  }
};

export default TemplateRotationEngine;
