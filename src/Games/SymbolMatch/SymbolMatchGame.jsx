import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import './symbolMatchGame.css';

const SymbolMatchGame = ({ onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [remediationData, setRemediationData] = useState([]);

  const challenges = [
    {
      id: 1,
      symbol: "https://picsum.photos/seed/pomegranate/200/200",
      description: "Symbol of fertility, abundance, and the subconscious. Often found on the High Priestess and Empress cards.",
      options: ["Pomegranate", "Lion", "Infinity", "Rose"],
      correctAnswer: "Pomegranate",
      explanation: "The pomegranate is a symbol of fertility, abundance, and the subconscious, frequently appearing on the cards of the High Priestess and the Empress."
    },
    {
      id: 2,
      symbol: "https://picsum.photos/seed/lion/200/200",
      description: "Symbol of courage, strength, and raw passion. Central to the Strength card.",
      options: ["Pomegranate", "Lion", "Infinity", "Rose"],
      correctAnswer: "Lion",
      explanation: "The lion represents courage, strength, and raw passion, being the central symbol of the Strength card."
    },
    {
      id: 3,
      symbol: "https://picsum.photos/seed/infinity/200/200",
      description: "Symbol of eternal life, infinite potential, and spiritual mastery. Found on the Magician and Strength cards.",
      options: ["Pomegranate", "Lion", "Infinity", "Rose"],
      correctAnswer: "Infinity",
      explanation: "The infinity symbol (lemniscate) represents eternal life, infinite potential, and spiritual mastery, appearing on the Magician and Strength cards."
    }
  ];

  const handleAnswer = (answer) => {
    const q = challenges[currentIdx];
    if (answer === q.correctAnswer) {
      setScore(prev => prev + (100 / challenges.length));
    } else {
      setRemediationData(prev => [...prev, { 
        id: q.id, 
        question: q.description, 
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
      title="Symbolic Insight"
      description="Identify the hidden symbols within the cards and understand their deeper meanings."
      score={Math.round(score)}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="sm-container">
        <div className="sm-symbol-preview">
          <img src={challenges[currentIdx].symbol} alt="Tarot Symbol" referrerPolicy="no-referrer" />
          <div className="sm-description">{challenges[currentIdx].description}</div>
        </div>
        <div className="sm-options">
          {challenges[currentIdx].options.map((opt, idx) => (
            <button 
              key={idx} 
              className="sm-option-btn"
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

export default SymbolMatchGame;
