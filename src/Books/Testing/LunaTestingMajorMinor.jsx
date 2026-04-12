import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Send, CheckCircle, XCircle, RefreshCw, ArrowLeft, Trophy, AlertTriangle, BookOpen, GraduationCap, BrainCircuit } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GoogleGenAI, Type } from "@google/genai";
import { TAROT_CARDS } from '../../FlashCards/TarotData';
import './lunaTesting.css';

const LunaTestingMajorMinor = ({ onNavigate }) => {
  const [step, setStep] = useState('selection'); // selection, exam, results, remediation
  const [selectedCardId, setSelectedCardId] = useState('');
  const [examMode, setExamMode] = useState('written'); // written, oral
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
  const [isListening, setIsListening] = useState(null); // field key being listened to
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResults, setGradingResults] = useState(null);
  const [remediationFeedback, setRemediationFeedback] = useState(null);
  const [testHistory, setTestHistory] = useState(() => {
    const saved = localStorage.getItem('luna_test_history');
    return saved ? JSON.parse(saved) : [];
  });

  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (isListening) {
          setAnswers(prev => ({
            ...prev,
            [isListening]: prev[isListening] + finalTranscript
          }));
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(null);
      };

      recognitionRef.current.onend = () => {
        setIsListening(null);
      };
    }
  }, [isListening]);

  const toggleListening = (fieldKey) => {
    if (isListening === fieldKey) {
      recognitionRef.current.stop();
      setIsListening(null);
    } else {
      if (isListening) {
        recognitionRef.current.stop();
      }
      setIsListening(fieldKey);
      recognitionRef.current.start();
    }
  };

  const handleBeginExam = () => {
    if (selectedCardId) {
      setStep('exam');
    }
  };

  const selectedCard = TAROT_CARDS.find(c => c.id === selectedCardId);

  const categories = [
    { key: 'designInterpretation', label: 'Design Interpretation' },
    { key: 'uprightMeaning', label: 'Upright Meaning' },
    { key: 'reversedMeaning', label: 'Reversed Meaning' },
    { key: 'keywords', label: 'Keywords' },
    { key: 'emotionalTone', label: 'Emotional Tone' },
    { key: 'archetype', label: 'Archetype' }
  ];

  if (selectedCard?.arcana === 'minor') {
    categories.push(
      { key: 'element', label: 'Element' },
      { key: 'numerology', label: 'Numerology' },
      { key: 'suitEnergy', label: 'Suit Energy' }
    );
  }

  const handleSubmitExam = async () => {
    setIsGrading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `You are Luna, a wise and mystical Tarot Teacher. Grade the following Tarot mastery exam for the card: ${selectedCard.name}.
    
    Member's Answers:
    ${categories.map(cat => `${cat.label}: ${answers[cat.key]}`).join('\n')}
    
    Reference Data for ${selectedCard.name}:
    Design Interpretation: ${selectedCard.designInterpretation}
    Upright Meaning: ${selectedCard.uprightMeaning}
    Reversed Meaning: ${selectedCard.reversedMeaning}
    Keywords: ${selectedCard.keywords.join(', ')}
    Emotional Tone: ${selectedCard.emotionalTone}
    Archetype: ${selectedCard.archetype}
    ${selectedCard.arcana === 'minor' ? `
    Element: ${selectedCard.element}
    Numerology: ${selectedCard.numerology}
    Suit Energy: ${selectedCard.suitEnergy}
    ` : ''}
    
    Grade each category individually from 0 to 100. Be fair but strict. 80 is the passing mark.
    If any category is below 80, provide specific remediation feedback for that category.
    Also provide a general feedback message from Luna.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              grades: {
                type: Type.OBJECT,
                properties: categories.reduce((acc, cat) => {
                  acc[cat.key] = { type: Type.INTEGER };
                  return acc;
                }, {})
              },
              remediation: {
                type: Type.OBJECT,
                properties: categories.reduce((acc, cat) => {
                  acc[cat.key] = { type: Type.STRING };
                  return acc;
                }, {})
              },
              lunaMessage: { type: Type.STRING }
            },
            required: ["grades", "lunaMessage"]
          }
        }
      });

      const result = JSON.parse(response.text);
      setGradingResults(result);
      
      const allPassed = Object.values(result.grades).every(score => score >= 80);
      
      if (allPassed) {
        setStep('results');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#fde68a', '#ffffff']
        });
        saveMasteryRecord(true, result);
      } else {
        setStep('remediation');
        setRemediationFeedback(result.remediation);
        saveMasteryRecord(false, result);
      }
    } catch (error) {
      console.error('Grading error:', error);
      alert('Luna is having trouble grading your exam. Please try again.');
    } finally {
      setIsGrading(false);
    }
  };

  const saveMasteryRecord = (passed, result) => {
    const record = {
      id: Date.now(),
      cardId: selectedCard.id,
      cardName: selectedCard.name,
      date: new Date().toISOString(),
      type: `${examMode.charAt(0).toUpperCase() + examMode.slice(1)} Exam`,
      score: Math.round(Object.values(result.grades).reduce((a, b) => a + b, 0) / categories.length),
      passed,
      grades: result.grades,
      feedback: result.lunaMessage
    };

    const updatedHistory = [record, ...testHistory];
    setTestHistory(updatedHistory);
    localStorage.setItem('luna_test_history', JSON.stringify(updatedHistory));

    if (passed) {
      const passedCards = JSON.parse(localStorage.getItem('luna_passed_cards') || '[]');
      if (!passedCards.includes(selectedCard.id)) {
        localStorage.setItem('luna_passed_cards', JSON.stringify([...passedCards, selectedCard.id]));
      }
    }
  };

  const handleRetryFailed = () => {
    setStep('exam');
    // Keep the answers, but clear the ones that passed? 
    // Actually, remediation says "retake only the failed categories".
    // So we'll keep the answers for passed categories and clear failed ones.
    const newAnswers = { ...answers };
    Object.keys(gradingResults.grades).forEach(key => {
      if (gradingResults.grades[key] < 80) {
        newAnswers[key] = '';
      }
    });
    setAnswers(newAnswers);
  };

  const renderSelection = () => (
    <motion.div 
      className="selection-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="selection-grid">
        <div className="selection-group">
          <label>Major Arcana</label>
          <select 
            className="selection-select"
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
          >
            <option value="">Select a Major Card</option>
            {TAROT_CARDS.filter(c => c.arcana === 'major').map(card => (
              <option key={card.id} value={card.id}>{card.number}. {card.name}</option>
            ))}
          </select>
        </div>
        <div className="selection-group">
          <label>Minor Arcana</label>
          <select 
            className="selection-select"
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
          >
            <option value="">Select a Minor Card</option>
            {TAROT_CARDS.filter(c => c.arcana === 'minor').map(card => (
              <option key={card.id} value={card.id}>{card.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mode-selection">
        <button 
          className={`mode-btn ${examMode === 'oral' ? 'active' : ''}`}
          onClick={() => setExamMode('oral')}
        >
          <Mic size={24} />
          <h3>Oral Exam</h3>
          <p>Voice-to-Text Mode</p>
        </button>
        <button 
          className={`mode-btn ${examMode === 'written' ? 'active' : ''}`}
          onClick={() => setExamMode('written')}
        >
          <BookOpen size={24} />
          <h3>Written Exam</h3>
          <p>Typed Response Mode</p>
        </button>
      </div>

      <button 
        className="begin-btn"
        disabled={!selectedCardId}
        onClick={handleBeginExam}
      >
        Begin Mastery Examination
      </button>

      <div className="mt-8 flex justify-center">
        <button 
          className="action-btn secondary"
          onClick={() => onNavigate('luna-mentor')}
        >
          <BrainCircuit size={18} />
          Ask Luna for Help
        </button>
      </div>
    </motion.div>
  );

  const renderExam = () => (
    <div className="exam-layout">
      <div className="card-presentation">
        <div className="card-visual-box">
          <h2 className="card-name-display">{selectedCard.name}</h2>
          <span className="card-arcana-tag">{selectedCard.arcana} arcana</span>
          <p className="card-symbolic-description">
            "{selectedCard.visualDescription}"
          </p>
        </div>
        <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-left">
          <h4 className="text-xs font-bold text-yellow-500 uppercase mb-4">Luna's Guidance</h4>
          <p className="text-sm opacity-70 italic">
            "Speak from the soul, Finder. The cards are mirrors of the infinite. What do you see in the reflection of {selectedCard.name}?"
          </p>
        </div>
      </div>

      <div className="exam-fields">
        {categories.map((cat) => (
          <div key={cat.key} className={`field-group ${gradingResults?.grades?.[cat.key] < 80 ? 'failed' : ''}`}>
            <div className="field-header">
              <label className="field-label">{cat.label}</label>
              {examMode === 'oral' && (
                <button 
                  className={`mic-btn ${isListening === cat.key ? 'listening' : ''}`}
                  onClick={() => toggleListening(cat.key)}
                >
                  {isListening === cat.key ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              )}
              {gradingResults?.grades?.[cat.key] !== undefined && (
                <span className={`text-xs font-bold ${gradingResults.grades[cat.key] >= 80 ? 'text-green-400' : 'text-red-400'}`}>
                  {gradingResults.grades[cat.key]}%
                </span>
              )}
            </div>
            <textarea
              className="field-textarea"
              placeholder={`Describe the ${cat.label.toLowerCase()}...`}
              value={answers[cat.key]}
              onChange={(e) => setAnswers(prev => ({ ...prev, [cat.key]: e.target.value }))}
              disabled={gradingResults?.grades?.[cat.key] >= 80}
            />
            {remediationFeedback?.[cat.key] && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-200/80">
                <strong>Luna's Correction:</strong> {remediationFeedback[cat.key]}
              </div>
            )}
          </div>
        ))}

        <button 
          className="submit-exam-btn"
          onClick={handleSubmitExam}
          disabled={isGrading}
        >
          {isGrading ? 'Luna is evaluating...' : 'Submit Examination'}
        </button>
      </div>
    </div>
  );

  const renderRemediation = () => (
    <motion.div 
      className="remediation-panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="remediation-header">
        <AlertTriangle size={32} />
        <div>
          <h2 className="text-2xl font-serif">Remediation Required</h2>
          <p className="text-sm opacity-60">Luna has identified areas for deeper study.</p>
        </div>
      </div>

      <div className="remediation-feedback">
        <h4>Luna's Message</h4>
        <p>"{gradingResults.lunaMessage}"</p>
      </div>

      <div className="space-y-4 mb-8">
        {categories.filter(cat => gradingResults.grades[cat.key] < 80).map(cat => (
          <div key={cat.key} className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h5 className="text-xs font-bold text-red-400 uppercase mb-2">{cat.label}</h5>
            <p className="text-sm opacity-70">{remediationFeedback[cat.key]}</p>
          </div>
        ))}
      </div>

      <button className="retry-btn" onClick={handleRetryFailed}>
        Retake Failed Categories
      </button>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div 
      className="mastery-celebration"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mastery-badge">
        <Trophy size={60} />
      </div>
      <h2 className="mastery-title">Card Mastered</h2>
      <p className="mastery-subtitle">
        You have achieved full mastery over the {selectedCard.name}.
      </p>
      
      <div className="max-w-2xl mx-auto p-8 bg-white/5 rounded-2xl border border-white/10 mb-12">
        <p className="text-xl italic opacity-80">"{gradingResults.lunaMessage}"</p>
      </div>

      <button className="return-btn" onClick={() => setStep('selection')}>
        Return to Selection
      </button>
    </motion.div>
  );

  return (
    <div className="luna-testing-container">
      <header className="testing-header">
        <h1 className="testing-title">Luna’s Tarot Mastery Examination</h1>
        <p className="testing-subtitle">Test Out of Any Major or Minor Arcana Card</p>
      </header>

      <AnimatePresence mode="wait">
        {step === 'selection' && renderSelection()}
        {step === 'exam' && renderExam()}
        {step === 'remediation' && renderRemediation()}
        {step === 'results' && renderResults()}
      </AnimatePresence>

      {isGrading && (
        <div className="grading-overlay">
          <div className="grading-spinner" />
          <h2 className="text-2xl font-serif text-yellow-500">Luna is Evaluating...</h2>
          <p className="opacity-60 mt-2">The cards are whispering their judgment.</p>
        </div>
      )}
    </div>
  );
};

export default LunaTestingMajorMinor;
