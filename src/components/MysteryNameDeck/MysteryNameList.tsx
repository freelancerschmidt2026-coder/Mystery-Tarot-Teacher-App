import React from 'react';
import { TarotCard, MajorArcanaCard, MinorArcanaCard } from '../../types';

export default function MysteryNameList({ cards }: { cards: TarotCard[] }) {
  const isMajorArcana = (c: any): c is MajorArcanaCard => c.arcana === 'major';
  const isMinorArcana = (c: any): c is MinorArcanaCard => !!c.suit;

  const getSymbol = (card: TarotCard) => {
    if (isMajorArcana(card)) return "Major Arcana";
    if (isMinorArcana(card)) return card.suitDesign.symbol.name;
    return card.symbol;
  };

  return (
    <div className="space-y-4">
      {cards.map(card => (
        <div key={card.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
          <span className="font-bold">{card.name}</span>
          <span className="text-slate-500 italic">{getSymbol(card)}</span>
        </div>
      ))}
    </div>
  );
}
