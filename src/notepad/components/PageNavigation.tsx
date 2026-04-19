import React from "react";
import { motion } from "framer-motion";
import { NotebookPage } from "../pages/PageSystem";

interface PageNavigationProps {
  pages: NotebookPage[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  pages,
  currentIndex,
  setCurrentIndex,
}) => {
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < pages.length - 1;

  return (
    <div className="flex justify-between mt-6">
      <motion.button
        disabled={!hasPrev}
        onClick={() => setCurrentIndex(currentIndex - 1)}
        className={`px-4 py-2 rounded-md border ${
          hasPrev
            ? "border-[#7ffcff]/40 text-white hover:bg-[#7ffcff]/10"
            : "border-white/10 text-white/30 cursor-not-allowed"
        }`}
        whileHover={hasPrev ? { scale: 1.05 } : {}}
        whileTap={hasPrev ? { scale: 0.95 } : {}}
      >
        ← Previous
      </motion.button>

      <motion.button
        disabled={!hasNext}
        onClick={() => setCurrentIndex(currentIndex + 1)}
        className={`px-4 py-2 rounded-md border ${
          hasNext
            ? "border-[#7ffcff]/40 text-white hover:bg-[#7ffcff]/10"
            : "border-white/10 text-white/30 cursor-not-allowed"
        }`}
        whileHover={hasNext ? { scale: 1.05 } : {}}
        whileTap={hasNext ? { scale: 0.95 } : {}}
      >
        Next →
      </motion.button>
    </div>
  );
};
