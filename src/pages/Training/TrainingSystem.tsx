import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Type, 
  BookOpen, 
  PenTool, 
  User, 
  Gamepad2, 
  Zap, 
  Brain, 
  FileText, 
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Moon,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { STRIDE_1_CARDS } from '../../data/MajorArcana/stride1';
import { TarotCard, TrainingMode } from '../../types';

// Import modular components
import TrainingDeck from '../../components/TrainingDeck/TrainingDeck';
import MysteryNameDeck from '../../components/MysteryNameDeck/MysteryNameDeck';
import QuickTests from '../../components/QuickTests/QuickTests';

export default function TrainingSystem() {
  const [mode, setMode] = useState<TrainingMode | null>(null);
  const [showResult, setShowResult] = useState(false);

  const modes = [
    { id: 'TrainingDeck', label: 'Training Deck', icon: Layers, desc: 'Master the core attributes of each card.' },
    { id: 'MysteryNameDeck', label: 'Mystery Name Deck', icon: Type, desc: 'Identify cards by their traditional names.' },
    { id: 'MeaningDeck', label: 'Meaning Deck', icon: BookOpen, desc: 'Connect cards with their upright and reversed meanings.' },
    { id: 'SymbolDeck', label: 'Symbol Deck', icon: PenTool, desc: 'Master the visual language and symbols.' },
    { id: 'RightfulOwnerDeck', label: 'Rightful Owner', icon: User, desc: 'Assign keywords to their correct cards.' },
    { id: 'MatchingGame', label: 'Matching Game', icon: Gamepad2, desc: 'Fast-paced drag-and-drop matching.' },
    { id: 'QuickTests', label: 'Quick Tests', icon: Zap, desc: 'Rapid-fire identification challenges.' },
    { id: 'MemoryDrills', label: 'Memory Drills', icon: Brain, desc: 'Strengthen your foundational recall.' },
    { id: 'StoryBuilder', label: 'Story Builder', icon: FileText, desc: 'Create narratives with your drawn cards.' },
  ];

  const reset = () => {
    setMode(null);
    setShowResult(false);
  };

  const renderMode = () => {
    switch (mode) {
      case 'TrainingDeck':
        return <TrainingDeck onComplete={reset} onBack={reset} />;
      case 'MysteryNameDeck':
        return <MysteryNameDeck onComplete={reset} onBack={reset} />;
      case 'QuickTests':
        return <QuickTests onComplete={reset} onBack={reset} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-[#0d0d14] border border-white/5 rounded-3xl">
            <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20">
              <Sparkles className="text-purple-400" size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Training Module Under Construction</h2>
              <p className="text-slate-400 max-w-md mx-auto">
                The Gatekeeper is currently refining the "{mode?.replace(/([A-Z])/g, ' $1').trim()}" module for Stride One.
              </p>
            </div>
            <button 
              onClick={reset}
              className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-purple-400 transition-colors"
            >
              Back to Studio
            </button>
          </div>
        );
    }
  };

  if (!mode) {
    return (
      <div className="space-y-12">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
            Major Arcana Stride 1
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Master the first 10 Major Arcana using traditional tarot names. 
            Only after mastery will the Montra names unlock.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modes.map((m, idx) => (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setMode(m.id as TrainingMode)}
              className="group p-8 bg-[#0d0d14] border border-white/5 rounded-3xl hover:border-purple-500/30 hover:bg-purple-500/5 transition-all text-left relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:text-purple-400 transition-colors border border-white/5 group-hover:border-purple-500/20">
                <m.icon size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-white transition-colors">{m.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{m.desc}</p>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles size={14} className="text-purple-500/50" />
              </div>
            </motion.button>
          ))}
        </div>

        <section className="p-8 bg-gradient-to-br from-blue-900/10 to-transparent border border-white/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Mastery Progress</h2>
            <p className="text-slate-400 max-w-md">
              Complete all training modules to unlock the "Seal of the Gatekeeper" and progress to Stride Two.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">2/10</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cards Mastered</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">20%</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Stride</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={reset}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ChevronLeft size={16} />
          <span>Back to Studio</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 text-xs font-bold uppercase tracking-widest">
            Mode: {mode.replace(/([A-Z])/g, ' $1').trim()}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderMode()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
