import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Send, Sparkles, Trophy, RotateCcw, ArrowLeft, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import confetti from 'canvas-confetti';
import { TAROT_CARDS } from './TarotData';
import './flashCard.css';

const LunaMode = ({ onBack }) => {
  const [currentCard, setCurrentCard] = useState(TAROT_CARDS[0]);
  const [isGrading, setIsGrading] = useState(false);
  const [scores, setScores] = useState(null);
  const [isListening, setIsListening] = useState(null); // field name
  const [isExamMode, setIsExamMode] = useState(false);
  const [answers, setAnswers] = useState({
    designInterpretation: '',
    uprightMeaning: '',
    reversedMeaning: '',
    keywords: '',
    emotionalTone: '',
    archetype: '',
    element: '',
    numerology: '',
    suitEnergy: ''
  });

  const [wasVoiceUsed, setWasVoiceUsed] = useState(false);
  
  const handleVoiceInput = (field) => {
    setWasVoiceUsed(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening === field) {
      setIsListening(null);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(field);
    recognition.onend = () => setIsListening(null);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswers(prev => ({ ...prev, [field]: prev[field] + ' ' + transcript }));
    };

    recognition.start();
  };

  const handleGrade = async () => {
    setIsGrading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `
      You are Luna, a tarot master. Grade the following tarot student's answers for the card: ${currentCard.name}.
      
      Correct Data:
      - Design Interpretation: ${currentCard.designInterpretation}
      - Upright Meaning: ${currentCard.uprightMeaning}
      - Reversed Meaning: ${currentCard.reversedMeaning}
      - Keywords: ${currentCard.keywords.join(', ')}
      - Emotional Tone: ${currentCard.emotionalTone}
      - Archetype: ${currentCard.archetype}
      - Element: ${currentCard.element}
      - Numerology: ${currentCard.numerology}
      - Suit Energy: ${currentCard.suitEnergy}
      
      Student's Answers:
      ${Object.entries(answers).map(([k, v]) => `- ${k}: ${v}`).join('\n')}
      
      For each field, provide a score from 0 to 100 based on accuracy and depth.
      Return the scores in JSON format.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              designInterpretation: { type: Type.NUMBER },
              uprightMeaning: { type: Type.NUMBER },
              reversedMeaning: { type: Type.NUMBER },
              keywords: { type: Type.NUMBER },
              emotionalTone: { type: Type.NUMBER },
              archetype: { type: Type.NUMBER },
              element: { type: Type.NUMBER },
              numerology: { type: Type.NUMBER },
              suitEnergy: { type: Type.NUMBER }
            },
            required: ["designInterpretation", "uprightMeaning", "reversedMeaning", "keywords", "emotionalTone", "archetype"]
          }
        }
      });

      const result = JSON.parse(response.text);
      setScores(result);
      
      // Save to test history for NotePad
      const avgScore = Math.round(Object.values(result).reduce((a, b) => a + b, 0) / Object.values(result).length);
      
      let testType = 'Luna Mastery';
      if (isExamMode) {
        testType = wasVoiceUsed ? 'Oral Exam' : 'Written Exam';
      }

      const newAttempt = {
        id: Date.now(),
        cardId: currentCard.id,
        cardName: currentCard.name,
        date: new Date().toISOString(),
        score: avgScore,
        detailedScores: result,
        type: testType,
        feedback: avgScore >= 80 ? "Luna is impressed by your deep connection." : "Luna suggests further meditation on this card's essence."
      };
      
      const savedHistory = JSON.parse(localStorage.getItem('luna_test_history') || '[]');
      localStorage.setItem('luna_test_history', JSON.stringify([newAttempt, ...savedHistory]));
      
      const allPassed = Object.values(result).every(s => s >= 80);
      if (allPassed) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#add8e6', '#ffffff', '#fbbf24']
        });
      }
    } catch (error) {
      console.error("Grading error:", error);
      alert("Luna encountered a psychic block while grading. Please try again.");
    } finally {
      setIsGrading(false);
    }
  };

  const reset = () => {
    setScores(null);
    setWasVoiceUsed(false);
    setIsExamMode(false);
    setAnswers({
      designInterpretation: '',
      uprightMeaning: '',
      reversedMeaning: '',
      keywords: '',
      emotionalTone: '',
      archetype: '',
      element: '',
      numerology: '',
      suitEnergy: ''
    });
    // Pick a new random card
    const nextIdx = (TAROT_CARDS.indexOf(currentCard) + 1) % TAROT_CARDS.length;
    setCurrentCard(TAROT_CARDS[nextIdx]);
  };

  const renderInput = (field, label, fullWidth = false) => {
    if (currentCard.arcana === 'major' && ['element', 'numerology', 'suitEnergy'].includes(field)) {
      if (field !== 'element' && field !== 'numerology') return null;
    }

    return (
      <div className={`luna-input-group ${fullWidth ? 'full-width' : ''}`}>
        <label className="luna-label">
          {label}
          <button 
            className={`voice-btn ${isListening === field ? 'active' : ''}`}
            onClick={() => handleVoiceInput(field)}
          >
            <Mic size={14} />
          </button>
        </label>
        <textarea 
          className="luna-textarea"
          value={answers[field]}
          onChange={(e) => setAnswers(prev => ({ ...prev, [field]: e.target.value }))}
          placeholder={`Describe the ${label.toLowerCase()}...`}
        />
        {scores && (
          <div className={`fc-card-meta ${scores[field] >= 80 ? 'text-green-400' : 'text-red-400'}`} style={{ marginTop: '4px', textAlign: 'right' }}>
            Score: {scores[field]}% {scores[field] >= 80 ? '✓' : '✗'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flash-card-container">
      <header className="fc-header">
        <button className="fc-btn" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Luna Mastery</h1>
        <div className="fc-stats">
          <Sparkles className="text-blue-200" size={20} />
        </div>
      </header>

      <div className="luna-mode-grid">
        <div className="fc-card-wrapper">
          <div className="fc-card-front">
            <div className="fc-card-image-placeholder">
              <span className="fc-card-title">{currentCard.name}</span>
            </div>
            <div className="fc-card-meta">
              {currentCard.arcana} arcana • {currentCard.number}
            </div>
            <div className="fc-card-content" style={{ marginTop: '20px' }}>
              <h3>Luna's Vision</h3>
              <p style={{ fontStyle: 'italic', opacity: 0.8 }}>"{currentCard.visualDescription}"</p>
            </div>
          </div>
        </div>

        <div className="luna-form">
          <div className="flex items-center gap-4 mb-6 p-4 bg-blue-900/20 border border-blue-400/30 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-bold text-blue-200">Certification Exam Mode</h4>
              <p className="text-[10px] opacity-60">Enable this to record an official Oral or Written Exam attempt.</p>
            </div>
            <button 
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${isExamMode ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'}`}
              onClick={() => setIsExamMode(!isExamMode)}
            >
              {isExamMode ? 'EXAM ACTIVE' : 'PRACTICE MODE'}
            </button>
          </div>

          {renderInput('designInterpretation', 'Design Interpretation', true)}
          {renderInput('uprightMeaning', 'Upright Meaning')}
          {renderInput('reversedMeaning', 'Reversed Meaning')}
          {renderInput('keywords', 'Keywords')}
          {renderInput('emotionalTone', 'Emotional Tone')}
          {renderInput('archetype', 'Archetype')}
          
          {currentCard.arcana === 'minor' && (
            <>
              {renderInput('element', 'Element')}
              {renderInput('numerology', 'Numerology')}
              {renderInput('suitEnergy', 'Suit Energy')}
            </>
          )}
          {currentCard.arcana === 'major' && (
            <>
              {renderInput('element', 'Element')}
              {renderInput('numerology', 'Numerology')}
            </>
          )}

          <button 
            className="luna-submit-btn" 
            onClick={handleGrade}
            disabled={isGrading}
          >
            {isGrading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Loader2 className="animate-spin" size={18} /> Luna is Grading...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Send size={18} /> Submit for Mastery
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {scores && (
          <motion.div 
            className="grading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="grading-card"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              {Object.values(scores).every(s => s >= 80) ? (
                <>
                  <div className="mastery-badge">
                    <Trophy size={60} />
                  </div>
                  <h2 className="fc-card-title" style={{ fontSize: '2.5rem' }}>Card Mastered!</h2>
                  <p className="fc-card-meta" style={{ fontSize: '1rem', margin: '10px 0 30px' }}>
                    Your intuition is perfectly aligned with the {currentCard.name}.
                  </p>
                </>
              ) : (
                <>
                  <div className="mastery-badge" style={{ background: '#ff4444' }}>
                    <RotateCcw size={60} />
                  </div>
                  <h2 className="fc-card-title" style={{ fontSize: '2.5rem' }}>Keep Practicing</h2>
                  <p className="fc-card-meta" style={{ fontSize: '1rem', margin: '10px 0 30px' }}>
                    Luna sees room for deeper connection with this card.
                  </p>
                </>
              )}

              <div className="score-grid">
                {Object.entries(scores).map(([field, score]) => (
                  <div key={field} className="score-item">
                    <div className="score-label">{field.replace(/([A-Z])/g, ' $1')}</div>
                    <div className={`score-value ${score < 80 ? 'fail' : ''}`}>{score}%</div>
                  </div>
                ))}
              </div>

              <button className="fc-btn" style={{ width: '100%', padding: '15px' }} onClick={reset}>
                Next Challenge
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LunaMode;
