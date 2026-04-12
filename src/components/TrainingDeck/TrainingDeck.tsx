import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2,
  Moon
} from 'lucide-react';
import { STRIDE_1_CARDS } from '../../data/MajorArcana/stride1';
import { MajorArcanaCard, LegacyTarotCard } from '../../types';

interface TrainingDeckProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function TrainingDeck({ onComplete, onBack }: TrainingDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentCard = STRIDE_1_CARDS[currentIndex];

  const isMajorArcana = (card: any): card is MajorArcanaCard => {
    return card.arcana === 'major';
  };

  const handleNext = () => {
    if (currentIndex < STRIDE_1_CARDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-12 bg-[#0d0d14] border border-white/5 rounded-3xl text-center space-y-8 mx-auto"
      >
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
          <CheckCircle2 className="text-emerald-400" size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Deck Mastered</h2>
          <p className="text-slate-400">You have successfully reviewed all cards in the Training Deck.</p>
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
          transition={{ duration: 0.4 }}
          className="relative w-[320px] h-[480px] perspective-1000 cursor-pointer group"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-[#12121c] border-2 border-white/10 rounded-[2rem] p-8 flex flex-col items-center justify-between shadow-2xl">
              <div className="w-full flex justify-between items-start">
                <span className="text-4xl font-serif italic text-white/20">{currentCard.number}</span>
                <Layers className="text-white/10" size={24} />
              </div>
              
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                  <Moon className="w-12 h-12 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white">{currentCard.name}</h2>
                {!isMajorArcana(currentCard) && (
                  <p className="text-slate-400 text-sm italic">"{currentCard.symbol}"</p>
                )}
                {isMajorArcana(currentCard) && (
                  <p className="text-slate-400 text-sm italic uppercase tracking-widest">Major Arcana</p>
                )}
              </div>

              <div className="w-full pt-6 border-t border-white/5 flex justify-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Tap to Reveal</span>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-[#1a1a2e] border-2 border-purple-500/30 rounded-[2rem] p-8 flex flex-col rotate-y-180 shadow-2xl overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                {isMajorArcana(currentCard) ? (
                  <>
                    <section>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2">Upright World</h4>
                      <p className="text-sm text-slate-200 leading-relaxed">{currentCard.upright.world}</p>
                    </section>
                    
                    <section>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2">Upright Mechanic</h4>
                      <p className="text-sm text-slate-200 leading-relaxed">{currentCard.upright.mechanic}</p>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2">Reversed World</h4>
                      <p className="text-sm text-slate-200 leading-relaxed">{currentCard.reversed.world}</p>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-2">Reversed Mechanic</h4>
                      <p className="text-sm text-slate-200 leading-relaxed">{currentCard.reversed.mechanic}</p>
                    </section>
                  </>
                ) : (
                  <>
                    <section>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2">Upright Meaning</h4>
                      <p className="text-sm text-slate-200 leading-relaxed">{currentCard.uprightMeaning}</p>
                    </section>
                    
                    <section>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-2">Reversed Meaning</h4>
                      <p className="text-sm text-slate-200 leading-relaxed">{currentCard.reversedMeaning}</p>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentCard.keywords.map((k) => (
                          <span key={k} className="px-2 py-1 bg-white/5 rounded text-[10px] font-medium text-slate-300 border border-white/5">
                            {k}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">Emotional Tone</h4>
                      <p className="text-sm text-slate-200">{currentCard.emotionalTone}</p>
                    </section>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-8">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-8 py-4 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-2xl font-bold hover:bg-purple-600/30 transition-all flex items-center gap-3"
        >
          <RotateCcw size={20} /> Flip Card
        </button>
        <button 
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-purple-400 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}
