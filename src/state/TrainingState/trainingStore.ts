import { create } from 'zustand';

interface TrainingState {
  currentStride: string;
  mastery: number;
  setStride: (stride: string) => void;
  setMastery: (mastery: number) => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  currentStride: 'stride1',
  mastery: 0,
  setStride: (stride) => set({ currentStride: stride }),
  setMastery: (mastery) => set({ mastery }),
}));
