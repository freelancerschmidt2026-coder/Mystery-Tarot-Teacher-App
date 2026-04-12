import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function ShowcaseAchievements({ achievements }: { achievements: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {achievements.map((a) => (
        <div 
          key={a.id}
          className={`p-6 rounded-2xl border flex flex-col items-center text-center gap-4 transition-all ${
            a.unlocked 
              ? 'bg-amber-500/5 border-amber-500/20 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.05)]' 
              : 'bg-white/5 border-white/5 text-slate-600'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${a.unlocked ? 'bg-amber-500/20' : 'bg-white/5'}`}>
            {a.unlocked ? <ShieldCheck size={24} /> : <Lock size={20} />}
          </div>
          <p className="text-xs font-bold uppercase tracking-tighter leading-tight">{a.title}</p>
          {a.unlocked && <p className="text-[10px] opacity-50">{a.date}</p>}
        </div>
      ))}
    </div>
  );
}
