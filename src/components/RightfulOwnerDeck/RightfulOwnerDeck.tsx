import React from 'react';
import { TarotCard, MajorArcanaCard, MinorArcanaCard } from '../../types';
import RightfulOwnerCard from './RightfulOwnerCard';

export default function RightfulOwnerDeck({ cards }: { cards: TarotCard[] }) {
  const isMajorArcana = (c: any): c is MajorArcanaCard => c.arcana === 'major';
  const isMinorArcana = (c: any): c is MinorArcanaCard => !!c.suit;

  const getKeyword = (card: TarotCard) => {
    if (isMajorArcana(card)) return card.upright.mechanic;
    if (isMinorArcana(card)) return card.suit;
    return card.keywords[0];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map(card => (
        <RightfulOwnerCard key={card.id} card={card} keyword={getKeyword(card)} />
      ))}
    </div>
  );
}
