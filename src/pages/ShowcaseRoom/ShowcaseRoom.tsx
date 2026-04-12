import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Gift, 
  Key, 
  Wind, 
  Sparkles, 
  Layers,
  Star,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function ShowcaseRoom() {
  const achievements = [
    { id: '1', title: 'Seal of the Fool', icon: ShieldCheck, unlocked: true, date: '2026-03-20' },
    { id: '2', title: 'Seal of the Magician', icon: ShieldCheck, unlocked: true, date: '2026-03-22' },
    { id: '3', title: 'Seal of the High Priestess', icon: ShieldCheck, unlocked: false },
    { id: '4', title: 'Seal of the Empress', icon: ShieldCheck, unlocked: false },
  ];

  const gifts = [
    { id: 'g1', title: 'Luna\'s Whisper', icon: Gift, description: 'A soft guidance in the dark.', unlocked: true },
    { id: 'g2', title: 'Starlight Essence', icon: Sparkles, description: 'Illuminates hidden symbols.', unlocked: false },
  ];

  const keys = [
    { id: 'k1', title: 'Gatekeeper\'s Iron Key', icon: Key, description: 'Access to Stride One.', unlocked: true },
    { id: 'k2', title: 'Silver Key of Silence', icon: Key, description: 'Access to Stride Two.', unlocked: false },
  ];

  return (
    <div className="space-y-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Your Showcase Room</h1>
        <p className="text-slate-400 text-lg">
          A sacred hall displaying your evolution as a tarot master. Your achievements, 
          gifts, and keys are stored here.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Achievements & Evolution */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <ShieldCheck className="text-amber-400" /> Seals of Ascension
              </h2>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">2 / 22 Unlocked</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {achievements.map((a) => (
                <div 
                  key={a.id}
                  className={`p-6 rounded-2xl border flex flex-col items-center text-center gap-4 transition-all ${
                    a.unlocked 
                      ? 'bg-amber-500/5 border-amber-500/20 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.05)]' 
                      : 'bg-white/5 border-white/5 text-slate-600'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${a.unlocked ? 'bg-amber-500/20' : 'bg-white/5'}`}>
                    {a.unlocked ? <a.icon size={24} /> : <Lock size={20} />}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-tighter leading-tight">{a.title}</p>
                  {a.unlocked && <p className="text-[10px] opacity-50">{a.date}</p>}
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Wind className="text-blue-400" /> Completed Fate Threads
              </h2>
              <button className="text-xs font-bold text-blue-400 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 bg-[#0d0d14] border border-white/5 rounded-2xl flex items-center gap-6 group hover:border-blue-500/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Star size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">The Weaver's First Choice</h4>
                    <p className="text-sm text-slate-500">Completed on March {18 + i}, 2026</p>
                  </div>
                  <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-400 border border-white/5">
                    Stride 1
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
              <Layers className="text-purple-400" /> Training Deck Evolutions
            </h2>
            <div className="p-8 bg-gradient-to-br from-purple-900/20 to-slate-900/20 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-48 bg-[#12121c] border-2 border-purple-500/30 rounded-2xl flex items-center justify-center relative shadow-2xl">
                <div className="absolute inset-0 bg-purple-500/5 blur-xl rounded-2xl" />
                <Layers className="text-purple-400/50" size={48} />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-xl font-bold">Stride One Master Deck</h3>
                <p className="text-slate-400 max-w-sm">
                  Your deck has evolved. The symbols are becoming clearer, and the traditional names are fully mastered.
                </p>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <div className="w-full max-w-[200px] h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="w-[45%] h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  </div>
                  <span className="text-xs font-bold text-purple-400">45%</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Gifts & Keys */}
        <div className="space-y-12">
          <section className="p-8 bg-[#0d0d14] border border-white/5 rounded-3xl space-y-8">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <Gift className="text-rose-400" /> Gifts from Luna
            </h2>
            <div className="space-y-6">
              {gifts.map((g) => (
                <div key={g.id} className={`flex items-start gap-4 ${g.unlocked ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${g.unlocked ? 'bg-rose-500/20 text-rose-400' : 'bg-white/5 text-slate-500'}`}>
                    {g.unlocked ? <g.icon size={20} /> : <Lock size={16} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{g.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{g.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 bg-[#0d0d14] border border-white/5 rounded-3xl space-y-8">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <Key className="text-blue-400" /> Gatekeeper's Keys
            </h2>
            <div className="space-y-6">
              {keys.map((k) => (
                <div key={k.id} className={`flex items-start gap-4 ${k.unlocked ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${k.unlocked ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-500'}`}>
                    {k.unlocked ? <k.icon size={20} /> : <Lock size={16} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{k.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{k.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl text-center space-y-4">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <Sparkles size={32} />
            </div>
            <h3 className="font-bold">Next Milestone</h3>
            <p className="text-xs text-slate-400">Complete 5 more Memory Drills to unlock the "Key of Silence".</p>
            <button className="w-full py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors text-sm">
              Go to Drills
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
