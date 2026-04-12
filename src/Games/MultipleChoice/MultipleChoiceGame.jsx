import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import './multipleChoiceGame.css';

const MultipleChoiceGame = ({ onComplete, onBack }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [remediationData, setRemediationData] = useState([]);

  const questions = [
    {
      id: 1,
      question: "Which card represents the number 0 in the Major Arcana?",
      options: ["The Magician", "The Fool", "The World", "The High Priestess"],
      correctAnswer: "The Fool",
      explanation: "The Fool is the first card of the Major Arcana, representing number 0 and new beginnings."
    },
    {
      id: 2,
      question: "What is the name of the oldest surviving Tarot deck?",
      options: ["Tarot of Marseilles", "Visconti-Sforza", "Rider-Waite-Smith", "Thoth Tarot"],
      correctAnswer: "Visconti-Sforza",
      explanation: "The Visconti-Sforza decks are the oldest surviving Tarot cards, commissioned by wealthy families in the mid-15th century."
    },
    {
      id: 3,
      question: "Which suit in the Minor Arcana is associated with the element of Water?",
      options: ["Wands", "Pentacles", "Swords", "Cups"],
      correctAnswer: "Cups",
      explanation: "Cups are associated with the element of Water, representing emotions, relationships, and intuition."
    },
    {
      id: 4,
      question: "The Rider-Waite-Smith deck was first published in which year?",
      options: ["1890", "1909", "1925", "1944"],
      correctAnswer: "1909",
      explanation: "The Rider-Waite-Smith deck was first published in 1909, revolutionizing Tarot with its detailed illustrations."
    },
    {
      id: 5,
      question: "Which Major Arcana card represents the archetype of the Mother?",
      options: ["The Empress", "The High Priestess", "The Star", "The Moon"],
      correctAnswer: "The Empress",
      explanation: "The Empress represents the archetype of the Mother, abundance, and the nurturing power of nature."
    }
  ];

  const handleAnswer = (answer) => {
    const q = questions[currentQuestionIdx];
    if (answer === q.correctAnswer) {
      setScore(prev => prev + (100 / questions.length));
    } else {
      setRemediationData(prev => [...prev, { 
        id: q.id, 
        question: q.question, 
        explanation: q.explanation 
      }]);
    }

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIdx(0);
    setScore(0);
    setIsFinished(false);
    setRemediationData([]);
  };

  return (
    <GameTemplate
      title="Tarot Trivia"
      description="Test your knowledge of tarot history, symbolism, and tradition."
      score={Math.round(score)}
      isFinished={isFinished}
      remediationData={remediationData}
      onComplete={onComplete}
      onBack={onBack}
      onRetry={handleRetry}
    >
      <div className="mc-question-container">
        <div className="question-progress">
          Question {currentQuestionIdx + 1} of {questions.length}
        </div>
        <h2 className="mc-question-text">{questions[currentQuestionIdx].question}</h2>
        <div className="mc-options-grid">
          {questions[currentQuestionIdx].options.map((opt, idx) => (
            <button 
              key={idx} 
              className="mc-option-btn"
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

export default MultipleChoiceGame;
