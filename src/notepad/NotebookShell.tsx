import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { usePageStore } from "./state/usePageStore";

import { PageTabs } from "./components/PageTabs";
import { PageNavigation } from "./components/PageNavigation";
import { PageCreator } from "./components/PageCreator";
import { PageEditor } from "./components/PageEditor";
import { VoicePageCreator } from "./components/VoicePageCreator";

import { LunaPageGenerator } from "../engine/luna/pageGenerator";
import { LunaTarotPageGenerator } from "../engine/luna/tarotPageGenerator";

import { ExportSystem } from "./systems/exportSystem";
import { ThemeSystem, NotebookThemeId } from "./systems/themeSystem";

export const NotebookShell: React.FC = () => {
  const {
    pages,
    currentIndex,
    setCurrentIndex,
    addPage,
    updatePage,
    deletePage,
    loadFromStorage,
  } = usePageStore();

  const currentPage = pages[currentIndex];

  // THEME (static for now — dynamic switching comes next)
  const theme = ThemeSystem.getTheme("void" as NotebookThemeId);

  // Load saved pages on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Luna generators
  const generateLunaPage = () => {
    const page = LunaPageGenerator.generate();
    addPage(page);
  };

  const generateTarotPage = () => {
    const page = LunaTarotPageGenerator.generate({
      cardNames: ["The Moon", "The High Priestess"],
      spreadName: "Intuition Spread",
    });
    addPage(page);
  };

  // Export
  const exportNotebook = () => {
    const text = ExportSystem.toPlainText(pages);
    ExportSystem.downloadAsFile("mystery-notebook.txt", text);
  };

  return (
    <motion.div
      className={`p-10 max-w-3xl mx-auto rounded-xl border ${theme.containerClass}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className={`text-3xl font-bold mb-6 ${theme.accentClass}`}>
        Mystery NotePad
      </h1>

      {/* PAGE TABS */}
      <PageTabs
        pages={pages}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      {/* CURRENT PAGE */}
      {currentPage ? (
        <motion.div
          key={currentPage.id}
          className="p-6 rounded-xl bg-black/40 border border-white/10 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold mb-3">
            {currentPage.title}
          </h2>
          <p className="opacity-80 whitespace-pre-line">
            {currentPage.content}
          </p>
        </motion.div>
      ) : (
        <p className="opacity-60">No pages yet. Create one below.</p>
      )}

      {/* NAVIGATION */}
      {pages.length > 0 && (
        <PageNavigation
          pages={pages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}

      {/* EDITOR */}
      {currentPage && (
        <PageEditor
          page={currentPage}
          onUpdate={(data) => updatePage(currentPage.id, data)}
          onDelete={() => deletePage(currentPage.id)}
        />
      )}

      {/* CREATE PAGE */}
      <PageCreator onCreate={addPage} />

      {/* VOICE PAGE CREATOR */}
      <VoicePageCreator onCreate={addPage} />

      {/* LUNA BUTTONS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={generateLunaPage}
          className="px-4 py-2 rounded-md border border-[#7ffcff]/40 hover:bg-[#7ffcff]/10"
        >
          Generate Luna Page
        </button>

        <button
          onClick={generateTarotPage}
          className="px-4 py-2 rounded-md border border-[#ff8cff]/40 hover:bg-[#ff8cff]/10"
        >
          Generate Tarot Page
        </button>
      </div>

      {/* EXPORT */}
      <button
        onClick={exportNotebook}
        className="mt-6 px-4 py-2 rounded-md border border-green-400/40 hover:bg-green-400/10"
      >
        Export Notebook
      </button>
    </motion.div>
  );
};
