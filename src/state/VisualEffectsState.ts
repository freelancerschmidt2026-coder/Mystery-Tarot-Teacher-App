import { create } from 'zustand';

interface VisualEffectsState {
  visualEffectsEnabled: boolean;
  toggleVisualEffects: () => void;
}

export const useVisualEffectsState = create<VisualEffectsState>((set) => ({
  visualEffectsEnabled: true,
  toggleVisualEffects: () => set((state) => ({ visualEffectsEnabled: !state.visualEffectsEnabled })),
}));
