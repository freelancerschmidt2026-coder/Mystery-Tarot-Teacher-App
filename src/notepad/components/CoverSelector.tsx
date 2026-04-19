import React from "react";
import { useThemeStore } from "../state/useThemeStore";
import { notebookThemes, NotebookThemeId } from "../systems/themeSystem";

export const CoverSelector: React.FC = () => {
  const { themeId, setTheme } = useThemeStore();

  return (
    <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/10">
      <h2 className="text-lg font-semibold mb-3">Cover Theme</h2>

      <div className="flex flex-wrap gap-3">
        {notebookThemes.map((theme) => {
          const isActive = theme.id === themeId;

          return (
            <button
              key={theme.id}
              onClick={() => setTheme(theme.id as NotebookThemeId)}
              className={`px-4 py-2 rounded-md border text-sm ${
                isActive
                  ? "border-[#7ffcff] bg-black/60 text-white"
                  : "border-white/20 text-white/70 hover:bg-black/50"
              }`}
            >
              {theme.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
