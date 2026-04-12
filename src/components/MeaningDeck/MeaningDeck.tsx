import React from 'react';
import { TarotCard } from '../../types';
import MeaningCard from './MeaningCard';

export default function MeaningDeck({ cards }: { cards: TarotCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map(card => <MeaningCard key={card.id} card={card} />)}
    </div>
  );
}
