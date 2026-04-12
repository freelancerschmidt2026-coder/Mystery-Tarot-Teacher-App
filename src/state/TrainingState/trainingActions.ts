import { useTrainingStore } from './trainingStore';

export const trainingActions = {
  updateMastery: (val: number) => {
    useTrainingStore.getState().setMastery(val);
  }
};
