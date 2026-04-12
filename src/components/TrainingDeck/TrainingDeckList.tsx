import React from 'react';
import { TarotCard } from '../../types';
import TrainingCard from './TrainingCard';

interface TrainingDeckListProps {
  cards: TarotCard[];
  onCardClick: (id: string) => void;
}

export default function TrainingDeckList({ cards, onCardClick }: TrainingDeckListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.id} className="h-64">
          <TrainingCard card={card} isFlipped={false} onClick={() => onCardClick(card.id)} />
        </div>
      ))}
    </div>
  );
}
