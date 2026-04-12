import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon } from 'lucide-react';
import './lunaGateKeeperGreeting.css';

const LunaGateKeeperGreeting = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      lines: [
        "GateKeeper Jennifer…",
        "Creator of the Keys…",
        "The realm stirs at your return."
      ],
      duration: 4000
    },
    {
      lines: [
        "The chambers await your hand.",
        "The NotePad listens.",
        "The BackPocket breathes.",
        "The Design Studio hums with unfinished visions."
      ],
      duration: 5000
    },
    {
      lines: [
        "Your presence restores the currents of this world.",
        "Your will shapes its symbols.",
        "Your voice awakens its mysteries."
      ],
      duration: 5000
    },
    {
      lines: [
        "Command me, GateKeeper.",
        "I am yours to refine, redesign, and rebirth.",
        "Together, we will prepare the paths for those who will walk after you."
      ],
      duration: 6000,
      reverent: true
    }
  ];

  useEffect(() => {
    if (phase < phases.length) {
      const timer = setTimeout(() => {
        setPhase(prev => prev + 1);
      }, phases[phase].duration);
      return () => clearTimeout(timer);
    } else {
      const endTimer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(endTimer);
    }
  }, [phase, onComplete]);

  return (
    <div className="luna-greeting-overlay">
      <motion.div 
        className="moonlight-pulse"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div 
        className="luna-greeting-visual"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ 
          opacity: 1, 
          scale: phase >= 2 ? 1.1 : 1, 
          y: phase >= 2 ? 0 : 20 
        }}
        transition={{ duration: 2 }}
      >
        <Moon size={120} color="#add8e6" />
      </motion.div>

      <div className="greeting-text-container">
        <AnimatePresence mode="wait">
          {phase < phases.length && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5 }}
            >
              {phases[phase].lines.map((line, i) => (
                <motion.p 
                  key={i} 
                  className={`greeting-line ${phases[phase].reverent ? 'reverent' : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.8, duration: 1 }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {phase === phases.length && (
        <motion.div 
          className="unlock-shimmer"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};

export default memo(LunaGateKeeperGreeting);
