import React from 'react';
import { TarotCard } from '../../types';
import TarotLanguageCard from './TarotLanguageCard';

export default function TarotLanguagePractice({ cards }: { cards: TarotCard[] }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Tarot Language Practice</h3>
        <p className="text-xs text-slate-500 uppercase tracking-widest">Visual Dialect Drills</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(card => <TarotLanguageCard key={card.id} card={card} />)}
      </div>
    </div>
  );
}
