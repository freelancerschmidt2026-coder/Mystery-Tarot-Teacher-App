import React from 'react';
import { Wind, Star, ChevronRight } from 'lucide-react';

export default function ShowcaseEvolution({ threads }: { threads: any[] }) {
  return (
    <div className="space-y-4">
      {threads.map((thread, i) => (
        <div key={i} className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl flex items-center gap-6 group hover:border-blue-500/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
            <Star size={20} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{thread.title}</h4>
            <p className="text-sm text-slate-500">{thread.date}</p>
          </div>
          <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-400 border border-white/5">
            {thread.stride}
          </div>
        </div>
      ))}
    </div>
  );
}
