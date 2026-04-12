import React from 'react';
import { TarotCard } from '../../types';
import QuickTestList from './QuickTestList';

export default function QuickTestTemplate({ cards }: { cards: TarotCard[] }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Flash of Fate Template</h3>
        <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Rapid Recall</span>
      </div>
      <QuickTestList cards={cards} onSelect={(id) => console.log('Selected:', id)} />
    </div>
  );
}
