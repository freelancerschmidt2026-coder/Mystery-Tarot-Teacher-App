import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import { motion, Reorder } from 'motion/react';
import './storyBuilderGame.css';

const StoryBuilderGame = ({ onComplete, onBack }) => {
  const [items, setItems] = useState([
    { id: 1, card: "The Fool", text: "Takes a leap of faith into the unknown." },
    { id: 2, card: "The Magician", text: "Learns to manifest their potential." },
    { id: 3, card: "The High Priestess", text: "Listens to their inner voice." },
    { id: 4, card: "The Empress", text: "Nurtures their creative ideas." },
  ].sort(() => Math.random() - 0.5));

  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [remediationData, setRemediationData] = useState([]);

  const handleSubmit = () => {
    const correctOrder = [1, 2, 3, 4];
    const userOrder = items.map(i => i.id);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);

    if (isCorrect) {
      setScore(100);
    } else {
      setScore(0);
      setRemediationData([{
        question: "The Fool's Journey Narrative",
        explanation: "The journey begins with The Fool (0), followed by The Magician (1) manifesting, The High Priestess (2) intuiting, and The Empress (3) creating."
      }]);
    }
    setIsFinished(true);
  };

  const handleRetry = () => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));
    setScore(0);
    setIsFinished(false);
    setRemediationData([]);
  };

  return (
    <GameTemplate
      title="The Fool's Narrative"
      description="Reorder the cards to construct a coherent story of spiritual evolution."
      score={score}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="sb-container">
        <p className="sb-instructions">Drag the cards to arrange them in the correct narrative order.</p>
        <Reorder.Group axis="y" values={items} onReorder={setItems} className="sb-list">
          {items.map((item) => (
            <Reorder.Item key={item.id} value={item} className="sb-item">
              <div className="sb-card-name">{item.card}</div>
              <div className="sb-card-text">{item.text}</div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <button className="sb-submit-btn" onClick={handleSubmit}>Finalize Narrative</button>
      </div>
    </GameTemplate>
  );
};

export default StoryBuilderGame;
