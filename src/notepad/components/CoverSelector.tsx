import React from "react";
import { motion } from "framer-motion";
import { useMysteryStore } from "../../state/useMysteryStore";
import { coverTemplates } from "../templates/coverTemplates";

export const CoverSelector: React.FC = () => {
  const selectedCoverTemplate = useMysteryStore(
    (s) => s.selectedCoverTemplate
  );
  const setSelectedCoverTemplate = useMysteryStore(
    (s) => s.setSelectedCoverTemplate
  );

  return (
    <div className="w-full mt-6">
      <h3 className="text-white text-lg font-semibold mb-3">
        Choose Your Cover
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {coverTemplates.map((template) => {
          const isSelected = template.id === selectedCoverTemplate;

          return (
            <motion.button
              key={template.id}
              onClick={() => setSelectedCoverTemplate(template.id)}
              className={`relative rounded-lg p-4 text-left border transition-all ${
                isSelected
                  ? "border-[#7ffcff] shadow-[0_0_20px_rgba(127,252,255,0.5)]"
                  : "border-white/20 hover:border-[#7ffcff]/40"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className={`h-20 rounded-md mb-2 ${template.className}`}
              />

              <p className="text-white text-sm opacity-90">
                {template.name}
              </p>

              {isSelected && (
                <motion.div
                  className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#7ffcff]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
