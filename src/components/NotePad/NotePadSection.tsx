import React from 'react';

export default function NotePadSection({ title, icon: Icon, description, color, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="group relative p-6 bg-[#0d0d14] border border-white/5 rounded-2xl hover:border-white/10 transition-all hover:bg-[#12121c] cursor-pointer"
    >
      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}>
        <Icon size={24} />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
