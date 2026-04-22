// src/engine/luna/TarotBoxEngine.ts

export interface TarotBoxCardPosition {
  cardId: string;
  depth: number;        // 0 = front, higher = further back
  heightScale: number;  // visual scaling (front small, back tall)
  offsetY: number;      // vertical offset for stacking illusion
}

export interface TarotBoxState {
  isOpen: boolean;
  positions: TarotBoxCardPosition[];
  focusedCardId: string | null;
}

/**
 * Utility: generate depth stacking for the tarot box.
 * Front cards appear shorter; back cards appear taller.
 */
function generateDepthPositions(cardIds: string[]): TarotBoxCardPosition[] {
  const total = cardIds.length;

  return cardIds.map((id, index) => {
    const depth = index; // 0 = front, last = back

    // Scale from 0.85 (front) to 1.25 (back)
    const heightScale = 0.85 + (index / total) * 0.4;

    // Offset from 0px (front) to -120px (back)
    const offsetY = -(index * (120 / total));

    return {
      cardId: id,
      depth,
      heightScale,
      offsetY
    };
  });
}

export const TarotBoxEngine = {
  /**
   * Initialize the tarot box in closed state.
   */
  init(cardIds: string[]): TarotBoxState {
    return {
      isOpen: false,
      positions: generateDepthPositions(cardIds),
      focusedCardId: cardIds[0] || null
    };
  },

  /**
   * Open the tarot box and reveal the stacked cards.
   */
  openBox(state: TarotBoxState): TarotBoxState {
    return {
      ...state,
      isOpen: true
    };
  },

  /**
   * Close the tarot box (rarely used, but included for completeness).
   */
  closeBox(state: TarotBoxState): TarotBoxState {
    return {
      ...state,
      isOpen: false
    };
  },

  /**
   * Focus a specific card visually.
   * UI will animate this card forward.
   */
  focusCard(state: TarotBoxState, cardId: string): TarotBoxState {
    const exists = state.positions.some((p) => p.cardId === cardId);
    if (!exists) return state;

    return {
      ...state,
      focusedCardId: cardId
    };
  },

  /**
   * Move focus to the next card in the stack.
   */
  focusNext(state: TarotBoxState): TarotBoxState {
    if (!state.focusedCardId) return state;

    const idx = state.positions.findIndex((p) => p.cardId === state.focusedCardId);
    if (idx === -1 || idx === state.positions.length - 1) return state;

    return {
      ...state,
      focusedCardId: state.positions[idx + 1].cardId
    };
  },

  /**
   * Move focus to the previous card in the stack.
   */
  focusPrevious(state: TarotBoxState): TarotBoxState {
    if (!state.focusedCardId) return state;

    const idx = state.positions.findIndex((p) => p.cardId === state.focusedCardId);
    if (idx <= 0) return state;

    return {
      ...state,
      focusedCardId: state.positions[idx - 1].cardId
    };
  },

  /**
   * Helper: get the position data for the focused card.
   */
  getFocusedPosition(state: TarotBoxState): TarotBoxCardPosition | null {
    if (!state.focusedCardId) return null;
    return state.positions.find((p) => p.cardId === state.focusedCardId) || null;
  }
};

export default TarotBoxEngine;
