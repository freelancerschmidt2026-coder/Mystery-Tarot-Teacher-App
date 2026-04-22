// src/engine/luna/DeckBoxAnimationEngine.ts

export type BoxAnimationPhase = "closed" | "opening" | "open";

export interface BoxAnimationState {
  phase: BoxAnimationPhase;
  progress: number; // 0–1 for opening
}

export interface CardStackAnimationState {
  cardId: string;
  depth: number;
  riseProgress: number; // 0–1 for how far it has risen
}

export interface DeckBoxAnimationSnapshot {
  box: BoxAnimationState;
  cards: CardStackAnimationState[];
}

export const DeckBoxAnimationEngine = {
  init(cardIds: string[]): DeckBoxAnimationSnapshot {
    return {
      box: { phase: "closed", progress: 0 },
      cards: cardIds.map((id, index) => ({
        cardId: id,
        depth: index,
        riseProgress: 0
      }))
    };
  },

  startOpening(state: DeckBoxAnimationSnapshot): DeckBoxAnimationSnapshot {
    return {
      ...state,
      box: { phase: "opening", progress: 0 }
    };
  },

  step(state: DeckBoxAnimationSnapshot, delta: number): DeckBoxAnimationSnapshot {
    // delta is 0–1 increment
    const newProgress = Math.min(1, state.box.progress + delta);
    const boxPhase: BoxAnimationPhase = newProgress >= 1 ? "open" : "opening";

    const cards = state.cards.map((c, index, arr) => {
      const factor = (index + 1) / arr.length;
      const rise = Math.min(1, newProgress * factor);
      return { ...c, riseProgress: rise };
    });

    return {
      box: { phase: boxPhase, progress: newProgress },
      cards
    };
  }
};

export default DeckBoxAnimationEngine;
