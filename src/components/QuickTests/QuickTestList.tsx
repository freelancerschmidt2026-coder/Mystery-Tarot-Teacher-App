import React from 'react';
import { TarotCard } from '../../types';
import QuickTestCard from './QuickTestCard';

export default function QuickTestList({ cards, onSelect }: { cards: TarotCard[], onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map(card => <QuickTestCard key={card.id} card={card} onSelect={onSelect} />)}
    </div>
  );
}
