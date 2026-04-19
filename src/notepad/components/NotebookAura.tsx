import React from "react";
import { motion } from "framer-motion";
import { NotebookTheme } from "../systems/themeSystem";

interface NotebookAuraProps {
  theme: NotebookTheme;
}

export const NotebookAura: React.FC<NotebookAuraProps> = ({ theme }) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
      <motion.div
        className={`absolute -inset-16 bg-gradient-radial ${theme.auraClass}`}
        initial={{ opacity: 0.0, scale: 0.9 }}
        animate={{
          opacity: [0.25, 0.45, 0.3],
          scale: [0.95, 1.05, 1.0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{
          filter: "blur(32px)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ boxShadow: "0 0 0px rgba(0,0,0,0)" }}
        animate={{
          boxShadow: [
            `0 0 40px ${theme.glowColor}`,
            `0 0 70px ${theme.glowColor}`,
            `0 0 50px ${theme.glowColor}`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
