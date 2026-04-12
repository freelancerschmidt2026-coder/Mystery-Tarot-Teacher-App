import React from 'react';
import { TarotCard } from '../../types';

interface RightfulOwnerCardProps {
  card: TarotCard;
  keyword: string;
}

const RightfulOwnerCard: React.FC<RightfulOwnerCardProps> = ({ card, keyword }) => {
  return (
    <div className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl flex flex-col items-center gap-4">
      <div className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20 font-bold text-sm">
        {keyword}
      </div>
      <div className="text-xs text-white/20 uppercase tracking-widest">Belongs to</div>
      <div className="text-lg font-bold text-white">???</div>
    </div>
  );
};

export default RightfulOwnerCard;
