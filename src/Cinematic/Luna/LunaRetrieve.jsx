import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCinematicAudio } from '../hooks/useCinematicAudio';
import './lunaRetrieve.css';

const LunaRetrieve = ({ onComplete, mysteryName, isFinder }) => {
  const [flightState, setFlightState] = useState('entry'); // entry, recognition, retrieval, departure
  const { playSound } = useCinematicAudio();

  useEffect(() => {
    const sequence = async () => {
      // Entry: Slower, more graceful entrance
      playSound('wing-beat');
      await new Promise(r => setTimeout(r, 3500));
      
      // Recognition: Subtle nod
      setFlightState('recognition');
      await new Promise(r => setTimeout(r, 2500));
      
      // Retrieval: Gentle wing motion
      setFlightState('retrieval');
      playSound('item-pickup');
      await new Promise(r => setTimeout(r, 2000));
      
      // Departure: Glowing trail
      setFlightState('departure');
      playSound('wing-beat');
      await new Promise(r => setTimeout(r, 3500));
      
      onComplete();
    };

    sequence();
  }, [onComplete, playSound]);

  return (
    <div className="luna-retrieve-container">
      {/* Scroll Sprite (Rolled up) */}
      <AnimatePresence>
        {flightState !== 'departure' && (
          <motion.div
            className="scroll-sprite rolled-up"
            initial={{ y: 0, opacity: 1, scale: 0.6 }}
            animate={flightState === 'retrieval' ? {
              x: 120,
              y: -40,
              scale: 0.3,
              rotate: 90,
              opacity: 0.8
            } : {
              y: [0, -10, 0],
              opacity: 1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Luna Sprite with Flight Controller */}
      <motion.div
        className="luna-wrapper"
        initial={{ x: -1500, y: 200, rotate: 15 }}
        animate={
          flightState === 'entry' ? { x: 1500, y: -150, rotate: -15 } :
          flightState === 'recognition' ? { x: 250, y: 0, rotate: 0, rotateY: 180 } :
          flightState === 'retrieval' ? { x: 120, y: -40, rotate: -5, rotateY: 180 } :
          flightState === 'departure' ? { x: 3000, y: -800, rotate: -25, rotateY: 180, scale: 0.02 } : {}
        }
        transition={{ 
          duration: flightState === 'entry' || flightState === 'departure' ? 3.5 : 2, 
          ease: "circOut" 
        }}
      >
        {/* Glowing Trail */}
        {flightState === 'departure' && (
          <motion.div 
            className="luna-trail"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}

        <div className="luna-body">
          {/* SVG Luna with animated wings */}
          <svg viewBox="0 0 100 100" className="luna-svg">
            <defs>
              <radialGradient id="luna-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#add8e6" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#luna-glow)" />
            <circle cx="50" cy="50" r="35" fill="#add8e6" opacity="0.7" />
            
            {/* Expressive Eyes - Subtle nod in recognition */}
            <motion.g 
              animate={flightState === 'recognition' ? { 
                scaleY: [1, 0.1, 1],
                y: [0, 5, 0] 
              } : {}}
              transition={{ duration: 0.8 }}
            >
              <circle cx="35" cy="45" r="4" fill="#000" />
              <circle cx="65" cy="45" r="4" fill="#000" />
            </motion.g>

            {/* Fluid Wings - Gentle motion */}
            <motion.path 
              d="M70 50 Q95 20 110 50" 
              stroke="#fff" 
              strokeWidth="3" 
              fill="none"
              animate={{ 
                d: [
                  "M70 50 Q95 20 110 50",
                  "M70 50 Q95 80 110 50",
                  "M70 50 Q95 20 110 50"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: flightState === 'recognition' ? 1.2 : 0.8, 
                ease: "easeInOut" 
              }}
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(LunaRetrieve);
