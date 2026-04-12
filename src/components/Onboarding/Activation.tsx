import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { LunaService } from '../../services/lunaService';
import { GateKeeperCRM } from '../../api/crm';

const Activation: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [memberName, setMemberName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const activate = async () => {
      if (!memberId) return;

      try {
        // 1. Activate Member API
        const res = await fetch(`/api/activateMember/${memberId}`, {
          method: 'POST'
        });
        const data = await res.json();

        if (data.success) {
          const { member, activation } = data;
          
          // 2. Initialize in frontend services
          const luna = LunaService.getInstance();
          const crm = GateKeeperCRM.getInstance();
          
          // Sync with local CRM mock
          await crm.createMember(member);
          await crm.activateMember(memberId);
          
          // Set current member in LunaService
          luna.setMember(member);
          
          // Initialize NotePad and other structures
          await luna.initializeMember(memberId);
          
          setMemberName(member.displayName);
          setStatus('success');
          
          // Redirect to Luna Chat after a short delay
          setTimeout(() => {
            navigate('/luna');
          }, 3000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Activation error:', error);
        setStatus('error');
      }
    };

    activate();
  }, [memberId, navigate]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#0d0d14] border border-white/10 rounded-3xl p-12 text-center"
      >
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-serif italic text-white mb-4">Opening Your Path</h2>
            <p className="text-slate-400">
              Verifying your Member ID and initializing your personal universe...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-serif italic text-white mb-4">Welcome, {memberName}</h2>
            <p className="text-slate-400 mb-8">
              Your journey has officially begun. Luna is waiting for you.
            </p>
            <div className="flex items-center justify-center gap-2 text-purple-400 text-sm italic">
              <Sparkles className="w-4 h-4" />
              Entering the app...
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-red-400">!</span>
            </div>
            <h2 className="text-2xl font-serif italic text-white mb-4">Activation Failed</h2>
            <p className="text-slate-400 mb-8">
              We couldn't verify your Member ID. Please contact the GateKeeper.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Return Home
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Activation;
