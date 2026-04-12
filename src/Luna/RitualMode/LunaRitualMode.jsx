import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Sun, 
  Sparkles, 
  Wind, 
  Heart, 
  Save, 
  ArrowLeft, 
  ChevronRight,
  RefreshCw,
  Eye,
  CloudMoon,
  Zap
} from 'lucide-react';
import { TAROT_CARDS } from '../../FlashCards/TarotData';
import './ritualMode.css';

import { notePadActions } from '../../state/NotePadState/notePadActions';

const RITUAL_TYPES = [
  { 
    id: 'morning', 
    name: 'Morning Ritual', 
    icon: <Sun size={24} />, 
    desc: 'Awaken your intuition and set your intentions for the day.',
    steps: ['grounding', 'breathing', 'card-pull', 'reflection']
  },
  { 
    id: 'evening', 
    name: 'Evening Ritual', 
    icon: <CloudMoon size={24} />, 
    desc: 'Release the day\'s energy and prepare for intuitive dreaming.',
    steps: ['release', 'breathing', 'card-pull', 'reflection']
  },
  { 
    id: 'new-moon', 
    name: 'New Moon Ritual', 
    icon: <Moon size={24} />, 
    desc: 'Plant seeds of intention in the fertile darkness of the new cycle.',
    steps: ['visioning', 'breathing', 'card-pull', 'reflection']
  },
  { 
    id: 'full-moon', 
    name: 'Full Moon Ritual', 
    icon: <Sparkles size={24} />, 
    desc: 'Illuminate your path and celebrate the peak of your intuitive power.',
    steps: ['illumination', 'breathing', 'card-pull', 'reflection']
  },
  { 
    id: 'daily-card', 
    name: 'Card of the Day Ritual', 
    icon: <Zap size={24} />, 
    desc: 'A quick ceremonial connection with the collective wisdom.',
    steps: ['focus', 'card-pull', 'reflection']
  },
  { 
    id: 'emotional-reset', 
    name: 'Emotional Reset Ritual', 
    icon: <Heart size={24} />, 
    desc: 'Ground your energy and find emotional clarity in the present moment.',
    steps: ['grounding', 'breathing', 'card-pull', 'reflection']
  }
];

