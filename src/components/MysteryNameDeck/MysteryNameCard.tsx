import React from 'react';
import { TarotCard, MajorArcanaCard, MinorArcanaCard } from '../../types';

interface MysteryNameCardProps {
  card: TarotCard;
  isRevealed: boolean;
}

export default function MysteryNameCard({ card, isRevealed }: MysteryNameCardProps) {
  const isMajorArcana = (c: any): c is MajorArcanaCard => c.arcana === 'major';
  const isMinorArcana = (c: any): c is MinorArcanaCard => !!c.suit;

  const getSymbol = () => {
    if (isMajorArcana(card)) return "Major Arcana";
    if (isMinorArcana(card)) return card.suitDesign.symbol.name;
    return card.symbol;
  };

  return (
    <div className="w-full h-80 bg-[#0d0d14] border-2 border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
      <div className="text-6xl font-serif italic text-white/10 mb-4">{card.number}</div>
      <p className="text-xl font-serif italic text-white mb-2">"{getSymbol()}"</p>
      {isRevealed && (
        <div className="mt-4 text-2xl font-bold text-purple-400">{card.name}</div>
      )}
    </div>
  );
}
