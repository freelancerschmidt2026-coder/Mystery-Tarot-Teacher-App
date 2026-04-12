import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCinematicAudio } from '../hooks/useCinematicAudio';
import './envelopeIntro.css';

const letterLines = [
  "Welcome, User.",
  "You have arrived at the threshold of a realm shaped by symbols, stories, and unseen currents.",
  "Before you continue, listen closely.",
  "This world will reveal itself to you in stages — not all at once, and never by accident."
];

const EnvelopeIntro = ({ onComplete }) => {
  const [status, setStatus] = useState('materializing'); // materializing, waiting, opening, sliding, settled, narrating, finished, fading
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const { playSound } = useCinematicAudio();

  const handleOpen = useCallback(() => {
    setStatus('opening');
    playSound('envelope-open');
    playSound('paper-rustle'); // Added soft paper-rustle sound
    
    // Flap lift animation: 1000ms
    setTimeout(() => {
      setStatus('sliding');
      playSound('letter-slide');
    }, 1000);
  }, [playSound]);

  useEffect(() => {
    if (status === 'materializing') {
      // Envelope materializes: 600ms fade-in
      // Pause before interaction: 800ms
      const timer = setTimeout(() => {
        setStatus('waiting');
      }, 1400);
      return () => clearTimeout(timer);
    }

    if (status === 'sliding') {
      // Letter slide-out: 1350ms
      // Envelope fade-out: 700ms
      // Letter floats backward: 900ms
      // Letter settles in mid-air: 600ms
      // Total: 1350 + 700 + 900 + 600 = 3550ms
      const timer = setTimeout(() => {
        setStatus('settled');
      }, 3550);
      return () => clearTimeout(timer);
    }

    if (status === 'settled') {
      // Delay before pop-up: 600ms
      const timer = setTimeout(() => {
        setShowVolumePopup(true);
        // Fade-in: 400ms, On screen: 1500ms, Fade-out: 500ms
        // Total pop-up cycle: 2400ms
        setTimeout(() => {
          setShowVolumePopup(false);
          // Begin narration 700ms after pop-up fades out
          setTimeout(() => {
            setStatus('narrating');
          }, 1200);
        }, 1900);
      }, 600);
      return () => clearTimeout(timer);
    }

    if (status === 'narrating') {
      playSound('ambient-underscore'); 
      setIsGlowing(true);
      
      /**
       * Narration Script:
       * 1. "Welcome, User."
       * 2. "You stand at the edge of a world woven from intention and mystery."
       * 3. "Here, every symbol has a pulse. Every choice has a shadow. Every path reveals something waiting to be understood."
       * 4. "Your journey begins with a name — the one you will offer to the winds."
       */
      let currentLine = 0;
      const playNextLine = () => {
        if (currentLine < letterLines.length) {
          setVisibleLines(currentLine + 1);
          playSound(`narration-line-${currentLine + 1}`); // Placeholder for individual lines
          
          // Timing per line (approx 3.5s + 500ms pause)
          setTimeout(() => {
            currentLine++;
            setTimeout(playNextLine, 500);
          }, 3500);
        } else {
          setIsGlowing(false);
          setIsDimmed(true);
          setStatus('finished');
        }
      };

      playNextLine();
    }

    if (status === 'finished') {
      // Pause 600ms after narration ends
      const timer = setTimeout(() => {
        setStatus('fading');
        // Fade out over 900ms
        setTimeout(onComplete, 900);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [status, onComplete, playSound]);

  return (
    <div className="envelope-intro-container">
      <AnimatePresence>
        {showVolumePopup && (
          <motion.div 
            className="volume-popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              initial: { duration: 0.4 },
              animate: { duration: 0.4 },
              exit: { duration: 0.5 }
            }}
          >
            Please turn your volume up.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className={`envelope-wrapper ${status === 'opening' || status === 'sliding' || status === 'settled' || status === 'narrating' || status === 'finished' || status === 'fading' ? 'open' : ''}`}
        initial={{ opacity: 0, scale: 0.6, z: -500 }}
        animate={{ 
          opacity: (status === 'settled' || status === 'narrating' || status === 'finished' || status === 'fading') ? 0 : 1, 
          scale: 1, 
          z: 0 
        }}
        transition={{ duration: 1.5 }}
      >
        <div className="envelope-back">
          <div className="envelope-flap" />
          {status === 'waiting' ? (
            <motion.button 
              className="open-btn"
              onClick={handleOpen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Click here to open
            </motion.button>
          ) : null}
        </div>
      </motion.div>

      <AnimatePresence>
        {(status === 'sliding' || status === 'settled' || status === 'narrating' || status === 'finished' || status === 'fading') && (
          <motion.div 
            className={`letter visible ${status === 'settled' || status === 'narrating' || status === 'finished' || status === 'fading' ? 'letter-settled' : 'pulled-out'} ${isGlowing ? 'letter-glow-active' : ''} ${isDimmed ? 'letter-dimmed' : ''}`}
            initial={{ opacity: 0, y: 0, z: 0 }}
            animate={{ 
              opacity: status === 'fading' ? 0 : 1, 
              y: (status === 'settled' || status === 'narrating' || status === 'finished' || status === 'fading') ? -50 : -200,
              z: (status === 'settled' || status === 'narrating' || status === 'finished' || status === 'fading') ? 100 : 50,
              scale: (status === 'settled' || status === 'narrating' || status === 'finished' || status === 'fading') ? 1.2 : 1
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: status === 'fading' ? 0.9 : 1.5, 
              ease: status === 'fading' ? "easeOut" : "circOut" 
            }}
          >
            <div className="letter-text">
              {letterLines.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: visibleLines > index ? 1 : 0,
                    y: visibleLines > index ? 0 : 10
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="letter-line"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(EnvelopeIntro);
