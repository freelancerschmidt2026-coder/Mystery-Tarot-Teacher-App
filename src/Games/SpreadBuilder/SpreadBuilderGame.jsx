import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import './spreadBuilderGame.css';

const SpreadBuilderGame = ({ onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [remediationData, setRemediationData] = useState([]);

  const challenges = [
    {
      id: 1,
      inquiry: "A client wants to understand their current situation, the obstacles they face, and the likely outcome.",
      options: ["Celtic Cross", "Three-Card Spread", "One-Card Pull", "Horse Shoe Spread"],
      correctAnswer: "Three-Card Spread",
      explanation: "A Three-Card Spread (Past/Present/Future or Situation/Obstacle/Outcome) is perfect for a quick yet comprehensive overview."
    },
    {
      id: 2,
      inquiry: "A client needs a deep, multi-layered analysis of a complex life situation.",
      options: ["Celtic Cross", "Three-Card Spread", "One-Card Pull", "Yes/No Spread"],
      correctAnswer: "Celtic Cross",
      explanation: "The Celtic Cross is one of the most detailed and versatile spreads for deep, complex inquiries."
    },
    {
      id: 3,
      inquiry: "A client wants a quick daily focus or a simple 'yes/no' guidance.",
      options: ["Celtic Cross", "Three-Card Spread", "One-Card Pull", "Relationship Spread"],
      correctAnswer: "One-Card Pull",
      explanation: "A One-Card Pull is ideal for a daily focus, a quick insight, or simple guidance."
    }
  ];

  const handleAnswer = (answer) => {
    const q = challenges[currentIdx];
    if (answer === q.correctAnswer) {
      setScore(prev => prev + (100 / challenges.length));
    } else {
      setRemediationData(prev => [...prev, { 
        id: q.id, 
        question: q.inquiry, 
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
      title="Spread Architect"
      description="Design the perfect spread for a specific inquiry to maximize clarity and insight."
      score={Math.round(score)}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="spb-container">
        <div className="spb-inquiry-box">
          <p className="spb-label">The Inquiry:</p>
          <h2 className="spb-inquiry-text">{challenges[currentIdx].inquiry}</h2>
        </div>
        <div className="spb-options">
          {challenges[currentIdx].options.map((opt, idx) => (
            <button 
              key={idx} 
              className="spb-option-btn"
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

export default SpreadBuilderGame;
