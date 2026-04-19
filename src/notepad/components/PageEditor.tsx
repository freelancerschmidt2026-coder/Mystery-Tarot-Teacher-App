import React from "react";
import { motion } from "framer-motion";
import { NotebookPage } from "../pages/PageSystem";

interface PageEditorProps {
  page: NotebookPage;
  onUpdate: (data: Partial<NotebookPage>) => void;
  onDelete: () => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({
  page,
  onUpdate,
  onDelete,
}) => {
  return (
    <motion.div
      className="p-6 rounded-xl bg-black/60 border border-[#7ffcff]/30 text-white mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4">Edit Page</h2>

      <input
        value={page.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        className="w-full mb-3 p-2 rounded bg-black/40 border border-white/20 text-white"
      />

      <textarea
        value={page.content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        className="w-full mb-3 p-2 rounded bg-black/40 border border-white/20 text-white h-32"
      />

      <div className="flex justify-between mt-2">
        <span className="text-xs opacity-60">
          ID: {page.id}
        </span>

        <motion.button
          onClick={onDelete}
          className="px-3 py-1 rounded-md border border-red-400/60 text-red-300 hover:bg-red-500/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Delete Page
        </motion.button>
      </div>
    </motion.div>
  );
};
