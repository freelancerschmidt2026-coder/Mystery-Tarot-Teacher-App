import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, RefreshCcw, Save, ArrowLeft } from 'lucide-react';
import './worksheet.css';

const Worksheet = ({ data, onComplete, onBack }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [remediationMode, setRemediationMode] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const saveTimeoutRef = useRef(null);

  // Auto-save logic
  useEffect(() => {
    if (Object.keys(answers).length > 0 && !isSubmitted) {
      setIsSaving(true);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      
      saveTimeoutRef.current = setTimeout(() => {
        // Simulate saving to a backend or local storage
        localStorage.setItem(`worksheet_${data.id}`, JSON.stringify(answers));
        setIsSaving(false);
      }, 1500);
    }
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [answers, data.id, isSubmitted]);

  // Load saved answers
  useEffect(() => {
    const saved = localStorage.getItem(`worksheet_${data.id}`);
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, [data.id]);

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    const incorrect = [];

    data.questions.forEach(q => {
      if (q.type === 'multiple-choice') {
        if (answers[q.id] === q.correctAnswer) {
          correctCount++;
        } else {
          incorrect.push({
            id: q.id,
            question: q.question,
            userAnswer: answers[q.id],
            correctAnswer: q.correctAnswer,
            explanation: q.explanation
          });
        }
      } else if (q.type === 'text') {
        // Simple text matching for grading, or could be manual
        if (answers[q.id]?.toLowerCase().trim() === q.correctAnswer?.toLowerCase().trim()) {
          correctCount++;
        } else {
          incorrect.push({
            id: q.id,
            question: q.question,
            userAnswer: answers[q.id],
            correctAnswer: q.correctAnswer,
            explanation: q.explanation
          });
        }
      } else if (q.type === 'reflection') {
        // Reflections are always "correct" for score purposes if filled
        if (answers[q.id]?.length > 10) {
          correctCount++;
        } else {
          incorrect.push({
            id: q.id,
            question: q.question,
            userAnswer: answers[q.id],
            correctAnswer: "Any thoughtful reflection",
            explanation: "Reflections require at least a few sentences of thought."
          });
        }
      }
    });

    const finalScore = Math.round((correctCount / data.questions.length) * 100);
    setScore(finalScore);
    setIncorrectAnswers(incorrect);
    setIsSubmitted(true);

    if (finalScore < 80) {
      setRemediationMode(true);
    } else {
      setRemediationMode(false);
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setRemediationMode(false);
    // Optionally clear answers or keep them for correction
    // setAnswers({}); 
  };

  if (!data) return <div className="p-20 text-center">Worksheet data missing.</div>;

  return (
    <div className="worksheet-container">
      <button className="lesson-back-btn" onClick={onBack}>
        <ArrowLeft size={18} />
        <span>Back to Syllabus</span>
      </button>

      <header className="worksheet-header">
        <div className="worksheet-title-group">
          <h1>{data.title}</h1>
          <p className="worksheet-subtitle">{data.subtitle}</p>
        </div>
        <div className="auto-save-status">
          {isSaving ? (
            <span className="flex items-center gap-2"><RefreshCcw size={12} className="animate-spin" /> Saving...</span>
          ) : (
            <span className="flex items-center gap-2"><Save size={12} /> Progress Saved</span>
          )}
        </div>
      </header>

      <div className="worksheet-content">
        {data.sections.map((section, sIdx) => (
          <section key={sIdx} className="worksheet-section">
            <h2>{section.title}</h2>
            <div className="questions-list">
              {section.questions.map((qId) => {
                const q = data.questions.find(item => item.id === qId);
                if (!q) return null;

                return (
                  <div key={q.id} className="question-item">
                    <span className="question-text">{q.question}</span>
                    
                    {q.type === 'text' && (
                      <input 
                        type="text" 
                        className="text-input"
                        value={answers[q.id] || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        disabled={isSubmitted && !remediationMode}
                        placeholder="Type your answer..."
                      />
                    )}

                    {q.type === 'multiple-choice' && (
                      <div className="options-grid">
                        {q.options.map((opt, oIdx) => (
                          <label 
                            key={oIdx} 
                            className={`option-label ${answers[q.id] === opt ? 'selected' : ''}`}
                          >
                            <input 
                              type="radio" 
                              name={q.id} 
                              value={opt}
                              checked={answers[q.id] === opt}
                              onChange={() => handleInputChange(q.id, opt)}
                              disabled={isSubmitted && !remediationMode}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {q.type === 'reflection' && (
                      <textarea 
                        className="reflection-area"
                        value={answers[q.id] || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        disabled={isSubmitted && !remediationMode}
                        placeholder="Share your deeper insights..."
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {!isSubmitted && (
        <div className="submit-footer">
          <button className="submit-btn" onClick={calculateScore}>
            Submit Worksheet
          </button>
        </div>
      )}

      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            className="results-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`score-display ${score >= 80 ? 'pass' : 'fail'}`}>
              {score}%
            </div>
            <div className="status-text">
              {score >= 80 ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle size={24} /> Mastery Achieved!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <AlertCircle size={24} /> Remediation Required
                </span>
              )}
            </div>

            {remediationMode ? (
              <div className="remediation-mode">
                <h3>Luna Remediation Mode</h3>
                <p>Luna has identified areas for deeper reflection. Review the concepts below before retrying.</p>
                
                <div className="incorrect-list">
                  {incorrectAnswers.map((item, idx) => (
                    <div key={idx} className="incorrect-item">
                      <p><strong>Question:</strong> {item.question}</p>
                      <p><strong>Your Answer:</strong> <span className="text-red-400">{item.userAnswer || 'No answer'}</span></p>
                      <div className="correct-explanation">
                        <strong>Luna's Insight:</strong> {item.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="retry-btn flex items-center gap-2 mx-auto" onClick={handleRetry}>
                  <RefreshCcw size={16} /> Generate New Worksheet & Retest
                </button>
              </div>
            ) : (
              <div className="success-actions">
                <p>You have successfully integrated these concepts into your practice.</p>
                <button className="submit-btn mt-6" onClick={() => onComplete(score)}>
                  Continue Journey
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Worksheet;
