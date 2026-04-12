import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCinematicAudio } from '../hooks/useCinematicAudio';
import './scrollRitual.css';

const ScrollRitual = ({ onComplete }) => {
  const [mysteryName, setMysteryName] = useState('');
  const [scrollState, setScrollState] = useState('idle'); // idle, awakening, rejuvenating, ascending, rolling, transformed, completed
  const { playSound } = useCinematicAudio();

  useEffect(() => {
    if (mysteryName.length > 0 && scrollState === 'idle') {
      setScrollState('awakening');
      playSound('void-hum');
    }
    
    if (mysteryName.length > 3 && scrollState === 'awakening') {
      setScrollState('rejuvenating');
    }
  }, [mysteryName, scrollState, playSound]);

  const handleSend = useCallback(() => {
    if (mysteryName.trim().length > 0) {
      setScrollState('ascending');
      playSound('whisper-wind');
      
      // Ceremonial sequence
      setTimeout(() => {
        setScrollState('rolling');
        playSound('scroll-roll');
      }, 1500);

      setTimeout(() => {
        setScrollState('transformed');
        playSound('identity-shift');
      }, 3500);

      setTimeout(() => {
        setScrollState('completed');
        onComplete(mysteryName);
      }, 6500);
    }
  }, [mysteryName, onComplete, playSound]);

  // Rejuvenation factor (0 to 1)
  const rejuvenation = Math.min(mysteryName.length / 12, 1);

  return (
    <div className="scroll-ritual-container">
      <AnimatePresence>
        {scrollState !== 'completed' && (
          <motion.div
            className={`scroll-parchment ${scrollState} ${scrollState === 'rolling' || scrollState === 'transformed' ? 'scroll-rolled' : ''}`}
            initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: 20 }}
            animate={{ 
              opacity: 1, 
              scale: (scrollState === 'rolling' || scrollState === 'transformed') ? 0.6 : 1, 
              y: scrollState === 'ascending' ? -50 : (scrollState === 'rolling' || scrollState === 'transformed') ? -100 : 0,
              rotateX: 0,
              boxShadow: scrollState === 'rejuvenating' ? '0 0 40px rgba(173, 216, 230, 0.2)' : '0 40px 80px rgba(0,0,0,0.9)'
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          >
            {/* Parchment Texture Overlay */}
            <div className="parchment-texture" />
            
            {/* Animated Torn Edges */}
            <div className={`scroll-edges ${rejuvenation > 0.8 ? 'repaired' : 'torn'}`} />

            {scrollState !== 'rolling' && scrollState !== 'transformed' && (
              <>
                <div className="whisper-text">The Mystery Awaits...</div>
                
                <motion.h2 
                  animate={{ color: rejuvenation > 0.5 ? '#2d1b0d' : '#5d4037' }}
                  className="scroll-title"
                >
                  What is your Mystery Tarot Name?
                </motion.h2>

                <div className="input-wrapper">
                  <input
                    type="text"
                    className="scroll-input"
                    value={mysteryName}
                    onChange={(e) => {
                      setMysteryName(e.target.value);
                      if (e.target.value.length > 0) playSound('name-whisper');
                    }}
                    placeholder="Type your name..."
                    autoFocus
                    disabled={scrollState === 'ascending'}
                  />
                  <div className="ink-glow" />
                </div>

                {mysteryName.length > 0 && scrollState === 'rejuvenating' && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(173, 216, 230, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    className="scroll-send-btn"
                  >
                    OFFER NAME
                  </motion.button>
                )}
              </>
            )}

            {/* Name Pulse Glow during transformation */}
            {scrollState === 'transformed' && (
              <motion.div 
                className="name-pulse-glow"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            {/* Inner Glow */}
            <div className="scroll-inner-glow" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finder Transformation Overlay */}
      <AnimatePresence>
        {scrollState === 'transformed' && (
          <motion.div 
            className="finder-transformation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="finder-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
              transition={{ 
                times: [0, 0.3, 0.7, 1],
                duration: 2.8,
                ease: "easeInOut"
              }}
            >
              You are now a Finder.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wind Particles */}
      {scrollState === 'ascending' && (
        <div className="wind-particles">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="wind-particle"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x: (Math.random() - 0.5) * 1000, 
                y: -500 - Math.random() * 500, 
                opacity: [0, 0.5, 0],
                scale: [0.1, 0.4, 0.1]
              }}
              transition={{ duration: 2 + Math.random() * 2, ease: "linear", repeat: Infinity }}
            >
              ?
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ScrollRitual);
