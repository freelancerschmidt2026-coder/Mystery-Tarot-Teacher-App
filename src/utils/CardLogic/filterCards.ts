import { TarotCard } from '../../types';

export function filterCards(cards: TarotCard[], query: string): TarotCard[] {
  return cards.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
}