const LunaRitualMode = ({ onNavigate = () => {} }) => {
  const [activeRitual, setActiveRitual] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [drawnCard, setDrawnCard] = useState(null);
  const [reflection, setReflection] = useState('');
  const [ritualComplete, setRitualComplete] = useState(false);

  const handleStartRitual = (ritual) => {
    setActiveRitual(ritual);
    setStepIndex(0);
    setDrawnCard(null);
    setReflection('');
    setRitualComplete(false);
  };

  const nextStep = () => {
    if (stepIndex < activeRitual.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setRitualComplete(true);
    }
  };

  const handleDrawCard = () => {
    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    setDrawnCard(randomCard);
    setTimeout(() => nextStep(), 3000);
  };

  const handleSaveToNotepad = () => {
    notePadActions.saveNote({
      title: `${activeRitual.name}: ${new Date().toLocaleDateString()}`,
      content: `### Ritual Summary\n\n**Ritual:** ${activeRitual.name}\n**Card Drawn:** ${drawnCard?.name || 'None'}\n\n**Reflection:**\n${reflection}`,
      category: 'Ritual Notes'
    });
    
    alert('Ritual insights saved to NotePad!');
  };

  const renderStep = () => {
    const step = activeRitual.steps[stepIndex];

    switch (step) {
      case 'grounding':
      case 'release':
      case 'visioning':
      case 'illumination':
      case 'focus':
        return (
          <motion.div 
            className="ritual-step-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="luna-guidance">
              <Sparkles className="luna-sparkle" size={32} />
              <p className="luna-text">
                {step === 'grounding' && "Close your eyes. Feel the earth beneath you. Imagine roots growing from your feet, deep into the soil..."}
                {step === 'release' && "Take a deep breath. As you exhale, imagine all the tension and noise of the day leaving your body..."}
                {step === 'visioning' && "In the darkness of the new moon, what seeds of intention are you ready to plant?"}
                {step === 'illumination' && "The full moon illuminates all. What truths are being revealed to you in this moment?"}
                {step === 'focus' && "Quiet your mind. Center your awareness on the present moment. What does the universe want you to know?"}
              </p>
            </div>
            <button className="ritual-action-btn" onClick={nextStep}>I am ready</button>
          </motion.div>
        );

      case 'breathing':
        return (
          <motion.div 
            className="ritual-step-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="breathing-circle-container">
              <motion.div 
                className="breathing-circle"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="breathing-text">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={isBreathing ? 'inhale' : 'exhale'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {isBreathing ? "Inhale..." : "Exhale..."}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <button className="ritual-action-btn mt-12" onClick={nextStep}>Continue</button>
          </motion.div>
        );

      case 'card-pull':
        return (
          <motion.div 
            className="ritual-step-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {!drawnCard ? (
              <div className="card-selection">
                <p className="luna-text mb-8">Luna is ready to reveal a message for you. Click to draw your card.</p>
                <motion.div 
                  className="ritual-card-back"
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  onClick={handleDrawCard}
                >
                  <Moon size={48} />
                </motion.div>
              </div>
            ) : (
              <div className="card-reveal">
                <motion.div 
                  className="ritual-card-front"
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                >
                  <div className="card-name">{drawnCard.name}</div>
                  <div className="card-arcana">{drawnCard.arcana}</div>
                </motion.div>
                <p className="card-meaning-preview mt-8 opacity-0 animate-fade-in">
                  {drawnCard.uprightMeaning.slice(0, 150)}...
                </p>
              </div>
            )}
          </motion.div>
        );

      case 'reflection':
        return (
          <motion.div 
            className="ritual-step-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="luna-guidance">
              <p className="luna-text">Reflect on the message you've received. How does it resonate with your current path?</p>
            </div>
            <textarea 
              className="ritual-reflection-area"
              placeholder="Record your intuitive insights..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
            <button className="ritual-action-btn" onClick={nextStep}>Complete Ritual</button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (ritualComplete) {
    return (
      <div className="ritual-complete-view">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="complete-card"
        >
          <Sparkles className="text-yellow-200 mb-6" size={64} />
          <h1>Ritual Complete</h1>
          <p className="opacity-70 mb-8">Your energy is grounded, and your path is clear.</p>
          
          <div className="complete-actions">
            <button className="complete-btn save" onClick={handleSaveToNotepad}>
              <Save size={18} /> Save to NotePad
            </button>
            <button className="complete-btn return" onClick={() => setActiveRitual(null)}>
              Return to Rituals
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="luna-ritual-mode">
      <div className="ritual-atmosphere">
        <div className="celestial-overlay"></div>
        <div className="slow-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="slow-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="ritual-content">
        {!activeRitual ? (
          <div className="ritual-selection-view">
            <header className="ritual-header">
              <h1>Ceremonial Rituals</h1>
              <p>Immersive spaces for grounding, reflection, and intuitive awakening.</p>
            </header>

            <div className="ritual-grid">
              {RITUAL_TYPES.map(ritual => (
                <motion.button
                  key={ritual.id}
                  className="ritual-card"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartRitual(ritual)}
                >
                  <div className="ritual-icon">{ritual.icon}</div>
                  <div className="ritual-info">
                    <h3>{ritual.name}</h3>
                    <p>{ritual.desc}</p>
                  </div>
                  <ChevronRight className="ritual-arrow" size={20} />
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="active-ritual-view">
            <button className="ritual-exit-btn" onClick={() => setActiveRitual(null)}>
              <ArrowLeft size={18} /> Exit Ritual
            </button>

            <div className="ritual-progress">
              {activeRitual.steps.map((_, i) => (
                <div key={i} className={`progress-dot ${i <= stepIndex ? 'active' : ''}`}></div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <div key={stepIndex}>
                {renderStep()}
              </div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default LunaRitualMode;
