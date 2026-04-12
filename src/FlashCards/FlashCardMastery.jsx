import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Sparkles, ArrowLeft } from 'lucide-react';
import SoloMode from './SoloMode';
import LunaMode from './LunaMode';
import './flashCard.css';

const FlashCardMastery = () => {
  const [mode, setMode] = useState(null); // null, solo, luna

  if (mode === 'solo') return <SoloMode onBack={() => setMode(null)} />;
  if (mode === 'luna') return <LunaMode onBack={() => setMode(null)} />;

  return (
    <div className="flash-card-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <motion.header 
        className="fc-header" 
        style={{ width: '100%', textAlign: 'center' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Flash-Card Mastery</h1>
        <p className="fc-card-meta" style={{ fontSize: '1.2rem', marginTop: '10px' }}>Choose your path to enlightenment.</p>
      </motion.header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', width: '100%', maxWidth: '900px', marginTop: '60px' }}>
        <motion.div 
          className="fc-card-front" 
          style={{ height: '400px', cursor: 'pointer', justifyContent: 'center', alignItems: 'center', gap: '20px' }}
          whileHover={{ scale: 1.05, borderColor: '#add8e6' }}
          onClick={() => setMode('solo')}
        >
          <div className="mastery-badge" style={{ background: 'rgba(255,255,255,0.05)', color: '#add8e6' }}>
            <User size={60} />
          </div>
          <h2 className="fc-card-title">Solo Mode</h2>
          <p className="fc-card-meta" style={{ textAlign: 'center', padding: '0 20px' }}>
            Practice at your own pace. Flip, shuffle, and focus on your weak cards.
          </p>
          <button className="fc-btn">Begin Solo Study</button>
        </motion.div>

        <motion.div 
          className="fc-card-front" 
          style={{ height: '400px', cursor: 'pointer', justifyContent: 'center', alignItems: 'center', gap: '20px' }}
          whileHover={{ scale: 1.05, borderColor: '#fbbf24' }}
          onClick={() => setMode('luna')}
        >
          <div className="mastery-badge" style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}>
            <Sparkles size={60} />
          </div>
          <h2 className="fc-card-title">Luna Mode</h2>
          <p className="fc-card-meta" style={{ textAlign: 'center', padding: '0 20px' }}>
            The ultimate test. Luna will grade your intuition and knowledge across all dimensions.
          </p>
          <button className="fc-btn" style={{ borderColor: '#fbbf24', color: '#fbbf24' }}>Enter Luna's Trial</button>
        </motion.div>
      </div>
    </div>
  );
};

export default FlashCardMastery;
