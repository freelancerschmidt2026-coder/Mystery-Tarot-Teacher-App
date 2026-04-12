import React from 'react';
import { motion } from 'motion/react';
import { TarotCard, MajorArcanaCard, MinorArcanaCard } from '../../types';

interface TrainingCardProps {
  card: TarotCard;
  isFlipped: boolean;
  onClick: () => void;
}

export default function TrainingCard({ card, isFlipped, onClick }: TrainingCardProps) {
  const isMajorArcana = (c: any): c is MajorArcanaCard => c.arcana === 'major';
  const isMinorArcana = (c: any): c is MinorArcanaCard => !!c.suit;

  const getSymbol = () => {
    if (isMajorArcana(card)) return "Major Arcana";
    if (isMinorArcana(card)) return card.suitDesign.symbol.name;
    return card.symbol;
  };

  const getMeaning = () => {
    if (isMajorArcana(card)) return card.upright.experienceSummary;
    if (isMinorArcana(card)) return card.upright;
    return card.uprightMeaning;
  };

  return (
    <motion.div
      onClick={onClick}
      className="relative w-full h-full cursor-pointer perspective-1000"
      whileHover={{ scale: 1.02 }}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute inset-0 backface-hidden bg-[#12121c] border-2 border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold">{card.name}</h3>
          <p className="text-slate-500 italic mt-2">{getSymbol()}</p>
        </div>
        <div className="absolute inset-0 backface-hidden bg-[#1a1a2e] border-2 border-purple-500/30 rounded-3xl p-6 rotate-y-180 flex flex-col justify-center">
          <p className="text-sm text-slate-200">{getMeaning()}</p>
        </div>
      </div>
    </motion.div>
  );
}
