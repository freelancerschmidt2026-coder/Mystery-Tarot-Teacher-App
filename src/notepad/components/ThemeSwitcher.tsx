import React from "react";
import { motion } from "framer-motion";

import { notebookThemes, NotebookThemeId } from "../systems/themeSystem";
import { useThemeStore } from "../state/useThemeStore";

export const ThemeSwitcher: React.FC = () => {
  const { themeId, setTheme } = useThemeStore();

  return (
    <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/10">
      <h2 className="text-lg font-semibold mb-3">Notebook Theme</h2>

      <div className="flex flex-wrap gap-3">
        {notebookThemes.map((theme) => {
          const isActive = theme.id === themeId;

          return (
            <motion.button
              key={theme.id}
              onClick={() => setTheme(theme.id as NotebookThemeId)}
              className={`px-4 py-2 rounded-md border text-sm ${
                isActive
                  ? "border-[#7ffcff] bg-black/60 text-white"
                  : "border-white/20 text-white/70 hover:bg-black/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
