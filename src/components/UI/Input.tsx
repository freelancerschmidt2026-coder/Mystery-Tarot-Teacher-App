import React from 'react';

export default function Input({ label, value, onChange, placeholder, type = 'text' }: any) {
  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>}
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition-all"
      />
    </div>
  );
}
