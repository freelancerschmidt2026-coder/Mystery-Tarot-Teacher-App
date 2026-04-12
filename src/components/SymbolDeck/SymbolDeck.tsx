import React from 'react';
import { TarotCard } from '../../types';
import SymbolCard from './SymbolCard';

export default function SymbolDeck({ cards }: { cards: TarotCard[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map(card => <SymbolCard key={card.id} card={card} />)}
    </div>
  );
}
