// src/engine/luna/LunaDesignSessionEngine.ts

export interface LunaDesignSessionState {
  deckId: string;
  memberId: string;
  designWithLuna: boolean;
  guidedChangesRemaining: number; // starts at 20 per purchased template
  totalSelfChanges: number;
}

export const LunaDesignSessionEngine = {
  /**
   * Initialize a design session for a purchased deck.
   */
  init(params: {
    deckId: string;
    memberId: string;
    guidedChanges?: number;
  }): LunaDesignSessionState {
    return {
      deckId: params.deckId,
      memberId: params.memberId,
      designWithLuna: false,
      guidedChangesRemaining: params.guidedChanges ?? 20,
      totalSelfChanges: 0
    };
  },

  /**
   * Toggle Luna's involvement.
   */
  setDesignWithLuna(
    state: LunaDesignSessionState,
    on: boolean
  ): LunaDesignSessionState {
    return {
      ...state,
      designWithLuna: on
    };
  },

  /**
   * Apply a Luna-guided change (consumes credits).
   */
  applyLunaChange(state: LunaDesignSessionState): LunaDesignSessionState {
    if (state.guidedChangesRemaining <= 0) return state;

    return {
      ...state,
      guidedChangesRemaining: state.guidedChangesRemaining - 1
    };
  },

  /**
   * Track a self-change (free and unlimited).
   */
  applySelfChange(state: LunaDesignSessionState): LunaDesignSessionState {
    return {
      ...state,
      totalSelfChanges: state.totalSelfChanges + 1
    };
  },

  /**
   * Check if Luna should trigger a monetization offer.
   */
  shouldOfferMoreGuidedChanges(state: LunaDesignSessionState): boolean {
    return state.guidedChangesRemaining <= 0;
  }
};

export default LunaDesignSessionEngine;
