import React from 'react';
import { TarotCard } from '../../types';

interface TarotLanguageCardProps {
  card: TarotCard;
}

const TarotLanguageCard: React.FC<TarotLanguageCardProps> = ({ card }) => {
  return (
    <div className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl flex items-center gap-6 group hover:border-purple-500/30 transition-all">
      <div className="w-16 h-16 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
        <span className="text-2xl font-serif italic">{card.number}</span>
      </div>
      <div>
        <h4 className="text-white font-bold">{card.name}</h4>
        <p className="text-xs text-white/40 mt-1">Tone: <span className="text-purple-400">{card.emotionalTone || 'Unknown'}</span></p>
      </div>
    </div>
  );
};

export default TarotLanguageCard;
