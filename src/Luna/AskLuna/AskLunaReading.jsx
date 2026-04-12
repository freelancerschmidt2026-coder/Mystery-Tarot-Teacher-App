import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MessageSquare, 
  Box, 
  Layout, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ChevronRight,
  History,
  TrendingUp,
  Zap,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { questionUnderstandingEngine } from "../engine/questionUnderstandingEngine";
import { deckSelectionEngine } from "../engine/deckSelectionEngine";
import { spreadSelectionEngine } from "../engine/spreadSelectionEngine";
import { tarotInterpretationEngine } from "../engine/tarotInterpretationEngine";
import { evolutionEngine } from "../engine/evolutionEngine";
import { saveReadingEngine } from "../engine/saveReadingEngine";
import { voiceEngine } from "../voice/voiceEngine";
import DeckWarningModal from '../../components/Luna/DeckWarningModal';
import SpreadWarningModal from '../../components/Luna/SpreadWarningModal';
import { TAROT_CARDS } from '../../FlashCards/TarotData';
import './askLuna.css';

const AskLunaReading = () => {
  const [step, setStep] = useState('question'); // question, deck, spread, reading
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('general');
  const [selectedDeck, setSelectedDeck] = useState('rider-waite');
  const [selectedSpread, setSelectedSpread] = useState('three-card');
  const [isDeckWarningOpen, setIsDeckWarningOpen] = useState(false);
  const [isSpreadWarningOpen, setIsSpreadWarningOpen] = useState(false);
  const [interpretation, setInterpretation] = useState(null);
  const [evolutionNotes, setEvolutionNotes] = useState(null);
  const [isClarifying, setIsClarifying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [clarificationPrompt, setClarificationPrompt] = useState('');

  const decks = [
    { id: 'rider-waite', name: 'Rider-Waite', desc: 'The classic foundational deck.' },
    { id: 'marseille', name: 'Tarot de Marseille', desc: 'Ancient and geometric.' },
    { id: 'thoth', name: 'Thoth Tarot', desc: 'Esoteric and complex.' },
    { id: 'shadowscapes', name: 'Shadowscapes', desc: 'Ethereal and intuitive.' }
  ];

  const spreads = [
    { id: 'one-card', name: 'One Card', desc: 'A quick spark of insight.' },
    { id: 'three-card', name: 'Three Card', desc: 'Past, Present, Future.' },
    { id: 'celtic-cross', name: 'Celtic Cross', desc: 'Deep, comprehensive analysis.' },
    { id: 'relationship', name: 'Relationship', desc: 'Understanding connections.' }
  ];

  const handleQuestionSubmit = () => {
    const analysis = questionUnderstandingEngine.analyzeQuestion(question);
    setCategory(analysis.category);
    if (analysis.needsClarification) {
      setIsClarifying(true);
      setClarificationPrompt(questionUnderstandingEngine.getClarificationPrompt(analysis.category));
    } else {
      setStep('deck');
    }
  };

  const handleDeckSelect = (deckId) => {
    const evaluation = deckSelectionEngine.evaluateDeck(deckId, category);
    setSelectedDeck(deckId);
    if (evaluation.isMismatch) {
      setIsDeckWarningOpen(true);
    } else {
      setStep('spread');
    }
  };

  const handleSpreadSelect = (spreadId) => {
    const evaluation = spreadSelectionEngine.evaluateSpread(spreadId, category);
    setSelectedSpread(spreadId);
    if (evaluation.isMismatch) {
      setIsSpreadWarningOpen(true);
    } else {
      startReading();
    }
  };

  const startReading = () => {
    setStep('reading');
    // Simulate drawing cards
    const numCards = selectedSpread === 'one-card' ? 1 : selectedSpread === 'three-card' ? 3 : 10;
    const drawnCards = [];
    const usedIndices = new Set();
    while (drawnCards.length < numCards) {
      const idx = Math.floor(Math.random() * TAROT_CARDS.length);
      if (!usedIndices.has(idx)) {
        usedIndices.add(idx);
        drawnCards.push({
          ...TAROT_CARDS[idx],
          isReversed: Math.random() > 0.7
        });
      }
    }

    const result = tarotInterpretationEngine.interpretCards(drawnCards, question);
    const voicedInterpretation = voiceEngine.applyVoiceToneForContext(result.narrative, "reading");
    
    setInterpretation({
      ...result,
      narrative: voicedInterpretation.text,
      voiceTone: voicedInterpretation
    });

    // Evolve Luna
    const notes = evolutionEngine.evolve({
      memberId: 'finder-luna', // Mocked
      deckId: selectedDeck,
      spreadId: selectedSpread,
      questionCategory: category,
      cards: drawnCards,
      numbers: result.cardInterpretations.map(c => c.number),
      elements: result.cardInterpretations.map(c => c.element)
    });
    setEvolutionNotes(notes);

    // Save Reading
    saveReadingEngine.saveReading({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      question,
      deckUsed: selectedDeck,
      spreadUsed: selectedSpread,
      cards: result.cardInterpretations.map((c, i) => ({
        ...drawnCards[i],
        meaning: c.meaning
      })),
      interpretation: {
        narrative: result.narrative,
        outcome: result.outcome
      },
      patterns: result.patterns,
      outcome: result.outcome,
      evolutionNotes: notes
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="ask-luna-container">
      <div className="luna-atmosphere">
        <div className="glow-orb top-right"></div>
        <div className="glow-orb bottom-left"></div>
      </div>

      <div className="ask-luna-content">
        <header className="ask-luna-header">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Ask Luna</h1>
            <p>Consult the High Priestess through the sacred LEE engine.</p>
          </motion.div>
        </header>

        <div className="reading-flow">
          <AnimatePresence mode="wait">
            {step === 'question' && (
              <motion.div 
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-card"
              >
                <div className="step-header">
                  <MessageSquare className="text-purple-400" />
                  <h2>The Question</h2>
                </div>
                <p className="step-desc">What does your heart seek to understand? Speak clearly to the veil.</p>
                
                {isClarifying && (
                  <div className="clarification-box">
                    <AlertCircle size={18} />
                    <p>{clarificationPrompt}</p>
                  </div>
                )}

                <textarea 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="question-input"
                />
                
                <button 
                  onClick={handleQuestionSubmit}
                  disabled={!question.trim()}
                  className="next-btn"
                >
                  Consult Luna <Send size={18} />
                </button>
              </motion.div>
            )}

            {step === 'deck' && (
              <motion.div 
                key="deck"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-card"
              >
                <div className="step-header">
                  <Box className="text-amber-400" />
                  <h2>Select Your Deck</h2>
                </div>
                <p className="step-desc">Choose the visual language that resonates with your query.</p>
                
                <div className="selection-grid">
                  {decks.map(deck => (
                    <button 
                      key={deck.id}
                      onClick={() => handleDeckSelect(deck.id)}
                      className={`selection-item ${selectedDeck === deck.id ? 'active' : ''}`}
                    >
                      <h3>{deck.name}</h3>
                      <p>{deck.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'spread' && (
              <motion.div 
                key="spread"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-card"
              >
                <div className="step-header">
                  <Layout className="text-blue-400" />
                  <h2>Choose a Spread</h2>
                </div>
                <p className="step-desc">The structure of the reading defines the depth of the insight.</p>
                
                <div className="selection-grid">
                  {spreads.map(spread => (
                    <button 
                      key={spread.id}
                      onClick={() => handleSpreadSelect(spread.id)}
                      className={`selection-item ${selectedSpread === spread.id ? 'active' : ''}`}
                    >
                      <h3>{spread.name}</h3>
                      <p>{spread.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'reading' && interpretation && (
              <motion.div 
                key="reading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="reading-result"
              >
                <div className="result-header">
                  <Sparkles className="text-yellow-200" />
                  <h2>Luna's Interpretation</h2>
                  <div className="ml-auto flex items-center gap-2 text-xs opacity-40">
                    <Clock size={12} /> {new Date().toLocaleTimeString()}
                  </div>
                </div>

                <div className="reading-metadata mb-6 p-4 bg-white/5 rounded-xl border border-white/10 flex gap-6 text-sm">
                  <div><span className="opacity-50">Deck:</span> {selectedDeck}</div>
                  <div><span className="opacity-50">Spread:</span> {selectedSpread}</div>
                </div>

                <div className="cards-display">
                  {interpretation.cardInterpretations.map((card, i) => (
                    <div key={i} className="card-result-item">
                      <div className="flex justify-between items-center mb-2">
                        <div className="card-name-tag">{card.name}</div>
                        <div className="text-[10px] uppercase tracking-widest opacity-40">{card.element}</div>
                      </div>
                      <p className="card-meaning">{card.meaning}</p>
                    </div>
                  ))}
                </div>

                <div className="patterns-section">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={18} className="text-blue-400" />
                    <h3>Patterns & Insights</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="pattern-item">
                      <strong>Dominant Element:</strong> {interpretation.patterns.suitDominance}
                      <p className="text-xs opacity-60 mt-1">{interpretation.patterns.elementalBalance}</p>
                    </div>
                    {interpretation.patterns.repeatingNumbers.length > 0 && (
                      <div className="pattern-item">
                        <strong>Repeating Numbers:</strong> {interpretation.patterns.repeatingNumbers.join(", ")}
                      </div>
                    )}
                  </div>
                  
                  {interpretation.patterns.combinations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <strong>Key Combinations:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {interpretation.patterns.combinations.map((combo, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30">
                            {combo}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {(interpretation.patterns.warnings.length > 0 || interpretation.patterns.surprises.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {interpretation.patterns.warnings.length > 0 && (
                      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                        <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-sm">
                          <AlertTriangle size={14} /> Warnings
                        </div>
                        {interpretation.patterns.warnings.map((w, i) => <p key={i} className="text-xs opacity-80">{w}</p>)}
                      </div>
                    )}
                    {interpretation.patterns.surprises.length > 0 && (
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <div className="flex items-center gap-2 text-blue-400 mb-2 font-bold text-sm">
                          <Zap size={14} /> Surprises
                        </div>
                        {interpretation.patterns.surprises.map((s, i) => <p key={i} className="text-xs opacity-80">{s}</p>)}
                      </div>
                    )}
                  </div>
                )}

                <div className="narrative-box">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare size={18} className="text-purple-400" />
                    <h3>The Narrative Flow</h3>
                  </div>
                  <p>{interpretation.narrative}</p>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <strong className="text-white block mb-2">Final Insight:</strong>
                    <p className="text-blue-200 font-serif italic">{interpretation.outcome}</p>
                  </div>
                </div>

                {evolutionNotes && (
                  <div className="evolution-notes p-6 bg-white/5 rounded-2xl border border-white/10 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <History size={18} className="text-green-400" />
                      <h3 className="text-white font-bold">Luna's Evolution Log</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                      <div>
                        <span className="opacity-50 block mb-1 uppercase tracking-widest">Repeating Cards</span>
                        <div className="text-green-200">
                          {evolutionNotes.repeatingCards.length > 0 ? evolutionNotes.repeatingCards.join(", ") : "None detected yet."}
                        </div>
                      </div>
                      <div>
                        <span className="opacity-50 block mb-1 uppercase tracking-widest">Repeating Numbers</span>
                        <div className="text-green-200">
                          {evolutionNotes.repeatingNumbers.length > 0 ? evolutionNotes.repeatingNumbers.join(", ") : "None detected yet."}
                        </div>
                      </div>
                      <div>
                        <span className="opacity-50 block mb-1 uppercase tracking-widest">Preferred Deck</span>
                        <div className="text-white">{evolutionNotes.preferredDeck}</div>
                      </div>
                      <div>
                        <span className="opacity-50 block mb-1 uppercase tracking-widest">Preferred Spread</span>
                        <div className="text-white">{evolutionNotes.preferredSpread}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="ethical-disclaimer">
                  <CheckCircle2 size={14} />
                  <p>{interpretation.disclaimer}</p>
                </div>

                <button 
                  onClick={() => setStep('question')}
                  className="restart-btn"
                >
                  <RefreshCw size={18} /> New Reading
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <DeckWarningModal 
        isOpen={isDeckWarningOpen}
        onClose={() => setIsDeckWarningOpen(false)}
        onConfirm={() => {
          setIsDeckWarningOpen(false);
          setStep('spread');
        }}
        onSwitch={() => setIsDeckWarningOpen(false)}
      />

      <SpreadWarningModal 
        isOpen={isSpreadWarningOpen}
        onClose={() => setIsSpreadWarningOpen(false)}
        onConfirm={() => {
          setIsSpreadWarningOpen(false);
          startReading();
        }}
        onSwitch={() => setIsSpreadWarningOpen(false)}
      />

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="luna-toast"
          >
            <CheckCircle2 size={18} />
            <span>Reading saved to NotePad and Log</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AskLunaReading;
