import React, { useState } from 'react';
import FloatingMysteryMarks from '../../components/FloatingMysteryMarks';
import PrizeRevealPopup from '../../components/PrizeRevealPopup';
import GoldenRewardPopup from '../../components/GoldenRewardPopup';

export default function HomePage() {
  const [activePrize, setActivePrize] = useState(null);
  const [activeGolden, setActiveGolden] = useState(null);

  return (
    <div 
      className="min-h-screen relative overflow-hidden" 
      style={{ backgroundColor: '#000000', margin: '-2rem' }}
    >
      {/* Background layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <FloatingMysteryMarks 
          onPrizeWon={(prize) => setActivePrize(prize)} 
          onGoldenWon={(golden) => setActiveGolden(golden)}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 p-8 space-y-8">
        <h1 
          className="text-4xl font-bold"
          style={{
            background: 'linear-gradient(90deg, #6EC1FF, #FFFFFF, #FFB7E8)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block'
          }}
        >
          Welcome, Finder. To Your Mystery Tarot Teacher
        </h1>
        <p className="text-slate-400">Your journey to tarot mastery begins here.</p>
      </div>

      {activePrize && (
        <PrizeRevealPopup 
          title="Congratulations! You found the Secret Prize."
          reward={activePrize.reward}
          description={activePrize.description}
          onClose={() => setActivePrize(null)} 
        />
      )}

      {activeGolden && (
        <GoldenRewardPopup 
          reward={activeGolden}
          onClose={() => setActiveGolden(null)}
        />
      )}
    </div>
  );
}
