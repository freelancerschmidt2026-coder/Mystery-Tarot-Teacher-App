// NotePadEngine.js
// Stores notes, drafts, and meeting-linked content

export const NotePadEngine = {
  notes: [],

  createNote({ userId, title, content }) {
    const note = {
      noteId: `note_${Date.now()}`,
      userId,
      title,
      content,
      createdAt: new Date().toISOString()
    };
    this.notes.push(note);
    return note;
  },

  updateNote(noteId, content) {
    const note = this.notes.find(n => n.noteId === noteId);
    if (!note) return null;

    note.content = content;
    note.updatedAt = new Date().toISOString();
    return note;
  },

  getNotes(userId) {
    return this.notes.filter(n => n.userId === userId);
  }
};
