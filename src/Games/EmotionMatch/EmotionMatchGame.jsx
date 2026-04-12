import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import './emotionMatchGame.css';

const EmotionMatchGame = ({ onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [remediationData, setRemediationData] = useState([]);

  const challenges = [
    {
      id: 1,
      card: "The Lovers",
      description: "Which emotion best resonates with this card?",
      options: ["Grief", "Harmony", "Conflict", "Isolation"],
      correctAnswer: "Harmony",
      explanation: "The Lovers card represents harmony, relationships, and alignment of values."
    },
    {
      id: 2,
      card: "The Tower",
      description: "Which emotion best resonates with this card?",
      options: ["Stability", "Joy", "Shock", "Boredom"],
      correctAnswer: "Shock",
      explanation: "The Tower represents sudden upheaval, shock, and the breakdown of old structures."
    },
    {
      id: 3,
      card: "The Star",
      description: "Which emotion best resonates with this card?",
      options: ["Despair", "Hope", "Anger", "Confusion"],
      correctAnswer: "Hope",
      explanation: "The Star represents hope, inspiration, and spiritual renewal."
    }
  ];

  const handleAnswer = (answer) => {
    const q = challenges[currentIdx];
    if (answer === q.correctAnswer) {
      setScore(prev => prev + (100 / challenges.length));
    } else {
      setRemediationData(prev => [...prev, { 
        id: q.id, 
        question: `Emotion for ${q.card}`, 
        explanation: q.explanation 
      }]);
    }

    if (currentIdx < challenges.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsFinished(false);
    setRemediationData([]);
  };

  return (
    <GameTemplate
      title="Emotional Resonance"
      description="Connect the cards with the core emotions they evoke in a reading."
      score={Math.round(score)}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="em-container">
        <div className="em-card-display">
          <div className="em-card-name">{challenges[currentIdx].card}</div>
          <p className="em-prompt">{challenges[currentIdx].description}</p>
        </div>
        <div className="em-options">
          {challenges[currentIdx].options.map((opt, idx) => (
            <button 
              key={idx} 
              className="em-option-btn"
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </GameTemplate>
  );
};

export default EmotionMatchGame;
