// src/engine/luna/StudioUndoRedoEngine.ts

export interface UndoRedoState {
  undoStack: unknown[];
  redoStack: unknown[];
}

export const StudioUndoRedoEngine = {
  init(): UndoRedoState {
    return {
      undoStack: [],
      redoStack: []
    };
  },

  push(state: UndoRedoState, snapshot: unknown): UndoRedoState {
    return {
      undoStack: [...state.undoStack, snapshot],
      redoStack: []
    };
  },

  undo(state: UndoRedoState): { newState: UndoRedoState; snapshot: unknown | null } {
    if (state.undoStack.length === 0) {
      return { newState: state, snapshot: null };
    }

    const snapshot = state.undoStack[state.undoStack.length - 1];
    const newUndo = state.undoStack.slice(0, -1);

    return {
      newState: {
        undoStack: newUndo,
        redoStack: [...state.redoStack, snapshot]
      },
      snapshot
    };
  },

  redo(state: UndoRedoState): { newState: UndoRedoState; snapshot: unknown | null } {
    if (state.redoStack.length === 0) {
      return { newState: state, snapshot: null };
    }

    const snapshot = state.redoStack[state.redoStack.length - 1];
    const newRedo = state.redoStack.slice(0, -1);

    return {
      newState: {
        undoStack: [...state.undoStack, snapshot],
        redoStack: newRedo
      },
      snapshot
    };
  }
};

export default StudioUndoRedoEngine;
