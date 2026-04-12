import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import './cardDesignMatchGame.css';

const CardDesignMatchGame = ({ onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [remediationData, setRemediationData] = useState([]);

  const challenges = [
    {
      id: 1,
      image: "https://picsum.photos/seed/visconti/300/500",
      description: "Hand-painted, gold-leafed, commissioned by royalty in mid-15th century Italy.",
      options: ["Visconti-Sforza", "Marseilles", "Rider-Waite-Smith", "Thoth"],
      correctAnswer: "Visconti-Sforza",
      explanation: "Visconti-Sforza decks are hand-painted masterpieces commissioned by wealthy families in the mid-15th century."
    },
    {
      id: 2,
      image: "https://picsum.photos/seed/marseilles/300/500",
      description: "Woodblock prints, simple color palette, pip cards for Minor Arcana.",
      options: ["Visconti-Sforza", "Marseilles", "Rider-Waite-Smith", "Thoth"],
      correctAnswer: "Marseilles",
      explanation: "Tarot of Marseilles decks are woodblock prints with simple color palettes and pip cards for the Minor Arcana."
    },
    {
      id: 3,
      image: "https://picsum.photos/seed/rws/300/500",
      description: "Detailed illustrations for all 78 cards, published in 1909, revolutionized tarot reading.",
      options: ["Visconti-Sforza", "Marseilles", "Rider-Waite-Smith", "Thoth"],
      correctAnswer: "Rider-Waite-Smith",
      explanation: "Rider-Waite-Smith decks are detailed illustrations for all 78 cards, published in 1909, revolutionizing tarot reading."
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
      title="Design Synthesis"
      description="Match the design elements and descriptions with the correct tarot deck style."
      score={Math.round(score)}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="cdm-container">
        <div className="cdm-card-preview">
          <img src={challenges[currentIdx].image} alt="Tarot Card Style" referrerPolicy="no-referrer" />
          <div className="cdm-description">{challenges[currentIdx].description}</div>
        </div>
        <div className="cdm-options">
          {challenges[currentIdx].options.map((opt, idx) => (
            <button 
              key={idx} 
              className="cdm-option-btn"
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

export default CardDesignMatchGame;
