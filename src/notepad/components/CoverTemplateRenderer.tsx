import React from "react";
import { motion } from "framer-motion";
import { useMysteryStore } from "../../state/useMysteryStore";
import { coverTemplates } from "../templates/coverTemplates";

interface CoverTemplateRendererProps {
  children?: React.ReactNode;
  className?: string;
}

export const CoverTemplateRenderer: React.FC<CoverTemplateRendererProps> = ({
  children,
  className = "",
}) => {
  const selectedCoverTemplate = useMysteryStore(
    (s) => s.selectedCoverTemplate
  );

  const template =
    coverTemplates.find((t) => t.id === selectedCoverTemplate) ||
    coverTemplates[0];

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden ${template.className} ${className}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Template Glow Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 20px rgba(127,252,255,0.3)",
            "0 0 35px rgba(255,140,255,0.5)",
            "0 0 20px rgba(127,252,255,0.3)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Template Content */}
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
};
