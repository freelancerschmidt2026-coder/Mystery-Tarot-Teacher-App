import React from 'react';
import { MajorArcanaCard, TarotCard } from '../types';
import { MajorArcanaExperienceScene } from '../components/MajorArcana/MajorArcanaExperienceScene';
import { MajorOrientation } from '../engine/majorArcana/types';

interface CardExperienceRouteProps {
  card: TarotCard;
  orientation: MajorOrientation;
  onComplete?: (result: any) => void;
}

export const CardExperienceRoute: React.FC<CardExperienceRouteProps> = ({ 
  card, 
  orientation,
  onComplete 
}) => {
  const isMajorArcana = (c: any): c is MajorArcanaCard => c.arcana === 'major';

  if (isMajorArcana(card)) {
    return (
      <MajorArcanaExperienceScene
        card={card}
        orientation={orientation}
        onComplete={(result) => {
          console.log("Major Arcana experience result:", result);
          onComplete?.(result);
        }}
      />
    );
  }

  // Fallback for Minor Arcana or other cards if needed
  return (
    <div className="p-8 bg-[#0d0d14] border border-white/5 rounded-3xl text-center">
      <h2 className="text-2xl font-bold mb-4">{card.name}</h2>
      <p className="text-slate-400 italic">Minor Arcana experience coming soon...</p>
    </div>
  );
};
