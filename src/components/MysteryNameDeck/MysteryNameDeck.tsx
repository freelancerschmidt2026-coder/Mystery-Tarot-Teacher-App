import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Type, 
  ChevronLeft, 
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { STRIDE_1_CARDS } from '../../data/MajorArcana/stride1';
import { TarotCard, MajorArcanaCard } from '../../types';

interface MysteryNameDeckProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function MysteryNameDeck({ onComplete, onBack }: MysteryNameDeckProps) {
  const [currentCard, setCurrentCard] = useState<TarotCard | null>(null);

  const isMajorArcana = (card: any): card is MajorArcanaCard => {
    return card.arcana === 'major';
  };
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const total = 10;

  useEffect(() => {
    generateQuestion();
  }, []);

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
  };

  const handleSelect = (name: string) => {
    if (selectedOption) return;
    setSelectedOption(name);
    const correct = name === currentCard?.name;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    
    setTimeout(() => {
      if (count + 1 < total) {
        setCount(c => c + 1);
        generateQuestion();
      } else {
        setCount(total);
      }
    }, 1500);
  };

  if (count === total) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-12 bg-[#0d0d14] border border-white/5 rounded-3xl text-center space-y-8 mx-auto"
      >
        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/20">
          <Type className="text-purple-400" size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Session Complete</h2>
          <p className="text-slate-400">You identified {score} out of {total} cards correctly.</p>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-white">{(score / total) * 100}%</p>
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
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Identify the Card</h2>
        <p className="text-slate-400">Look at the symbol and meaning, then choose the correct traditional name.</p>
      </div>

      <AnimatePresence mode="wait">
        {currentCard && (
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#0d0d14] border border-white/5 rounded-3xl p-8 space-y-8 shadow-2xl"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <HelpCircle size={32} className="text-slate-500" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-400">Symbol</p>
                <p className="text-xl font-serif italic text-white">
                  {isMajorArcana(currentCard) ? "Major Arcana" : `"${currentCard.symbol || '?'}"`}
                </p>
              </div>
              <div className="text-center space-y-2 max-w-md">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Core Meaning</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {isMajorArcana(currentCard) ? currentCard.upright.experienceSummary : (currentCard.uprightMeaning || 'Meaning unknown')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === currentCard.name;
                
                let buttonClass = "p-4 rounded-xl border font-bold transition-all text-center ";
                if (!selectedOption) {
                  buttonClass += "bg-white/5 border-white/5 hover:border-purple-500/50 hover:bg-purple-500/5 text-slate-300";
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
                    <div className="flex items-center justify-center gap-2">
                      {selectedOption && isCorrectOption && <CheckCircle2 size={16} />}
                      {selectedOption && isSelected && !isCorrectOption && <XCircle size={16} />}
                      {option}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all ${
              i < count ? 'bg-purple-500' : i === count ? 'bg-white w-4' : 'bg-white/10'
            }`} 
          />
        ))}
      </div>
    </div>
  );
}
