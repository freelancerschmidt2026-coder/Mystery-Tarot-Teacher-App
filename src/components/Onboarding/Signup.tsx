import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Mail, Lock, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { apiSignup } from '../../api/onboarding';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    chosenMemberName: '',
    email: '',
    password: '',
    subscriptionTier: 'Finder'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus('submitting');

    try {
      await apiSignup({ 
        email: formData.email, 
        password: formData.password, 
        displayName: formData.chosenMemberName, 
        subscriptionTier: formData.subscriptionTier 
      });
      setStatus('done');
    } catch (err) {
      console.error('Signup error:', err);
      setError("The stars are clouded. Please try again later.");
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#0d0d14] border border-white/10 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl"
        >
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-2xl font-serif italic text-white mb-4">Your Journey Begins</h2>
          <p className="text-slate-400 mb-8">
            Hello, {formData.chosenMemberName}. Your path has opened. 
            Check your email for your unique Member ID link to enter the Mystery Tarot Teacher App.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-[#0d0d14] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* Left Side - Branding */}
        <div className="md:w-1/2 bg-gradient-to-br from-purple-900/40 to-black p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
          <Sparkles className="w-12 h-12 text-purple-400 mb-6" />
          <h1 className="text-3xl font-serif italic text-white mb-4">Luna</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Enter the mythic world of Luna. An emotionally intelligent tarot companion that evolves with you.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-xl font-bold text-white mb-6">Join the Mystery</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1 ml-1 font-black">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:border-amber-500/50 outline-none transition-colors"
                  placeholder="Jennifer Smith"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1 ml-1 font-black">Member Name (Public)</label>
              <div className="relative">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  required
                  value={formData.chosenMemberName}
                  onChange={(e) => setFormData({...formData, chosenMemberName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:border-amber-500/50 outline-none transition-colors"
                  placeholder="StarFinder"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1 ml-1 font-black">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:border-amber-500/50 outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1 ml-1 font-black">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:border-amber-500/50 outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-[10px] text-center font-bold uppercase tracking-widest">{error}</p>
            )}

            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 mt-4 uppercase tracking-widest text-xs disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Opening the path...
                </>
              ) : (
                <>
                  Begin Your Journey
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
