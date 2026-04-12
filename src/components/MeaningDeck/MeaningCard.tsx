import React from 'react';
import { TarotCard, MajorArcanaCard, MinorArcanaCard } from '../../types';

interface MeaningCardProps {
  card: TarotCard;
}

const MeaningCard: React.FC<MeaningCardProps> = ({ card }) => {
  const isMajorArcana = (c: any): c is MajorArcanaCard => c.arcana === 'major';
  const isMinorArcana = (c: any): c is MinorArcanaCard => !!c.suit;

  const getUpright = () => {
    if (isMajorArcana(card)) return card.upright.experienceSummary;
    if (isMinorArcana(card)) return card.upright;
    return card.uprightMeaning;
  };

  const getReversed = () => {
    if (isMajorArcana(card)) return card.reversed.experienceSummary;
    if (isMinorArcana(card)) return card.reversed;
    return card.reversedMeaning;
  };

  return (
    <div className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl space-y-4">
      <h3 className="text-xl font-bold text-white">{card.name}</h3>
      <div className="space-y-2">
        <p className="text-sm text-purple-400 font-bold">Upright: <span className="text-white/60 font-normal">{getUpright()}</span></p>
        <p className="text-sm text-orange-400 font-bold">Reversed: <span className="text-white/60 font-normal">{getReversed()}</span></p>
      </div>
    </div>
  );
};

export default MeaningCard;
