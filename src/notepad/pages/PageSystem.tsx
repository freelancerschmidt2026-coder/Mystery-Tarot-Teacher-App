import React from "react";
import { motion } from "framer-motion";

export interface NotebookPage {
  id: string;
  title: string;
  content: string;
}

const defaultPages: NotebookPage[] = [
  {
    id: "welcome",
    title: "Welcome Page",
    content:
      "This is your first page. Soon, Luna will help you create spreads, rituals, and guided notes.",
  },
];

export const PageSystem: React.FC = () => {
  return (
    <motion.div
      className="p-8 rounded-xl bg-black/60 border border-[#7ffcff]/30 text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-2xl font-bold mb-4">Notebook Pages</h1>

      {defaultPages.map((page) => (
        <div key={page.id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
          <p className="opacity-80">{page.content}</p>
        </div>
      ))}
    </motion.div>
  );
};
