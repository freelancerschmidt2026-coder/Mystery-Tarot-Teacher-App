import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, X, AlertTriangle } from 'lucide-react';

const SpreadWarningModal = ({ isOpen, onClose, onConfirm, onSwitch }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md p-8 bg-[#0d0d14] border border-amber-500/30 rounded-3xl shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-4 bg-amber-500/10 rounded-full border border-amber-500/20">
              <AlertTriangle className="w-10 h-10 text-amber-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Spread Mismatch</h2>
              <p className="text-slate-400">
                Luna senses that this spread may not give you the clarity you’re seeking.
              </p>
            </div>

            <div className="flex flex-col w-full gap-3">
              <button 
                onClick={onConfirm}
                className="w-full py-4 bg-amber-500/10 text-amber-400 font-semibold rounded-2xl border border-amber-500/20 hover:bg-amber-500/20 transition-all"
              >
                Keep Spread
              </button>
              <button 
                onClick={onSwitch}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all"
              >
                Switch Spread
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SpreadWarningModal;
