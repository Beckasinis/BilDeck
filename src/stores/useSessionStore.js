import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useSessionStore = create(
  persist((set) => ({
    user: null,
    session: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null, session: null }),
  }), { name: 'session' })
);

export default useSessionStore