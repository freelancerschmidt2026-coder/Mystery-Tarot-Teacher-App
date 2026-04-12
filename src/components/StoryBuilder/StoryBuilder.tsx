import React from 'react';
import { TarotCard } from '../../types';
import StoryCard from './StoryCard';

export default function StoryBuilder({ cards }: { cards: TarotCard[] }) {
  return (
    <div className="p-8 bg-[#0d0d14] border border-white/5 rounded-3xl space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Story Builder</h3>
        <p className="text-xs text-slate-500 uppercase tracking-widest">Narrative Practice</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {cards.map(card => <StoryCard key={card.id} card={card} />)}
      </div>
      <textarea 
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300 min-h-[200px] focus:outline-none focus:border-purple-500 transition-all"
        placeholder="Weave your story here..."
      />
    </div>
  );
}
