import React from 'react';

interface WhatIfCardProps {
  question: string;
  scenario: string;
}

const WhatIfCard: React.FC<WhatIfCardProps> = ({ question, scenario }) => {
  return (
    <div className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl hover:border-purple-500/30 transition-all">
      <h4 className="text-purple-400 font-bold mb-2">{question}</h4>
      <p className="text-sm text-white/60 italic">"{scenario}"</p>
    </div>
  );
};

export default WhatIfCard;
