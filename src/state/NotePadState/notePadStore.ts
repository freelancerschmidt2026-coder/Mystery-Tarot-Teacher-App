import { create } from 'zustand';
import { NoteEntry } from '../../types';

interface NotePadState {
  notes: NoteEntry[];
  addNote: (note: NoteEntry) => void;
  deleteNote: (id: string) => void;
}

export const useNotePadStore = create<NotePadState>((set) => ({
  notes: [],
  addNote: (note) => set((state) => {
    const nextPageNumber = state.notes.length > 0 
      ? Math.max(...state.notes.map(n => n.pageNumber)) + 1 
      : 2; // Page 1 is usually the Index
    return { notes: [{ ...note, pageNumber: note.pageNumber || nextPageNumber }, ...state.notes] };
  }),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter(n => n.id !== id) })),
}));
