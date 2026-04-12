import React, { useEffect, useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCinematicAudio } from '../hooks/useCinematicAudio';
import './welcomeAnimation.css';

// Global Timing Controller for easy tuning
const TIMING = {
  VOID_DUR: 2000,
  TITLE_APPEAR: 3000,
  CIRCLE_FORM: 3000,
  ROTATION_START: 3000,
  BLINK_HEARTBEAT: 2000,
  EXPLOSION_DELAY: 2000,
  TRANSITION_OUT: 2000
};

const WelcomeAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState('void'); // void, title, circle, rotate, blink, explode
  const { playSound } = useCinematicAudio();

  // Memoized stars for performance and consistency
  const stars = useMemo(() => Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    size: Math.random() * 2 + 1,
    depth: Math.random() * 0.5 + 0.5 // For parallax
  })), []);

  // Memoized question marks
  const questionMarks = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    color: i % 2 === 0 ? '#ffb6c1' : '#add8e6',
    delay: Math.random() * 2,
    depth: Math.random() * 0.8 + 0.2
  })), []);

  useEffect(() => {
    playSound('void-hum');
    
    const sequence = async () => {
      await new Promise(r => setTimeout(r, TIMING.VOID_DUR));
      setStage('title');
      playSound('title-chime');
      
      await new Promise(r => setTimeout(r, TIMING.TITLE_APPEAR));
      setStage('circle');
      playSound('whisper-wind');
      
      await new Promise(r => setTimeout(r, TIMING.CIRCLE_FORM));
      setStage('rotate');
      
      await new Promise(r => setTimeout(r, TIMING.ROTATION_START));
      setStage('blink');
      
      await new Promise(r => setTimeout(r, TIMING.BLINK_HEARTBEAT));
      setStage('explode');
      playSound('crystalline-shatter');
      
      await new Promise(r => setTimeout(r, TIMING.EXPLOSION_DELAY));
      onComplete();
    };

    sequence();
  }, [onComplete, playSound]);

  return (
    <div className="welcome-void">
      {/* Parallax Starfield */}
      <div className="starfield-layer">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="star"
            style={{ 
              top: star.top, 
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.8 * star.depth, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3 / star.depth, 
              repeat: Infinity, 
              delay: star.delay 
            }}
          />
        ))}
      </div>

      {/* Drifting Question Marks with Parallax */}
      <AnimatePresence>
        {stage !== 'explode' && questionMarks.map((qm, i) => (
          <motion.div
            key={qm.id}
            className="question-mark"
            style={{ 
              top: qm.top, 
              left: qm.left, 
              color: qm.color,
              zIndex: 5,
              fontSize: `${1.5 + qm.depth}rem`
            }}
            initial={{ opacity: 0 }}
            animate={stage === 'circle' || stage === 'rotate' || stage === 'blink' ? {
              top: `${50 + 32 * Math.sin((i * 2 * Math.PI) / 12)}%`,
              left: `${50 + 32 * Math.cos((i * 2 * Math.PI) / 12)}%`,
              opacity: 1,
              color: ['#ffb6c1', '#ff00ff', '#00ffff', '#ff0000'],
              rotate: stage === 'rotate' ? (i % 2 === 0 ? 360 : -360) : 0,
              scale: stage === 'blink' ? [1, 1.1, 1] : 1
            } : {
              x: [0, (Math.random() - 0.5) * 100 * qm.depth, 0],
              y: [0, (Math.random() - 0.5) * 100 * qm.depth, 0],
              opacity: 0.4 * qm.depth
            }}
            transition={stage === 'circle' ? { duration: 2, ease: "circOut" } : {
              duration: 12 / qm.depth,
              repeat: Infinity,
              ease: "linear",
              delay: qm.delay
            }}
          >
            ?
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Title with Shimmer and Heartbeat */}
      <AnimatePresence mode="wait">
        {stage !== 'explode' && stage !== 'void' && (
          <motion.div
            key="title-container"
            className="title-container"
            initial={{ scale: 0.2, opacity: 0, z: -500 }}
            animate={{ 
              scale: stage === 'blink' ? [1, 1.05, 1] : 1, 
              opacity: 1, 
              z: 0 
            }}
            exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
            transition={{ 
              duration: 3, 
              ease: "easeOut",
              scale: stage === 'blink' ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : { duration: 3 }
            }}
          >
            <h1 className={`title-text rainbow-chase ${stage === 'blink' ? 'heartbeat-glow' : ''}`}>
              Mystery Tarot Teacher
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized Explosion */}
      <AnimatePresence>
        {stage === 'explode' && (
          <motion.div 
            className="explosion-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="dust-particle"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  color: i % 2 === 0 ? '#add8e6' : '#ffb6c1'
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 1200, 
                  y: (Math.random() - 0.5) * 1200, 
                  opacity: 0,
                  scale: 0,
                  rotate: Math.random() * 720
                }}
                transition={{ duration: 2.5, ease: "circOut" }}
              >
                ?
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(WelcomeAnimation);
