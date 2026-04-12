import React, { useState } from 'react';
import WelcomeAnimation from './Welcome/WelcomeAnimation';
import EnvelopeIntro from './EnvelopeIntro/EnvelopeIntro';
import ScrollRitual from './Scroll/ScrollRitual';
import LunaRetrieve from './Luna/LunaRetrieve';
import ScrollConfirmation from './Scroll/ScrollConfirmation';

const CinematicExperience = ({ onFinderComplete }) => {
  const [stage, setStage] = useState('welcome'); // welcome, envelope, scroll, luna, confirmation
  const [isFinder, setIsFinder] = useState(false);
  const [mysteryName, setMysteryName] = useState('');

  const handleWelcomeComplete = () => setStage('envelope');
  const handleEnvelopeComplete = () => setStage('scroll');
  const handleScrollComplete = (name) => {
    setMysteryName(name);
    setIsFinder(true);
    setStage('luna');
  };
  const handleLunaComplete = () => setStage('confirmation');

  return (
    <div className="cinematic-container" style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#000', 
      overflow: 'hidden',
      position: 'relative'
    }}>
      {stage === 'welcome' && <WelcomeAnimation onComplete={handleWelcomeComplete} />}
      {stage === 'envelope' && <EnvelopeIntro onComplete={handleEnvelopeComplete} />}
      {stage === 'scroll' && <ScrollRitual onComplete={handleScrollComplete} />}
      {stage === 'luna' && <LunaRetrieve onComplete={handleLunaComplete} mysteryName={mysteryName} isFinder={isFinder} />}
      {stage === 'confirmation' && <ScrollConfirmation mysteryName={mysteryName} isFinder={isFinder} onComplete={() => onFinderComplete(mysteryName)} />}
    </div>
  );
};

export default CinematicExperience;
