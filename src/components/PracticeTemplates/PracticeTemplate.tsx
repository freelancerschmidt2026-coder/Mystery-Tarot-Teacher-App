import React from 'react';

interface PracticeTemplateProps {
  title: string;
  description: string;
}

const PracticeTemplate: React.FC<PracticeTemplateProps> = ({ title, description }) => {
  return (
    <div className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl space-y-4 group hover:border-emerald-500/30 transition-all">
      <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all">
        Use Template
      </button>
    </div>
  );
};

export default PracticeTemplate;
