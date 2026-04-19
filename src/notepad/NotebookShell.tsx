import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { usePageStore } from "./state/usePageStore";
import { useThemeStore } from "./state/useThemeStore";

import { PageTabs } from "./components/PageTabs";
import { PageNavigation } from "./components/PageNavigation";
import { PageCreator } from "./components/PageCreator";
import { PageEditor } from "./components/PageEditor";
import { VoicePageCreator } from "./components/VoicePageCreator";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { NotebookAura } from "./components/NotebookAura";

import { LunaPageGenerator } from "../engine/luna/pageGenerator";
import { LunaTarotPageGenerator } from "../engine/luna/tarotPageGenerator";

import { ExportSystem } from "./systems/exportSystem";
import { ThemeSystem } from "./systems/themeSystem";

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

  const { themeId } = useThemeStore();
  const theme = ThemeSystem.getTheme(themeId);

  const currentPage = pages[currentIndex];

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

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

  const exportNotebook = () => {
    const text = ExportSystem.toPlainText(pages);
    ExportSystem.downloadAsFile("mystery-notebook.txt", text);
  };

  return (
    <motion.div
      className="relative max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className={`relative p-10 rounded-xl border ${theme.containerClass}`}
      >
        <NotebookAura theme={theme} />

        <div className="relative z-10">
          <h1 className={`text-3xl font-bold mb-6 ${theme.accentClass}`}>
            Mystery NotePad
          </h1>

          <PageTabs
            pages={pages}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />

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

          {pages.length > 0 && (
            <PageNavigation
              pages={pages}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          )}

          {currentPage && (
            <PageEditor
              page={currentPage}
              onUpdate={(data) => updatePage(currentPage.id, data)}
              onDelete={() => deletePage(currentPage.id)}
            />
          )}

          <PageCreator onCreate={addPage} />
          <VoicePageCreator onCreate={addPage} />

          <ThemeSwitcher />

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

          <button
            onClick={exportNotebook}
            className="mt-6 px-4 py-2 rounded-md border border-green-400/40 hover:bg-green-400/10"
          >
            Export Notebook
          </button>
        </div>
      </div>
    </motion.div>
  );
};
