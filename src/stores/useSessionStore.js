//boilerplate
const useSessionStore = create(
  persist((set) => ({
    user: null,
    session: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null, session: null }),
  }), { name: 'session' })
);