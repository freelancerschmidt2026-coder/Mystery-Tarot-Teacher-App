import { create } from "zustand";
import { NotebookThemeId } from "../systems/themeSystem";

interface ThemeState {
  themeId: NotebookThemeId;
  setTheme: (id: NotebookThemeId) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeId: "void",
  setTheme: (id) => set({ themeId: id }),
}));
