import React from "react";
import { motion } from "framer-motion";
import { NotebookPage } from "../pages/PageSystem";

interface PageTabsProps {
  pages: NotebookPage[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const PageTabs: React.FC<PageTabsProps> = ({
  pages,
  currentIndex,
  setCurrentIndex,
}) => {
  if (pages.length === 0) return null;

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      {pages.map((page, index) => {
        const isActive = index === currentIndex;

        return (
          <motion.button
            key={page.id}
            onClick={() => setCurrentIndex(index)}
            className={`px-3 py-1 rounded-t-md border-b-2 text-sm whitespace-nowrap ${
              isActive
                ? "border-[#7ffcff] bg-black/60 text-white"
                : "border-transparent bg-black/30 text-white/70 hover:bg-black/50"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            {page.title || "Untitled"}
          </motion.button>
        );
      })}
    </div>
  );
};
