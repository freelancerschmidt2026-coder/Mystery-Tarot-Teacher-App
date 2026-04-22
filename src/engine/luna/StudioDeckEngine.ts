// src/engine/luna/StudioDeckEngine.ts

import { StudioViewModeEngine, StudioViewState, StudioCardRef } from "./StudioViewModeEngine";
import { TarotBoxEngine, TarotBoxState } from "./TarotBoxEngine";

export interface StudioDeckState {
  view: StudioViewState;
  box: TarotBoxState;
  deckId: string;
  memberId: string;
}

/**
 * The master controller for Mystery Tarot Studio.
 * Loads the deck, initializes the tarot box, and manages navigation.
 */
export const StudioDeckEngine = {
  /**
   * Initialize the Studio with a purchased deck.
   */
  init(params: {
    deckId: string;
    memberId: string;
    cards: StudioCardRef[];
    defaultMode?: "classic" | "luna_guided" | "minimal";
  }): StudioDeckState {
    const view = StudioViewModeEngine.init({
      deckId: params.deckId,
      memberId: params.memberId,
      cards: params.cards,
      defaultMode: params.defaultMode
    });

    const cardIds = params.cards.map((c) => c.id);
    const box = TarotBoxEngine.init(cardIds);

    return {
      view,
      box,
      deckId: params.deckId,
      memberId: params.memberId
    };
  },

  /**
   * Open the tarot box animation.
   */
  openBox(state: StudioDeckState): StudioDeckState {
    return {
      ...state,
      box: TarotBoxEngine.openBox(state.box)
    };
  },

  /**
   * Focus a specific card (from dropdown, click, or voice).
   */
  focusCard(state: StudioDeckState, cardId: string): StudioDeckState {
    return {
      ...state,
      view: StudioViewModeEngine.focusCard(state.view, cardId),
      box: TarotBoxEngine.focusCard(state.box, cardId)
    };
  },

  /**
   * Move to the next card.
   */
  nextCard(state: StudioDeckState): StudioDeckState {
    const nextId = StudioViewModeEngine.focusNextCard(state.view).focusedCardId;
    if (!nextId) return state;

    return {
      ...state,
      view: StudioViewModeEngine.focusCard(state.view, nextId),
      box: TarotBoxEngine.focusCard(state.box, nextId)
    };
  },

  /**
   * Move to the previous card.
   */
  previousCard(state: StudioDeckState): StudioDeckState {
    const prevId = StudioViewModeEngine.focusPreviousCard(state.view).focusedCardId;
    if (!prevId) return state;

    return {
      ...state,
      view: StudioViewModeEngine.focusCard(state.view, prevId),
      box: TarotBoxEngine.focusCard(state.box, prevId)
    };
  },

  /**
   * Switch Studio view mode.
   */
  setMode(state: StudioDeckState, mode: "classic" | "luna_guided" | "minimal"): StudioDeckState {
    return {
      ...state,
      view: StudioViewModeEngine.setMode(state.view, mode)
    };
  },

  /**
   * Toggle "Design With Luna".
   */
  setDesignWithLuna(state: StudioDeckState, on: boolean): StudioDeckState {
    return {
      ...state,
      view: StudioViewModeEngine.setDesignWithLuna(state.view, on)
    };
  }
};

export default StudioDeckEngine;
