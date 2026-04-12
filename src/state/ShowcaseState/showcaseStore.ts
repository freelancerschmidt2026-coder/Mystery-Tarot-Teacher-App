import { create } from 'zustand';

interface ShowcaseState {
  achievements: string[];
  addAchievement: (id: string) => void;
}

export const useShowcaseStore = create<ShowcaseState>((set) => ({
  achievements: [],
  addAchievement: (id) => set((state) => ({ 
    achievements: state.achievements.includes(id) ? state.achievements : [...state.achievements, id] 
  })),
}));
