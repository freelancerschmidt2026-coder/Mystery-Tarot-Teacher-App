import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DevToggleContext = createContext();

export const useDevToggle = () => useContext(DevToggleContext);

export const DevToggleProvider = ({ children }) => {
  const [mode, setMode] = useState('dashboard'); // Default to dashboard for development
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'cinematic' ? 'dashboard' : 'cinematic'));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === 'M') {
        setMode('cinematic');
      } else if (e.shiftKey && e.key === 'D') {
        setMode('dashboard');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DevToggleContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
      {/* Floating Toggle Button - Only for development */}
      <AnimatePresence>
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '10px'
          }}
        >
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
                pointerEvents: 'none'
              }}
            >
              Toggle Cinematic (Shift+M) / Dashboard (Shift+D)
            </motion.div>
          )}
          <button
            onClick={toggleMode}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: mode === 'cinematic' ? '#0d0d14' : '#1a1a2e',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: mode === 'cinematic' ? '0 0 20px rgba(255,0,255,0.4)' : '0 0 20px rgba(0,255,255,0.4)',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
          >
            {/* Moon Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>
    </DevToggleContext.Provider>
  );
};
