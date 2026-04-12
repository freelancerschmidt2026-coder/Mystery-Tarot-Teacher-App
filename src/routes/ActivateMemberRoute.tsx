import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiActivateMember } from "../api/onboarding";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export const ActivateMemberRoute = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!memberId) return;
    
    const activate = async () => {
      try {
        await apiActivateMember(memberId);
        setStatus("success");
        // Give a moment for the success animation
        setTimeout(() => {
          navigate("/luna");
        }, 2000);
      } catch (error) {
        console.error("Activation error:", error);
        setStatus("error");
      }
    };

    activate();
  }, [memberId, navigate]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/5 border border-white/10 rounded-[40px] p-12 text-center space-y-8 shadow-2xl backdrop-blur-xl"
      >
        {status === "loading" && (
          <>
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
              <Loader2 className="w-24 h-24 text-emerald-400 animate-spin relative z-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Activating Your Journey</h1>
              <p className="text-slate-400">Luna is preparing your mythic space...</p>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
              <Sparkles className="w-24 h-24 text-amber-400 relative z-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Path Opened</h1>
              <p className="text-slate-400">Welcome, Finder. Luna is waiting for you.</p>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
              <AlertCircle className="w-24 h-24 text-red-400 relative z-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Activation Failed</h1>
              <p className="text-slate-400">The stars are misaligned. Please contact GateKeeper Jennifer for assistance.</p>
            </div>
            <button 
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all font-bold uppercase tracking-widest text-xs"
            >
              Back to Signup
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};
