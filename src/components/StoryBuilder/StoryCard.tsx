import React from 'react';
import { TarotCard } from '../../types';

interface StoryCardProps {
  card: TarotCard;
}

const StoryCard: React.FC<StoryCardProps> = ({ card }) => {
  return (
    <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-4">
      <div className="w-10 h-14 bg-[#12121c] border border-white/10 rounded flex items-center justify-center text-xs font-serif italic text-white/20">
        {card.number}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm">{card.name}</h4>
        <p className="text-[10px] text-white/40 italic">"{card.symbol || '?'}"</p>
      </div>
    </div>
  );
};

export default StoryCard;
