// src/engine/luna/CardFlipEngine.ts

export interface CardFlipState {
  cardId: string;
  isReversed: boolean;
  uprightMeaning: string;
  reversedMeaning: string;
}

export const CardFlipEngine = {
  /**
   * Initialize flip state for a card.
   */
  init(params: {
    cardId: string;
    uprightMeaning: string;
    reversedMeaning: string;
  }): CardFlipState {
    return {
      cardId: params.cardId,
      isReversed: false,
      uprightMeaning: params.uprightMeaning,
      reversedMeaning: params.reversedMeaning
    };
  },

  /**
   * Flip the card (front ↔ back).
   */
  flip(state: CardFlipState): CardFlipState {
    return {
      ...state,
      isReversed: !state.isReversed
    };
  },

  /**
   * Update meanings (used when editing templates).
   */
  updateMeanings(
    state: CardFlipState,
    upright: string,
    reversed: string
  ): CardFlipState {
    return {
      ...state,
      uprightMeaning: upright,
      reversedMeaning: reversed
    };
  }
};

export default CardFlipEngine;
