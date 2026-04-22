// src/engine/luna/NotepadIntegrationEngine.ts

export interface NotepadPage {
  pageId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface NotepadIndex {
  indexId: string;
  pages: NotepadPage[];
}

const STORAGE_KEY_NOTEPAD = "mystery_notepad";

function loadNotepad(): NotepadIndex {
  if (typeof window === "undefined") return { indexId: "notepad", pages: [] };
  const raw = localStorage.getItem(STORAGE_KEY_NOTEPAD);
  return raw ? JSON.parse(raw) : { indexId: "notepad", pages: [] };
}

function saveNotepad(index: NotepadIndex) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_NOTEPAD, JSON.stringify(index));
}

export const NotepadIntegrationEngine = {
  /**
   * Add a new page to the Notepad.
   */
  addPage(params: { title: string; content: string }): NotepadPage {
    const index = loadNotepad();

    const page: NotepadPage = {
      pageId: `page-${Date.now()}`,
      title: params.title,
      content: params.content,
      createdAt: new Date().toISOString()
    };

    index.pages.push(page);
    saveNotepad(index);

    return page;
  },

  /**
   * Get all pages.
   */
  getPages(): NotepadPage[] {
    return loadNotepad().pages;
  }
};

export default NotepadIntegrationEngine;
