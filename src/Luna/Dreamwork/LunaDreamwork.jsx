import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Cloud, 
  Sparkles, 
  Mic, 
  Save, 
  Search, 
  Layout, 
  BrainCircuit, 
  History, 
  ArrowRight,
  Eye,
  Ghost,
  Wind,
  Star
} from 'lucide-react';
import { TAROT_CARDS } from '../../FlashCards/TarotData';
import './dreamwork.css';

import { notePadActions } from '../../state/NotePadState/notePadActions';

const LunaDreamwork = ({ onNavigate = () => {} }) => {
  const [view, setView] = useState('journal'); // journal, interpretation, spreads, history
  const [dreamText, setDreamText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [extractedSymbols, setExtractedSymbols] = useState([]);
  const [interpretation, setInterpretation] = useState(null);
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [dreamHistory, setDreamHistory] = useState(() => {
    const saved = localStorage.getItem('luna_dream_history');
    return saved ? JSON.parse(saved) : [];
  });

  const spreads = [
    { id: 'dream-3', name: '3-Card Dream Spread', description: 'Message, Obstacle, Resolution', count: 3 },
    { id: 'shadow-5', name: '5-Card Shadow Spread', description: 'Hidden Fears, Subconscious Roots, Integration', count: 5 },
    { id: 'mirror', name: 'Luna’s Dream Mirror', description: 'Reflecting the Soul’s Current State', count: 4 }
  ];

  const commonSymbols = [
    { name: 'Water', archetype: 'The Moon / Cups', meaning: 'Emotional depth, subconscious flow' },
    { name: 'Flight', archetype: 'The Fool / Swords', meaning: 'Freedom, perspective, mental release' },
    { name: 'Falling', archetype: 'The Tower', meaning: 'Loss of control, sudden change' },
    { name: 'Forest', archetype: 'The Hermit / Pentacles', meaning: 'Inner journey, growth, mystery' },
    { name: 'Mirror', archetype: 'The High Priestess', meaning: 'Reflection, intuition, hidden truths' },
    { name: 'Key', archetype: 'The Hierophant', meaning: 'Knowledge, access, tradition' }
  ];

  const handleExtractSymbols = () => {
    const found = commonSymbols.filter(s => 
      dreamText.toLowerCase().includes(s.name.toLowerCase())
    );
    setExtractedSymbols(found);
    
    // Mock interpretation
    setInterpretation({
      tone: dreamText.length > 100 ? 'Deeply Symbolic' : 'Fragmented',
      theme: found.length > 0 ? found[0].meaning : 'Abstract Subconscious',
      guidance: "Luna senses a strong connection to your emotional state. This dream suggests a need for grounding."
    });
    
    setView('interpretation');
  };

  const handleSaveDream = () => {
    const newEntry = {
      id: Date.now(),
      text: dreamText,
      symbols: extractedSymbols,
      interpretation,
      timestamp: new Date().toISOString()
    };
    
    const updatedHistory = [newEntry, ...dreamHistory];
    setDreamHistory(updatedHistory);
    localStorage.setItem('luna_dream_history', JSON.stringify(updatedHistory));
    
    // Save to NotePad
    notePadActions.saveNote({
      title: `Dream: ${dreamText.substring(0, 30)}...`,
      content: `### Dream Entry\n\n${dreamText}\n\n**Symbols Identified:**\n${extractedSymbols.map(s => `- **${s.name}**: ${s.meaning}`).join('\n')}\n\n**Luna's Insight:**\n${interpretation?.guidance}`,
      category: 'Dreamwork Notes'
    });
    
    alert('Dream archived in the Log and NotePad.');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Mock voice to text
      setTimeout(() => {
        setDreamText(prev => prev + " I was walking through a dark forest and found a golden key... ");
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <div className="luna-dreamwork-container">
      <div className="dream-atmosphere">
        <div className="mist-overlay"></div>
        <div className="dream-stars"></div>
      </div>

      <div className="dreamwork-content">
        <header className="dreamwork-header">
          <div className="header-info">
            <h1>Luna Dreamwork</h1>
            <p>Exploring the sacred symbols of your subconscious.</p>
          </div>
          <nav className="dreamwork-nav">
            <button className={view === 'journal' ? 'active' : ''} onClick={() => setView('journal')}><Cloud size={18} /> Journal</button>
            <button className={view === 'interpretation' ? 'active' : ''} onClick={() => setView('interpretation')}><BrainCircuit size={18} /> Insights</button>
            <button className={view === 'spreads' ? 'active' : ''} onClick={() => setView('spreads')}><Layout size={18} /> Spreads</button>
            <button className={view === 'history' ? 'active' : ''} onClick={() => setView('history')}><History size={18} /> History</button>
          </nav>
        </header>

        <main className="dreamwork-main">
          <AnimatePresence mode="wait">
            {view === 'journal' && (
              <motion.section 
                key="journal"
                className="dream-journal-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="journal-card">
                  <div className="card-header">
                    <Moon size={20} />
                    <span>Record Your Vision</span>
                  </div>
                  <textarea 
                    placeholder="Describe your dream in detail... What did you see? How did you feel?"
                    value={dreamText}
                    onChange={(e) => setDreamText(e.target.value)}
                  />
                  <div className="journal-actions">
                    <button className={`voice-btn ${isRecording ? 'recording' : ''}`} onClick={toggleRecording}>
                      <Mic size={20} /> {isRecording ? 'Listening...' : 'Voice Entry'}
                    </button>
                    <button className="analyze-btn" onClick={handleExtractSymbols} disabled={!dreamText}>
                      Analyze Symbols <Sparkles size={18} />
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {view === 'interpretation' && interpretation && (
              <motion.section 
                key="interpretation"
                className="dream-insight-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="insight-grid">
                  <div className="insight-card main-insight">
                    <h3>Luna's Interpretation</h3>
                    <p className="guidance-text italic">"{interpretation.guidance}"</p>
                    <div className="meta-row">
                      <div className="meta-item">
                        <span className="label">Tone</span>
                        <span className="value">{interpretation.tone}</span>
                      </div>
                      <div className="meta-item">
                        <span className="label">Theme</span>
                        <span className="value">{interpretation.theme}</span>
                      </div>
                    </div>
                    <button className="save-dream-btn" onClick={handleSaveDream}>
                      <Save size={18} /> Archive to NotePad
                    </button>
                  </div>

                  <div className="symbol-extraction-card">
                    <h3>Extracted Symbols</h3>
                    <div className="symbol-list">
                      {extractedSymbols.length > 0 ? extractedSymbols.map(symbol => (
                        <div key={symbol.name} className="symbol-item">
                          <div className="symbol-name">
                            <Star size={14} />
                            <span>{symbol.name}</span>
                          </div>
                          <div className="symbol-archetype">{symbol.archetype}</div>
                          <p className="symbol-meaning">{symbol.meaning}</p>
                        </div>
                      )) : (
                        <p className="empty-msg">No specific symbols identified. Focus on recurring motifs.</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {view === 'spreads' && (
              <motion.section 
                key="spreads"
                className="dream-spreads-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="spreads-grid">
                  {spreads.map(spread => (
                    <div key={spread.id} className="spread-card">
                      <div className="spread-icon"><Layout size={24} /></div>
                      <h4>{spread.name}</h4>
                      <p>{spread.description}</p>
                      <button className="select-spread-btn">Select Spread <ArrowRight size={16} /></button>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {view === 'history' && (
              <motion.section 
                key="history"
                className="dream-history-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="history-list">
                  {dreamHistory.length > 0 ? dreamHistory.map(entry => (
                    <div key={entry.id} className="history-item">
                      <div className="item-header">
                        <span className="date">{new Date(entry.timestamp).toLocaleDateString()}</span>
                        <span className="tone-tag">{entry.interpretation?.tone}</span>
                      </div>
                      <p className="preview">{entry.text.substring(0, 100)}...</p>
                      <div className="item-symbols">
                        {entry.symbols.map(s => <span key={s.name} className="s-tag">{s.name}</span>)}
                      </div>
                    </div>
                  )) : (
                    <div className="empty-history">
                      <Ghost size={48} />
                      <p>The dream archives are empty.</p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default LunaDreamwork;
