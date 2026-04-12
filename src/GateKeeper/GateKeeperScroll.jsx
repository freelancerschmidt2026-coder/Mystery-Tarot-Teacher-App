import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCinematicAudio } from '../Cinematic/hooks/useCinematicAudio';
import { authenticateGateKeeper } from './gateKeeperAuth';
import './gateKeeperScroll.css';

const GateKeeperScroll = ({ onAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [status, setStatus] = useState('weathered'); // weathered, stabilized, dissolving
  const { playSound } = useCinematicAudio();

  // Rejuvenation factor (0 to 1)
  const rejuvenation = Math.min((name.length + email.length + passphrase.length) / 20, 1);

  useEffect(() => {
    if (rejuvenation > 0.8 && status === 'weathered') {
      setStatus('stabilized');
      playSound('title-chime');
    } else if (rejuvenation <= 0.8 && status === 'stabilized') {
      setStatus('weathered');
    }
  }, [rejuvenation, status, playSound]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const result = authenticateGateKeeper(name, email, passphrase);
    if (result.authenticated) {
      setStatus('dissolving');
      playSound('crystalline-shatter');
      setTimeout(() => {
        onAuthenticated(result.profile);
      }, 3000);
    } else {
      playSound('whisper-wind'); // error sound
      alert('The Gate remains closed. Verify your credentials.');
    }
  }, [name, email, passphrase, onAuthenticated, playSound]);

  return (
    <div className="gatekeeper-scroll-container">
      <AnimatePresence>
        {status !== 'dissolving' && (
          <motion.form
            onSubmit={handleSubmit}
            className={`gatekeeper-parchment ${status}`}
            initial={{ opacity: 0, scale: 0.6, rotateX: 60, y: 300 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateX: 0, 
              y: 0,
              x: 40 * rejuvenation,
              rotateZ: (1 - rejuvenation) * 3
            }}
            exit={{ opacity: 0, scale: 0.2, y: -1000, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "circOut" }}
          >
            <div className="gatekeeper-texture" />
            
            <h2 className="gatekeeper-title">GateKeeper Activation</h2>

            <div className="gatekeeper-input-group">
              <label className="gatekeeper-label">GateKeeper Name</label>
              <input
                type="text"
                className="gatekeeper-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.length > 0) playSound('name-whisper');
                }}
                placeholder="Enter your name..."
                required
              />
              <div className="gatekeeper-ink-glow" />
            </div>

            <div className="gatekeeper-input-group">
              <label className="gatekeeper-label">GateKeeper Email</label>
              <input
                type="email"
                className="gatekeeper-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
              />
              <div className="gatekeeper-ink-glow" />
            </div>

            <div className="gatekeeper-input-group">
              <label className="gatekeeper-label">GateKeeper Passphrase</label>
              <input
                type="password"
                className="gatekeeper-input"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter your passphrase..."
                required
              />
              <div className="gatekeeper-ink-glow" />
            </div>

            <motion.button
              type="submit"
              className="gatekeeper-submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Activate Protocol
            </motion.button>

            {/* Sigil Background */}
            <div className="gatekeeper-sigil-bg">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M50 10 L90 90 L10 90 Z" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="50" cy="50" r="10" fill="currentColor" />
              </svg>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Silver Dust Dissolution */}
      {status === 'dissolving' && (
        <div className="silver-dust-container">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="silver-dust"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ 
                x: (Math.random() - 0.5) * 2000, 
                y: (Math.random() - 0.5) * 2000, 
                opacity: 0,
                scale: 0,
                rotate: Math.random() * 720
              }}
              transition={{ duration: 3, ease: "circOut" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(GateKeeperScroll);
