import { useDeckStore } from './deckStore';
import { TarotCard } from '../../types';

export const deckActions = {
  updateDeck: (cards: TarotCard[]) => {
    useDeckStore.getState().setCards(cards);
  }
};
