import { create } from 'zustand';
import { TarotCard } from '../../types';

interface DeckState {
  cards: TarotCard[];
  setCards: (cards: TarotCard[]) => void;
}

export const useDeckStore = create<DeckState>((set) => ({
  cards: [],
  setCards: (cards) => set({ cards }),
}));
