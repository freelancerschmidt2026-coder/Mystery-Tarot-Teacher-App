// src/engine/luna/StudioViewModeEngine.ts

export type StudioViewMode = "classic" | "luna_guided" | "minimal";

export interface StudioCardRef {
  id: string;        // e.g. "major_00_fool"
  name: string;      // e.g. "The Fool"
  group: "major" | "swords" | "cups" | "coins" | "wands";
  order: number;     // position in full deck order
}

export interface StudioViewState {
  mode: StudioViewMode;
  cards: StudioCardRef[];
  focusedCardId: string | null;
  deckId: string | null;        // purchased template deck ID
  memberId: string | null;
  designWithLuna: boolean;      // toggle ON/OFF
}

/**
 * Utility: find next/previous card by order.
 */
function getNextCardId(state: StudioViewState): string | null {
  if (!state.focusedCardId) return null;
  const idx = state.cards.findIndex((c) => c.id === state.focusedCardId);
  if (idx === -1 || idx === state.cards.length - 1) return state.focusedCardId;
  return state.cards[idx + 1].id;
}

function getPrevCardId(state: StudioViewState): string | null {
  if (!state.focusedCardId) return null;
  const idx = state.cards.findIndex((c) => c.id === state.focusedCardId);
  if (idx <= 0) return state.focusedCardId;
  return state.cards[idx - 1].id;
}

/**
 * Main engine controlling how the Studio behaves:
 * - which mode is active
 * - which card is focused
 * - whether Luna is actively co-designing
 */
export const StudioViewModeEngine = {
  /**
   * Initialize the Studio view when a purchased deck is opened.
   * Always starts with Major Arcana first (The Fool).
   */
  init(params: {
    deckId: string;
    memberId: string;
    cards: StudioCardRef[];
    defaultMode?: StudioViewMode;
  }): StudioViewState {
    const sorted = [...params.cards].sort((a, b) => a.order - b.order);
    const firstCardId = sorted[0]?.id || null;

    return {
      mode: params.defaultMode || "classic",
      cards: sorted,
      focusedCardId: firstCardId,
      deckId: params.deckId,
      memberId: params.memberId,
      designWithLuna: false
    };
  },

  /**
   * Switch between Classic, Luna-Guided, and Minimal modes.
   * UI should call this when the member changes the view mode selector.
   */
  setMode(state: StudioViewState, mode: StudioViewMode): StudioViewState {
    return {
      ...state,
      mode
    };
  },

  /**
   * Toggle "Design With Luna" ON/OFF.
   * When ON, Luna can:
   * - suggest layouts
   * - rearrange cards (in luna_guided mode)
   * - offer design changes
   */
  setDesignWithLuna(state: StudioViewState, on: boolean): StudioViewState {
    return {
      ...state,
      designWithLuna: on,
      mode: on ? "luna_guided" : state.mode // typically pairs with luna_guided
    };
  },

  /**
   * Focus a specific card (e.g. from dropdown or voice command).
   * "Luna, show me The Star" → UI resolves cardId → calls this.
   */
  focusCard(state: StudioViewState, cardId: string): StudioViewState {
    const exists = state.cards.some((c) => c.id === cardId);
    if (!exists) return state;
    return {
      ...state,
      focusedCardId: cardId
    };
  },

  /**
   * Move to the next card in deck order.
   * Used by "Next Card" button or Luna's "let's go to the next card" suggestion.
   */
  focusNextCard(state: StudioViewState): StudioViewState {
    const nextId = getNextCardId(state);
    if (!nextId) return state;
    return {
      ...state,
      focusedCardId: nextId
    };
  },

  /**
   * Move to the previous card in deck order.
   */
  focusPreviousCard(state: StudioViewState): StudioViewState {
    const prevId = getPrevCardId(state);
    if (!prevId) return state;
    return {
      ...state,
      focusedCardId: prevId
    };
  },

  /**
   * Helper: get the currently focused card object.
   * UI can use this to render the main card in the center.
   */
  getFocusedCard(state: StudioViewState): StudioCardRef | null {
    if (!state.focusedCardId) return null;
    return state.cards.find((c) => c.id === state.focusedCardId) || null;
  },

  /**
   * Helper: suggest a mode based on what the member is doing.
   * You can use this to have Luna gently offer a different view.
   */
  suggestModeForContext(state: StudioViewState, context: {
    wantsAnimation?: boolean;
    wantsFocus?: boolean;
    askedForLunaHelp?: boolean;
  }): StudioViewMode {
    if (context.askedForLunaHelp) return "luna_guided";
    if (context.wantsFocus) return "minimal";
    if (context.wantsAnimation) return "classic";
    return state.mode;
  }
};

export default StudioViewModeEngine;
