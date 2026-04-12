import React from 'react';

interface WhatIfScenarioProps {
  question: string;
  scenario: string;
}

const WhatIfScenario: React.FC<WhatIfScenarioProps> = ({ question, scenario }) => {
  return (
    <div className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl space-y-4 group hover:border-purple-500/30 transition-all">
      <h4 className="text-lg font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{question}</h4>
      <p className="text-sm text-slate-500 italic leading-relaxed">"{scenario}"</p>
      <button className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-purple-500/20 transition-all">
        Explore Scenario
      </button>
    </div>
  );
};

export default WhatIfScenario;
