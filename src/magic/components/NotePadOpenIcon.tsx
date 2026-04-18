import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useMysteryStore } from "../../state/useMysteryStore";

interface NotePadOpenIconProps {
  size?: number;
  className?: string;
}

export const NotePadOpenIcon: React.FC<NotePadOpenIconProps> = ({
  size = 64,
  className = "",
}) => {
  const coverAnimationState = useMysteryStore(
    (state) => state.coverAnimationState
  );
  const setCoverAnimationState = useMysteryStore(
    (state) => state.setCoverAnimationState
  );

  const isIdle = coverAnimationState === "closed";

  const glowConfig = useMemo(() => {
    const intensity = 0.6 + Math.random() * 0.6; // 0.6–1.2
    const blur = 8 + Math.random() * 10; // 8–18
    const scale = 0.95 + Math.random() * 0.15; // 0.95–1.1
    const hueShift = Math.random() > 0.5 ? 200 : 310; // blue or pink bias

    return { intensity, blur, scale, hueShift };
  }, []);

  const handleClick = () => {
    if (coverAnimationState === "closed") {
      setCoverAnimationState("opening");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center rounded-full border border-[#7ffcff]/40 bg-black/70 shadow-[0_0_25px_rgba(127,252,255,0.35)] hover:shadow-[0_0_40px_rgba(255,140,255,0.6)] transition-shadow duration-300 ${className}`}
      style={{
        width: size,
        height: size,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Outer pulsing aura */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0.4, scale: glowConfig.scale }}
        animate={{
          opacity: [0.4 * glowConfig.intensity, 0.9 * glowConfig.intensity, 0.4 * glowConfig.intensity],
          scale: [glowConfig.scale, glowConfig.scale + 0.08, glowConfig.scale],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(127,252,255,0.9), transparent 55%), radial-gradient(circle at 70% 80%, rgba(255,140,255,0.9), transparent 55%)",
          filter: `blur(${glowConfig.blur}px)`,
        }}
      />

      {/* Inner rotating halo */}
      <motion.div
        className="absolute inset-[18%] rounded-full border border-[#7ffcff]/60"
        animate={{
          rotate: [0, 360],
          boxShadow: [
            "0 0 12px rgba(127,252,255,0.4)",
            "0 0 18px rgba(255,140,255,0.7)",
            "0 0 12px rgba(127,252,255,0.4)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(127,252,255,0.2), rgba(255,140,255,0.5), rgba(127,252,255,0.2))",
        }}
      />

      {/* Question mark sigil */}
      <motion.span
        className="relative z-10 select-none font-semibold"
        style={{
          fontSize: size * 0.55,
          textShadow:
            "0 0 8px rgba(127,252,255,0.9), 0 0 14px rgba(255,140,255,0.9)",
          filter: `hue-rotate(${glowConfig.hueShift}deg)`,
        }}
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={
          isIdle
            ? {
                scale: [0.9, 1.05, 0.9],
                opacity: [0.8, 1, 0.8],
              }
            : {
                scale: [1, 1.15, 0.95, 1.05, 1],
                opacity
