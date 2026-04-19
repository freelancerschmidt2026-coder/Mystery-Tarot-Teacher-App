import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CoverTemplateRenderer } from "../components/CoverTemplateRenderer";
import { CoverSelector } from "../components/CoverSelector";
import { NotebookShell } from "../NotebookShell";

export const NotePadThreshold: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNotebook = () => setIsOpen(true);
  const closeNotebook = () => setIsOpen(false);

  return (
    <div className="p-10 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mystery NotePad</h1>

      {!isOpen && (
        <div className="space-y-6">
          <CoverTemplateRenderer onClick={openNotebook}>
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-2xl font-semibold">Your Notebook</h2>
              <p className="opacity-80">
                Click to open the interior and begin your ritual.
              </p>
            </div>
          </CoverTemplateRenderer>

          <CoverSelector />
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="notebook-shell"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Notebook Interior</h2>
              <button
                onClick={closeNotebook}
                className="px-3 py-1 rounded-md border border-white/30 hover:bg-white/10"
              >
                Close Notebook
              </button>
            </div>

            <NotebookShell />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
