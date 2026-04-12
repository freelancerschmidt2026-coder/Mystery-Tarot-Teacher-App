import React, { memo } from 'react';
import { motion } from 'motion/react';
import { useDevToggle } from '../Toggle/DevToggle';
import { Moon } from 'lucide-react';
import './scrollConfirmation.css';

const ScrollConfirmation = ({ mysteryName, isFinder, onComplete }) => {
  const { setMode } = useDevToggle();

  const handleEnter = () => {
    if (onComplete) {
      onComplete();
    } else {
      setMode('dashboard');
    }
  };

  return (
    <div className="confirmation-overlay">
      <motion.div
        className="luxury-card"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="card-chrome-edge" />
        <div className="moonlit-glow" />
        
        <div className="ceremonial-content">
          <motion.div 
            className="moon-sigil-icon"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Moon size={48} color="#add8e6" />
          </motion.div>

          <h2 className="confirmation-title">The Scroll is Delivered</h2>
          
          <p className="confirmation-message">
            Your scroll has been received, <span className="highlight-name">{isFinder ? 'Finder' : (mysteryName || 'User')}</span>.
            <br />
            Watch your inbox — your path begins shortly.
          </p>

          <motion.button
            className="sigil-button"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(173, 216, 230, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
          >
            Enter the Sanctuary
          </motion.button>
        </div>

        {/* Particle Shimmer */}
        <div className="particle-shimmer">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="shimmer-dot"
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, -60, 0],
                x: [0, (Math.random() - 0.5) * 60, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 3 + Math.random() * 3, 
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default memo(ScrollConfirmation);
