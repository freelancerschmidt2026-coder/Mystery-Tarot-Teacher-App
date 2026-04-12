import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shuffle, Filter, RotateCw, ArrowLeft, ArrowRight, Star, Save } from 'lucide-react';
import { notePadActions } from '../state/NotePadState/notePadActions';
import { TAROT_CARDS } from './TarotData';
import './flashCard.css';

const SoloMode = ({ onBack }) => {
  const [cards, setCards] = useState(TAROT_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filters, setFilters] = useState({
    arcana: 'all', // all, major, minor
    orientation: 'all', // all, upright, reversed
    weakOnly: false
  });
  const [weakCards, setWeakCards] = useState(() => {
    const saved = localStorage.getItem('luna_weak_cards');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSaveProgress = () => {
    notePadActions.saveNote({
      title: `Training Progress: ${new Date().toLocaleDateString()}`,
      content: `### Training Session Summary\n\n**Cards Studied:** ${cards.length}\n**Weak Cards Identified:** ${weakCards.length}\n\n**Focus Area:** ${filters.arcana} arcana`,
      category: 'Training Progress'
    });
    alert('Progress saved to NotePad!');
  };

  useEffect(() => {
    let filtered = TAROT_CARDS;
    if (filters.arcana !== 'all') {
      filtered = filtered.filter(c => c.arcana === filters.arcana);
    }
    if (filters.weakOnly) {
      filtered = filtered.filter(c => weakCards.includes(c.id));
    }
    
    // If no cards match filters, show all
    if (filtered.length === 0) {
      filtered = TAROT_CARDS;
    }
    
    setCards(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filters, weakCards]);

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setIsFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setIsFlipped(false);
  };

  const toggleWeak = (cardId) => {
    const updated = weakCards.includes(cardId)
      ? weakCards.filter(id => id !== cardId)
      : [...weakCards, cardId];
    setWeakCards(updated);
    localStorage.setItem('luna_weak_cards', JSON.stringify(updated));
  };

  const currentCard = cards[currentIndex];
  const isUpright = filters.orientation === 'upright' || (filters.orientation === 'all' && Math.random() > 0.3);

  return (
    <div className="flash-card-container">
      <header className="fc-header">
        <button className="fc-btn" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Solo Mastery</h1>
        <div className="fc-stats">
          <span className="fc-card-meta">{currentIndex + 1} / {cards.length}</span>
        </div>
      </header>

      <div className="fc-controls">
        <button 
          className={`fc-btn ${filters.arcana === 'all' ? 'active' : ''}`}
          onClick={() => setFilters(f => ({ ...f, arcana: 'all' }))}
        >
          All Arcana
        </button>
        <button 
          className={`fc-btn ${filters.arcana === 'major' ? 'active' : ''}`}
          onClick={() => setFilters(f => ({ ...f, arcana: 'major' }))}
        >
          Major Only
        </button>
        <button 
          className={`fc-btn ${filters.arcana === 'minor' ? 'active' : ''}`}
          onClick={() => setFilters(f => ({ ...f, arcana: 'minor' }))}
        >
          Minor Only
        </button>
        <button 
          className={`fc-btn ${filters.orientation === 'upright' ? 'active' : ''}`}
          onClick={() => setFilters(f => ({ ...f, orientation: 'upright' }))}
        >
          Upright Only
        </button>
        <button 
          className={`fc-btn ${filters.orientation === 'reversed' ? 'active' : ''}`}
          onClick={() => setFilters(f => ({ ...f, orientation: 'reversed' }))}
        >
          Reversed Only
        </button>
        <button 
          className={`fc-btn ${filters.weakOnly ? 'active' : ''}`}
          onClick={() => setFilters(f => ({ ...f, weakOnly: !f.weakOnly }))}
        >
          <Star size={14} fill={filters.weakOnly ? "currentColor" : "none"} /> Weak Cards
        </button>
        <button className="fc-btn" onClick={handleShuffle}>
          <Shuffle size={18} /> Shuffle
        </button>
        <button className="fc-btn" onClick={handleSaveProgress}>
          <Save size={18} /> Save Progress
        </button>
      </div>

      <div className="fc-card-wrapper">
        <div 
          className={`fc-card ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="fc-card-front">
            <div className="fc-card-image-placeholder">
              <span className="fc-card-title" style={{ transform: isUpright ? 'none' : 'rotate(180deg)' }}>
                {currentCard.name}
              </span>
            </div>
            <div className="fc-card-meta">
              {currentCard.arcana} arcana • {isUpright ? 'Upright' : 'Reversed'}
            </div>
            <button 
              className="voice-btn" 
              style={{ position: 'absolute', top: 10, right: 10 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleWeak(currentCard.id);
              }}
            >
              <Star size={20} fill={weakCards.includes(currentCard.id) ? "#fbbf24" : "none"} color={weakCards.includes(currentCard.id) ? "#fbbf24" : "currentColor"} />
            </button>
          </div>
          <div className="fc-card-back">
            <h2 className="fc-card-title">{currentCard.name}</h2>
            <div className="fc-card-content">
              <h3>Core Meaning</h3>
              <p>{isUpright ? currentCard.uprightMeaning : currentCard.reversedMeaning}</p>
              
              <h3>Keywords</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {currentCard.keywords.map(k => (
                  <span key={k} className="fc-card-meta" style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                    {k}
                  </span>
                ))}
              </div>

              <h3>Archetype</h3>
              <p>{currentCard.archetype}</p>

              {currentCard.arcana === 'minor' && (
                <>
                  <h3>Element & Numerology</h3>
                  <p>{currentCard.element} • {currentCard.numerology}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button className="fc-btn" onClick={handlePrev}>
          <ArrowLeft size={18} /> Prev
        </button>
        <button className="fc-btn" onClick={() => setIsFlipped(!isFlipped)}>
          <RotateCw size={18} /> Flip
        </button>
        <button className="fc-btn" onClick={handleNext}>
          Next <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default SoloMode;
