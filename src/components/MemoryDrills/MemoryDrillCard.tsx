import React from 'react';
import { TarotCard } from '../../types';

interface MemoryDrillCardProps {
  card: TarotCard;
}

const MemoryDrillCard: React.FC<MemoryDrillCardProps> = ({ card }) => {
  return (
    <div className="p-8 bg-[#0d0d14] border border-white/5 rounded-3xl space-y-6">
      <div className="flex justify-between items-start">
        <div className="text-6xl font-serif italic text-white/5">{card.number}</div>
        <div className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold border border-purple-500/20">
          Memory Drill
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-white/40 uppercase tracking-widest">Identify the symbol</p>
        <h3 className="text-2xl font-bold text-white">???</h3>
      </div>
    </div>
  );
};

export default MemoryDrillCard;
