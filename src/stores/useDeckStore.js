import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDeckStore = create(
  persist(
    (set, get) => ({
      // Ordered active queue - kept in memory only, rebuilt from progress on page load
      queue: {},
      // Card progress - saved in localStorage
      // {
      //   [categoryId]: {
      //     [cardId]: { status: 'active' | 'done', updatedAt: timestamp }
      //   }
      // }
      progress: {},

      setCards: (cards, categoryId) => set((state) => {
        const existing = state.progress[categoryId] || {};

        const updatedProgress = {};
        cards.forEach((card) => {
          updatedProgress[card.id] = existing[card.id] || {
            status: 'active',
            updatedAt: Date.now(),
          };
        });

        // Build queue from cards that are not finished, in randomized order
        const activeQueue = cards
          .map(c => c.id)
          .filter(id => updatedProgress[id].status === 'active')
          .sort(() => Math.random() - 0.5);

        return {
          progress: {
            ...state.progress,
            [categoryId]: updatedProgress,
          },
          queue: {
            ...state.queue,
            [categoryId]: activeQueue,
          }
        };
      }),

      // Moves a card to 'done' or places it back at the end of the active queue
      moveCard: (cardId, target, categoryId) =>
        set((state) => {
          const currentQueue = state.queue[categoryId] || [];

          const updatedProgress = {
            ...state.progress[categoryId],
            [cardId]: {
              status: target,
              updatedAt: Date.now(),
            }
          };

          const filteredQueue = currentQueue.filter(id => id !== cardId);
          const updatedQueue = target === 'active'
            ? [...filteredQueue, cardId]
            : filteredQueue;

          return {
            progress: {
              ...state.progress,
              [categoryId]: updatedProgress,
            },
            queue: {
              ...state.queue,
              [categoryId]: updatedQueue,
            }
          };
        }),

      getActive: (categoryId) => {
        return get().queue[categoryId] || [];
      },

      getDone: (categoryId) => {
        const category = get().progress[categoryId] || {};
        return Object.entries(category)
          .filter(([_, card]) => card.status === 'done')
          .map(([id]) => id);
      },

      resetDeck: (categoryId) => set((state) => {
        const category = state.progress[categoryId] || {};

     
        const resetProgress = {};
        Object.keys(category).forEach(cardId => {
          resetProgress[cardId] = { status: 'active', updatedAt: Date.now() };
        });

        return {
          progress: {
            ...state.progress,
            [categoryId]: resetProgress,
          },
          queue: {
            ...state.queue,
            [categoryId]: Object.keys(category).sort(() => Math.random() - 0.5),
          }
        };
      }),
    }),
    {
      name: 'deck-progress',
      partialize: (state) => ({ progress: state.progress }),
    }
  )
);

export default useDeckStore;