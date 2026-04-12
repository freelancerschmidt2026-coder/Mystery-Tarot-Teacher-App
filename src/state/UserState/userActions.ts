import { userStore } from './userStore';

export const userActions = {
  login: (id: string, email: string) => {
    userStore.getState().setUserId(id);
    userStore.getState().setEmail(email);
  },
  logout: () => {
    userStore.getState().setUserId(null);
    userStore.getState().setEmail(null);
    userStore.getState().setUser(null);
  },
  setUser: (user: { name: string; level: number } | null) => {
    userStore.getState().setUser(user);
  }
};
