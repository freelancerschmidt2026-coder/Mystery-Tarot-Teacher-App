import { NotebookPage } from "../pages/PageSystem";

export const SaveSystem = {
  savePages(pages: NotebookPage[]) {
    localStorage.setItem("mystery-notepad-pages", JSON.stringify(pages));
  },

  loadPages(): NotebookPage[] {
    const raw = localStorage.getItem("mystery-notepad-pages");
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },
};
