import React from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "../state/useThemeStore";
import { ThemeSystem } from "../systems/themeSystem";

interface CoverTemplateRendererProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const CoverTemplateRenderer: React.FC<CoverTemplateRendererProps> = ({
  onClick,
  children,
  className = "",
}) => {
  const { themeId } = useThemeStore();
  const theme = ThemeSystem.getTheme(themeId);

  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer rounded-xl p-10 border ${theme.containerClass} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <motion.div
          className={`absolute -inset-16 bg-gradient-radial ${theme.auraClass}`}
          initial={{ opacity: 0.15, scale: 0.9 }}
          animate={{
            opacity: [0.15, 0.3, 0.2],
            scale: [0.95, 1.05, 1.0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ filter: "blur(40px)" }}
        />
      </div>

      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ boxShadow: "0 0 0px rgba(0,0,0,0)" }}
        animate={{
          boxShadow: [
            `0 0 40px ${theme.glowColor}`,
            `0 0 70px ${theme.glowColor}`,
            `0 0 50px ${theme.glowColor}`,
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
