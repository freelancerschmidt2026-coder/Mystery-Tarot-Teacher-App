import React, { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { useMysteryStore } from "../../state/useMysteryStore";
import { NotePadOpenIcon } from "../../magic/components/NotePadOpenIcon";
import { coverTemplates } from "../templates/coverTemplates";

const NotePadInterior = React.lazy(() => import("../pages/NotePadInterior"));

export const NotePadThreshold: React.FC = () => {
  const mysteryName = useMysteryStore((s) => s.mysteryName);
  const selectedCoverTemplate = useMysteryStore((s) => s.selectedCoverTemplate);
  const coverAnimationState = useMysteryStore((s) => s.coverAnimationState);
  const setCoverAnimationState = useMysteryStore((s) => s.setCoverAnimationState);

  const isOpening = coverAnimationState === "opening";
  const isOpen = coverAnimationState === "open";

  // --- Opening Ritual Logic ---
  useEffect(() => {
    if (coverAnimationState === "opening") {
      const timer = setTimeout(() => {
        setCoverAnimationState("open");
      }, 1200); // matches page-turn animation

      return () => clearTimeout(timer);
    }
  }, [coverAnimationState, setCoverAnimationState]);

  const templateClass =
    coverTemplates.find((t) => t.id === selectedCoverTemplate)?.className ||
    coverTemplates[0].className;

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      {/* CLOSED COVER */}
      {!isOpen && (
        <motion.div
          className={`relative rounded-xl p-8 ${templateClass}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: isOpening ? 1.05 : 1,
            rotateY: isOpening ? 90 : 0,
          }}
          transition={{
            duration: isOpening ? 1.2 : 0.6,
            ease: "easeInOut",
          }}
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 20px rgba(127,252,255,0.4)",
                "0 0 35px rgba(255,140,255,0.6)",
                "0 0 20px rgba(127,252,255,0.4)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Finder Name */}
          <h2 className="text-center text-2xl font-semibold text-white mb-6 tracking-wide">
            {mysteryName}’s Notebook
          </h2>

          {/* Magical Sigil */}
          <div className="flex justify-center mt-4">
            <NotePadOpenIcon size={80} />
          </div>
        </motion.div>
      )}

      {/* INTERIOR (lazy-loaded) */}
      {isOpen && (
        <Suspense
          fallback={
            <div className="text-white text-center mt-10 opacity-80">
              Opening your notebook…
            </div>
          }
        >
          <NotePadInterior />
        </Suspense>
      )}
    </div>
  );
};
