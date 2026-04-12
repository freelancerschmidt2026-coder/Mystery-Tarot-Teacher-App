import React from 'react';
import { motion } from 'motion/react';
import { userStore } from "../../state/UserState/userStore";
import './finderJourneyMap.css';

const FinderJourneyMap = ({ progress = {}, onReturn = () => {} }) => {
  const user = userStore.getState().user || { name: "Member", level: 1 };
  const steps = [
    {
      id: 'arrival',
      title: 'Arrival',
      description: 'You entered the realm and received your first letter.',
      status: progress.arrival ? 'completed' : 'locked'
    },
    {
      id: 'becameFinder',
      title: 'Becoming a Finder',
      description: 'Your name awakened the scroll.',
      status: progress.becameFinder ? 'completed' : 'locked'
    },
    {
      id: 'firstDeck',
      title: 'Your First Deck',
      description: 'You began shaping your symbolic language.',
      status: progress.firstDeck ? 'completed' : (progress.becameFinder ? 'active' : 'locked')
    },
    {
      id: 'cardArt',
      title: 'Card Art Awakening',
      description: 'Your cards began to take visual form.',
      status: progress.cardArt ? 'completed' : (progress.firstDeck ? 'active' : 'locked')
    },
    {
      id: 'deckPreview',
      title: 'Deck Preview',
      description: 'You saw your work as a living collection.',
      status: progress.deckPreview ? 'completed' : (progress.cardArt ? 'active' : 'locked')
    },
    {
      id: 'nextSteps',
      title: 'Next Steps',
      description: 'Placeholder for future unlocks.',
      status: 'locked'
    }
  ];

  return (
    <motion.div 
      className="finder-journey-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <header className="journey-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Your Journey, {user.name}.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          See your path unfold
        </motion.p>
      </header>

      <div className="journey-path">
        {steps.map((step, index) => (
          <div key={step.id} className={`journey-step ${step.status}`}>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
            
            <div className="step-node-container">
              <div className={`step-node ${step.status}`} />
              {step.status === 'active' && (
                <div className="shimmer-container">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="shimmer-particle"
                      animate={{ 
                        opacity: [0, 1, 0],
                        y: [0, (Math.random() - 0.5) * 40, 0],
                        x: [0, (Math.random() - 0.5) * 40, 0],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 2, 
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <motion.div 
        className="guidance-panel"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        viewport={{ once: true }}
      >
        <p>
          “Where you go next is up to you, Finder. <br />
          Your tools will grow as your story unfolds.”
        </p>
      </motion.div>

      <button className="return-btn" onClick={onReturn}>
        Return to Dashboard
      </button>
    </motion.div>
  );
};

export default FinderJourneyMap;
