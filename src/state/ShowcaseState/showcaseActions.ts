import { useShowcaseStore } from './showcaseStore';

export const showcaseActions = {
  unlock: (id: string) => useShowcaseStore.getState().addAchievement(id)
};
