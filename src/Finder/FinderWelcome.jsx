import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import './finderWelcome.css';

const FinderWelcome = ({ finderName, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="finder-welcome-overlay">
      <motion.div 
        className="welcome-text-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="welcome-title">Welcome Home, {finderName}</h1>
        <p className="welcome-subtitle">The stars have been waiting for you.</p>
        <div className="welcome-glow" />
      </motion.div>
    </div>
  );
};

export default FinderWelcome;
