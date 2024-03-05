import { create } from 'zustand'

export const userProfileStore = create((set) => ({
  userProfile: {},

  setUserProfile: (newUserProfile) => set(() => ({ userProfile: newUserProfile })),
}));
