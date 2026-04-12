import { useNotePadStore } from './notePadStore';
import { NoteEntry } from '../../types';

export const notePadActions = {
  saveNote: (note: Partial<NoteEntry> & { title: string; content: string; category: string }) => {
    const newNote: NoteEntry = {
      id: note.id || `note_${Date.now()}`,
      title: note.title,
      content: note.content,
      category: note.category,
      createdAt: note.createdAt || new Date().toISOString(),
      pageNumber: note.pageNumber || 0, // Will be assigned by store if 0
      templateId: note.templateId
    };
    useNotePadStore.getState().addNote(newNote);
  },
  removeNote: (id: string) => useNotePadStore.getState().deleteNote(id)
};
