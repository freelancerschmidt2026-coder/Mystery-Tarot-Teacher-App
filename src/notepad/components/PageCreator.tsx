import React, { useState } from "react";
import { motion } from "framer-motion";
import { NotebookPage } from "../pages/PageSystem";

interface PageCreatorProps {
  onCreate: (page: NotebookPage) => void;
}

export const PageCreator: React.FC<PageCreatorProps> = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPage = () => {
    if (!title.trim()) return;

    onCreate({
      id: `page-${Date.now()}`,
      title,
      content,
    });

    setTitle("");
    setContent("");
  };

  return (
    <motion.div
      className="p-6 rounded-xl bg-black/60 border border-[#7ffcff]/30 text-white mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-xl font-semibold mb-4">Create a New Page</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Page Title"
        className="w-full mb-3 p-2 rounded bg-black/40 border border-white/20 text-white"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Page Content"
        className="w-full mb-3 p-2 rounded bg-black/40 border border-white/20 text-white h-32"
      />

      <motion.button
        onClick={createPage}
        className="px-4 py-2 rounded-md border border-[#7ffcff]/40 hover:bg-[#7ffcff]/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Page
      </motion.button>
    </motion.div>
  );
};
