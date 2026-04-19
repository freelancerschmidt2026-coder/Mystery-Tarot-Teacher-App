import { create } from "zustand";
import { NotebookPage } from "../pages/PageSystem";
import { SaveSystem } from "../systems/saveSystem";

interface PageState {
  pages: NotebookPage[];
  currentIndex: number;
  setPages: (pages: NotebookPage[]) => void;
  addPage: (page: NotebookPage) => void;
  updatePage: (id: string, data: Partial<NotebookPage>) => void;
  deletePage: (id: string) => void;
  setCurrentIndex: (index: number) => void;
  loadFromStorage: () => void;
}

export const usePageStore = create<PageState>((set, get) => ({
  pages: [],
  currentIndex: 0,

  setPages: (pages) => {
    SaveSystem.savePages(pages);
    set({ pages });
  },

  addPage: (page) => {
    const pages = [...get().pages, page];
    SaveSystem.savePages(pages);
    set({ pages, currentIndex: pages.length - 1 });
  },

  updatePage: (id, data) => {
    const pages = get().pages.map((p) =>
      p.id === id ? { ...p, ...data } : p
    );
    SaveSystem.savePages(pages);
    set({ pages });
  },

  deletePage: (id) => {
    const pages = get().pages.filter((p) => p.id !== id);
    const newIndex = Math.max(0, Math.min(get().currentIndex, pages.length - 1));
    SaveSystem.savePages(pages);
    set({ pages, currentIndex: newIndex });
  },

  setCurrentIndex: (index) => set({ currentIndex: index }),

  loadFromStorage: () => {
    const loaded = SaveSystem.loadPages();
    if (loaded.length === 0) return;
    set({ pages: loaded, currentIndex: 0 });
  },
}));
