//boilerplate
const useDeckStore = create(
  persist(
    (set) => ({
      cards: [],
      piles: { known: [], unknown: [] },
      lastSynced: null,
      moveCard: (cardId, pile) =>
        set((state) => ({
          piles: {
            ...state.piles,
            [pile]: [...state.piles[pile], cardId],
          },
        })),
      setDeck: (cards) => set({ cards, lastSynced: Date.now() }),
    }),
    { name: 'deck' }
  )
);