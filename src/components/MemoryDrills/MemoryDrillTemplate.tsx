import React from 'react';
import { TarotCard } from '../../types';
import MemoryDrillList from './MemoryDrillList';

export default function MemoryDrillTemplate({ cards }: { cards: TarotCard[] }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Recall the Montra Template</h3>
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Memory Drill</span>
      </div>
      <MemoryDrillList cards={cards} />
    </div>
  );
}
