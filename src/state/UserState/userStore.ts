import { create } from 'zustand';

export interface UserState {
  userId: string | null;
  email: string | null;
  user: { name: string; level: number } | null;
  setUserId: (id: string | null) => void;
  setEmail: (email: string | null) => void;
  setUser: (user: { name: string; level: number } | null) => void;
}

export const userStore = create<UserState>((set) => ({
  userId: null,
  email: null,
  user: null,
  setUserId: (id) => set({ userId: id }),
  setEmail: (email) => set({ email }),
  setUser: (user) => set({ user }),
}));

export const useUserStore = userStore;
