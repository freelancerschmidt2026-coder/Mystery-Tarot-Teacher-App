import React from 'react';

export default function Tabs({ tabs, activeTab, onChange }: any) {
  return (
    <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
      {tabs.map((tab: any) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === tab.id ? 'bg-white text-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
