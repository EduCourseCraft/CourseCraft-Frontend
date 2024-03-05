import create from "zustand";

const useUserStore = create((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set(isAuthenticated),
  userData: null,
  setUserData: (userData) => set({ userData }),
}));

export default useUserStore;