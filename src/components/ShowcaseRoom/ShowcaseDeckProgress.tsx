import React from 'react';
import { Layers } from 'lucide-react';

export default function ShowcaseDeckProgress({ progress }: { progress: number }) {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-900/20 to-slate-900/20 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-8">
      <div className="w-32 h-48 bg-[#12121c] border-2 border-purple-500/30 rounded-2xl flex items-center justify-center relative shadow-2xl">
        <div className="absolute inset-0 bg-purple-500/5 blur-xl rounded-2xl" />
        <Layers className="text-purple-400/50" size={48} />
      </div>
      <div className="space-y-4 text-center md:text-left">
        <h3 className="text-xl font-bold">Stride One Master Deck</h3>
        <p className="text-slate-400 max-w-sm">
          Your deck has evolved. The symbols are becoming clearer, and the traditional names are fully mastered.
        </p>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <div className="w-full max-w-[200px] h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-purple-50 shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs font-bold text-purple-400">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
