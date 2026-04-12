import React from 'react';
import { TarotCard } from '../../types';

interface SymbolCardProps {
  card: TarotCard;
}

const SymbolCard: React.FC<SymbolCardProps> = ({ card }) => {
  return (
    <div className="p-8 bg-[#0d0d14] border border-white/5 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-purple-500/30 transition-all">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform">
        <span className="text-4xl font-serif italic text-purple-400">{card.number}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
      <p className="text-sm text-white/40 italic">"{card.symbol || '?'}"</p>
    </div>
  );
};

export default SymbolCard;
