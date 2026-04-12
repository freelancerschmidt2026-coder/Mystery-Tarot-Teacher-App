import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  CheckCircle2,
  XCircle,
  Timer,
  Trophy
} from 'lucide-react';
import { STRIDE_1_CARDS } from '../../data/MajorArcana/stride1';
import { TarotCard, MajorArcanaCard } from '../../types';

interface QuickTestsProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function QuickTests({ onComplete, onBack }: QuickTestsProps) {
  const [currentCard, setCurrentCard] = useState<TarotCard | null>(null);

  const isMajorArcana = (card: any): card is MajorArcanaCard => {
    return card.arcana === 'major';
  };
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const total = 10;

  useEffect(() => {
    if (count < total) {
      generateQuestion();
    }
  }, [count]);

  useEffect(() => {
    if (timeLeft > 0 && !selectedOption && count < total) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !selectedOption) {
      handleSelect(''); // Time out
    }
  }, [timeLeft, selectedOption, count]);

  const generateQuestion = () => {
    const card = STRIDE_1_CARDS[Math.floor(Math.random() * STRIDE_1_CARDS.length)];
    setCurrentCard(card);
    
    const otherNames = STRIDE_1_CARDS
      .filter(c => c.id !== card.id)
      .map(c => c.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    setOptions([card.name, ...otherNames].sort(() => Math.random() - 0.5));
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeLeft(10);
  };

  const handleSelect = (name: string) => {
    if (selectedOption) return;
    setSelectedOption(name || 'TIMEOUT');
    const correct = name === currentCard?.name;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    
    setTimeout(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  if (count === total) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-12 bg-[#0d0d14] border border-white/5 rounded-3xl text-center space-y-8 mx-auto"
      >
        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto border border-yellow-500/20">
          <Trophy className="text-yellow-400" size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Test Results</h2>
          <p className="text-slate-400">You completed the Flash of Fate test.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Score</p>
            <p className="text-2xl font-bold text-white">{score}/{total}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Rank</p>
            <p className="text-2xl font-bold text-yellow-400">{score > 8 ? 'Master' : score > 5 ? 'Finder' : 'Novice'}</p>
          </div>
        </div>
        <button 
          onClick={onComplete}
          className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-purple-400 transition-colors"
        >
          Return to Studio
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="text-yellow-400" size={24} /> Flash of Fate
          </h2>
          <p className="text-sm text-slate-400">Quick identification test</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${timeLeft < 4 ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse' : 'bg-white/5 border-white/10 text-slate-300'}`}>
          <Timer size={18} />
          <span className="font-mono font-bold text-lg">{timeLeft}s</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentCard && (
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#0d0d14] border border-white/5 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden"
          >
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Card Number</p>
                <p className="text-6xl font-serif italic text-white/10">{currentCard.number}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
                  {isMajorArcana(currentCard) ? "Experience" : "Keywords"}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {isMajorArcana(currentCard) ? (
                    <span className="px-3 py-1 bg-white/5 rounded-full text-sm font-medium border border-white/5">
                      {currentCard.upright.experienceSummary}
                    </span>
                  ) : (
                    (currentCard.keywords || []).map(k => (
                      <span key={k} className="px-3 py-1 bg-white/5 rounded-full text-sm font-medium border border-white/5">{k}</span>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === currentCard.name;
                
                let buttonClass = "p-4 rounded-xl border font-bold transition-all text-center ";
                if (!selectedOption) {
                  buttonClass += "bg-white/5 border-white/5 hover:border-yellow-500/50 hover:bg-yellow-500/5 text-slate-300";
                } else if (isCorrectOption) {
                  buttonClass += "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
                } else if (isSelected && !isCorrectOption) {
                  buttonClass += "bg-rose-500/20 border-rose-500/50 text-rose-400";
                } else {
                  buttonClass += "bg-white/5 border-white/5 text-slate-600 opacity-50";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    disabled={!!selectedOption}
                    className={buttonClass}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
              <motion.div 
                className="h-full bg-yellow-500"
                initial={{ width: '0%' }}
                animate={{ width: `${(count / total) * 100}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
