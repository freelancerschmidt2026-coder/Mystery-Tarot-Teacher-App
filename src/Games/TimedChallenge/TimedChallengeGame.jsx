import React, { useState, useEffect } from 'react';
import GameTemplate from '../GameTemplate';
import { Timer } from 'lucide-react';
import './timedChallengeGame.css';

const TimedChallengeGame = ({ onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [remediationData, setRemediationData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const challenges = [
    { id: 1, card: "The Magician", meaning: "Manifestation" },
    { id: 2, card: "The Chariot", meaning: "Willpower" },
    { id: 3, card: "The Hermit", meaning: "Solitude" },
    { id: 4, card: "The Tower", meaning: "Upheaval" },
    { id: 5, card: "The Star", meaning: "Hope" },
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished) {
      setIsFinished(true);
    }
  }, [timeLeft, isFinished]);

  const handleAnswer = (answer) => {
    const q = challenges[currentIdx];
    if (answer === q.meaning) {
      setScore(prev => prev + (100 / challenges.length));
    } else {
      setRemediationData(prev => [...prev, { 
        id: q.id, 
        question: `Meaning of ${q.card}`, 
        explanation: `${q.card} represents ${q.meaning}.` 
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
    setTimeLeft(30);
  };

  const currentOptions = [
    challenges[currentIdx].meaning,
    "Abundance", "Structure", "Intuition"
  ].sort(() => Math.random() - 0.5);

  return (
    <GameTemplate
      title="Intuitive Sprint"
      description="Quick-fire card identification under pressure. You have 30 seconds."
      score={Math.round(score)}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="tc-container">
        <div className="tc-timer">
          <Timer size={20} />
          <span>{timeLeft}s remaining</span>
        </div>
        <div className="tc-card-box">
          <h2 className="tc-card-name">{challenges[currentIdx].card}</h2>
        </div>
        <div className="tc-options">
          {currentOptions.map((opt, idx) => (
            <button 
              key={idx} 
              className="tc-option-btn"
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

export default TimedChallengeGame;
