import React from "react";
import { motion } from "framer-motion";
import { coverTemplates } from "../templates/coverTemplates";
import { useMysteryStore } from "../../state/useMysteryStore";

const TemplateMarketplace: React.FC = () => {
  const selectedCoverTemplate = useMysteryStore(
    (s) => s.selectedCoverTemplate
  );
  const setSelectedCoverTemplate = useMysteryStore(
    (s) => s.setSelectedCoverTemplate
  );

  return (
    <motion.div
      className="p-8 text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold mb-6">Template Marketplace</h1>

      <p className="opacity-80 mb-6">
        Choose from a growing library of magical notebook covers. Premium,
        animated, and Luna‑generated covers will appear here soon.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {coverTemplates.map((template) => {
          const isSelected = template.id === selectedCoverTemplate;

          return (
            <motion.div
              key={template.id}
              className={`rounded-xl p-4 border ${
                isSelected
                  ? "border-[#7ffcff] shadow-[0_0_25px_rgba(127,252,255,0.5)]"
                  : "border-white/20"
              }`}
              whileHover={{ scale: 1.03 }}
            >
              <div className={`h-24 rounded-lg mb-3 ${template.className}`} />

              <h3 className="text-lg font-semibold">{template.name}</h3>

              <button
                onClick={() => setSelectedCoverTemplate(template.id)}
                className="mt-3 px-4 py-2 rounded-md bg-[#7ffcff]/20 border border-[#7ffcff]/40 hover:bg-[#7ffcff]/30 transition-all"
              >
                {isSelected ? "Selected" : "Select"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TemplateMarketplace;
