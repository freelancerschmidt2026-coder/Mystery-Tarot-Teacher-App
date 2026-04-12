import React from 'react';
import { TarotCard } from '../../types';

interface QuickTestCardProps {
  card: TarotCard;
  onSelect: (id: string) => void;
}

const QuickTestCard: React.FC<QuickTestCardProps> = ({ card, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(card.id)}
      className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl cursor-pointer hover:border-yellow-500/50 transition-all"
    >
      <div className="text-4xl font-serif italic text-white/10 mb-4">{card.number}</div>
      <p className="text-sm text-slate-300 italic">"{card.symbol || '?'}"</p>
    </div>
  );
};

export default QuickTestCard;
