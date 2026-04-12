import React from 'react';

interface PracticeTemplateCardProps {
  title: string;
  description: string;
}

const PracticeTemplateCard: React.FC<PracticeTemplateCardProps> = ({ title, description }) => {
  return (
    <div className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl hover:border-purple-500/30 transition-all">
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/40">{description}</p>
    </div>
  );
};

export default PracticeTemplateCard;
