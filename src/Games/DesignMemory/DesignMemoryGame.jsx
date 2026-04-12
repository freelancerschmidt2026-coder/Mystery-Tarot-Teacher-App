import React, { useState, useEffect } from 'react';
import GameTemplate from '../GameTemplate';
import './designMemoryGame.css';

const DesignMemoryGame = ({ onComplete, onBack }) => {
  const [cards, setCards] = useState([
    { id: 1, name: 'The Fool', flipped: false, matched: false },
    { id: 2, name: 'The Magician', flipped: false, matched: false },
    { id: 3, name: 'The High Priestess', flipped: false, matched: false },
    { id: 4, name: 'The Empress', flipped: false, matched: false },
    { id: 1, name: 'The Fool', flipped: false, matched: false },
    { id: 2, name: 'The Magician', flipped: false, matched: false },
    { id: 3, name: 'The High Priestess', flipped: false, matched: false },
    { id: 4, name: 'The Empress', flipped: false, matched: false },
  ].sort(() => Math.random() - 0.5));

  const [flippedCards, setFlippedCards] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [remediationData, setRemediationData] = useState([]);
  const [turns, setTurns] = useState(0);

  const handleFlip = (index) => {
    if (flippedCards.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTurns(prev => prev + 1);
      const [first, second] = flippedCards;
      if (cards[first].id === cards[second].id) {
        const newCards = [...cards];
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.every(c => c.matched)) {
      const finalScore = Math.max(0, 100 - (turns - 4) * 10);
      setScore(finalScore);
      setIsFinished(true);
      if (finalScore < 80) {
        setRemediationData([{
          question: "Visual Memory Challenge",
          explanation: "Focus on the unique colors and symbols of each card to improve your visual recall."
        }]);
      }
    }
  }, [cards, turns]);

  const handleRetry = () => {
    setCards(prev => prev.map(c => ({ ...c, flipped: false, matched: false })).sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setIsFinished(false);
    setScore(0);
    setTurns(0);
    setRemediationData([]);
  };

  return (
    <GameTemplate
      title="Visual Recall"
      description="Recall the intricate details of card illustrations by matching pairs."
      score={score}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="dm-container">
        <div className="dm-stats">Turns: {turns}</div>
        <div className="dm-grid">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className={`dm-card ${card.flipped || card.matched ? 'flipped' : ''}`}
              onClick={() => handleFlip(idx)}
            >
              <div className="dm-card-inner">
                <div className="dm-card-front">?</div>
                <div className="dm-card-back">{card.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GameTemplate>
  );
};

export default DesignMemoryGame;
