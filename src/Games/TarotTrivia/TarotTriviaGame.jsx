import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import './tarotTriviaGame.css';

const TarotTriviaGame = ({ onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [remediationData, setRemediationData] = useState([]);

  const questions = [
    {
      id: 1,
      question: "Which card in the Major Arcana is associated with the Hebrew letter 'Aleph'?",
      options: ["The Fool", "The Magician", "The High Priestess", "The Empress"],
      correctAnswer: "The Fool",
      explanation: "In many esoteric traditions, The Fool is associated with the Hebrew letter Aleph, representing the primal breath and infinite potential."
    },
    {
      id: 2,
      question: "What is the name of the organization founded by Arthur Edward Waite and Pamela Colman Smith?",
      options: ["The Golden Dawn", "The Builders of the Adytum", "The Hermetic Society", "The Order of the Star"],
      correctAnswer: "The Golden Dawn",
      explanation: "Both Waite and Smith were members of the Hermetic Order of the Golden Dawn, which heavily influenced their deck's symbolism."
    },
    {
      id: 3,
      question: "Which Minor Arcana suit is associated with the direction of 'South' and the element of 'Fire'?",
      options: ["Wands", "Pentacles", "Swords", "Cups"],
      correctAnswer: "Wands",
      explanation: "Wands are associated with the element of Fire and the direction of South, representing passion, creativity, and action."
    }
  ];

  const handleAnswer = (answer) => {
    const q = questions[currentIdx];
    if (answer === q.correctAnswer) {
      setScore(prev => prev + (100 / questions.length));
    } else {
      setRemediationData(prev => [...prev, { 
        id: q.id, 
        question: q.question, 
        explanation: q.explanation 
      }]);
    }

    if (currentIdx < questions.length - 1) {
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
      title="Master Trivia"
      description="The ultimate test of tarot lore, esoteric traditions, and historical tradition."
      score={Math.round(score)}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="tt-container">
        <div className="tt-question-box">
          <h2 className="tt-question-text">{questions[currentIdx].question}</h2>
        </div>
        <div className="tt-options">
          {questions[currentIdx].options.map((opt, idx) => (
            <button 
              key={idx} 
              className="tt-option-btn"
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

export default TarotTriviaGame;
