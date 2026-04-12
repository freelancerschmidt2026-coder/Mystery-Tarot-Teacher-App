import React from 'react';
import { TarotCard } from '../../types';
import MemoryDrillCard from './MemoryDrillCard';

export default function MemoryDrillList({ cards }: { cards: TarotCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map(card => <MemoryDrillCard key={card.id} card={card} />)}
    </div>
  );
}
