import React, { useState, useEffect } from 'react';
import GameTemplate from '../GameTemplate';
import { motion } from 'motion/react';
import './matchingGame.css';

const MatchingGame = ({ onComplete, onBack }) => {
  const [pairs, setPairs] = useState([
    { id: 1, name: 'The Fool', meaning: 'New Beginnings', matched: false },
    { id: 2, name: 'The Magician', meaning: 'Manifestation', matched: false },
    { id: 3, name: 'The High Priestess', meaning: 'Intuition', matched: false },
    { id: 4, name: 'The Empress', meaning: 'Abundance', matched: false },
    { id: 5, name: 'The Emperor', meaning: 'Structure', matched: false },
  ]);

  const [selectedName, setSelectedName] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [remediationData, setRemediationData] = useState([]);

  const names = pairs.map(p => ({ id: p.id, text: p.name })).sort(() => Math.random() - 0.5);
  const meanings = pairs.map(p => ({ id: p.id, text: p.meaning })).sort(() => Math.random() - 0.5);

  const handleSelectName = (id) => {
    if (isFinished) return;
    setSelectedName(id);
    if (selectedMeaning) checkMatch(id, selectedMeaning);
  };

  const handleSelectMeaning = (id) => {
    if (isFinished) return;
    setSelectedMeaning(id);
    if (selectedName) checkMatch(selectedName, id);
  };

  const checkMatch = (nameId, meaningId) => {
    if (nameId === meaningId) {
      setPairs(prev => prev.map(p => p.id === nameId ? { ...p, matched: true } : p));
    } else {
      // Track incorrect for remediation
      const pair = pairs.find(p => p.id === nameId);
      if (!remediationData.find(r => r.id === nameId)) {
        setRemediationData(prev => [...prev, { 
          id: nameId, 
          question: `What is the meaning of ${pair.name}?`, 
          explanation: `${pair.name} represents ${pair.meaning}.` 
        }]);
      }
    }
    setSelectedName(null);
    setSelectedMeaning(null);
  };

  useEffect(() => {
    if (pairs.every(p => p.matched)) {
      const finalScore = Math.max(0, 100 - (remediationData.length * 10));
      setScore(finalScore);
      setIsFinished(true);
    }
  }, [pairs, remediationData]);

  const handleRetry = () => {
    setPairs(prev => prev.map(p => ({ ...p, matched: false })));
    setRemediationData([]);
    setIsFinished(false);
    setScore(0);
  };

  return (
    <GameTemplate
      title="Arcana Matching"
      description="Connect the Major Arcana with their core archetypal meanings."
      score={score}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="matching-grid">
        <div className="names-column">
          <h3>The Arcana</h3>
          {names.map(n => (
            <button 
              key={n.id}
              className={`match-btn ${selectedName === n.id ? 'selected' : ''} ${pairs.find(p => p.id === n.id).matched ? 'matched' : ''}`}
              onClick={() => handleSelectName(n.id)}
              disabled={pairs.find(p => p.id === n.id).matched}
            >
              {n.text}
            </button>
          ))}
        </div>
        <div className="meanings-column">
          <h3>The Meanings</h3>
          {meanings.map(m => (
            <button 
              key={m.id}
              className={`match-btn ${selectedMeaning === m.id ? 'selected' : ''} ${pairs.find(p => p.id === m.id).matched ? 'matched' : ''}`}
              onClick={() => handleSelectMeaning(m.id)}
              disabled={pairs.find(p => p.id === m.id).matched}
            >
              {m.text}
            </button>
          ))}
        </div>
      </div>
    </GameTemplate>
  );
};

export default MatchingGame;
