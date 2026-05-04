import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDeckStore = create(
  persist(
    (set, get) => ({
      // Ordered active queue - localStorage only, not synced to Supabase
      queue: {},
      // Card progress - persisted in localStorage and eventually Supabase
      // {
      //   [categoryId]: {
      //     [cardId]: { status: 'active' | 'done', updatedAt: timestamp }
      //   }
      // }
      progress: {},

      // Initializes cards for a category, respecting already persisted state
      setCards: (cards, categoryId) => set((state) => {
        const existing = state.progress[categoryId] || {};

        // Build progress respecting existing state
        const updatedProgress = {};
        cards.forEach((card) => {
          updatedProgress[card.id] = existing[card.id] || {
            status: 'active',
            updatedAt: Date.now(),
          };
        });

        // Build queue from cards not already done, preserving original order
        const activeQueue = cards
          .map(c => c.id)
          .filter(id => updatedProgress[id].status === 'active');

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

      // Moves a card to done or back to end of active queue
      moveCard: (cardId, target, categoryId) =>
        set((state) => {
          const currentQueue = state.queue[categoryId] || [];

          // Update progress with new status and timestamp
          const updatedProgress = {
            ...state.progress[categoryId],
            [cardId]: {
              status: target,
              updatedAt: Date.now(),
            }
          };

          // Update queue - remove from current position, reinsert at end if active
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

      // Returns active card IDs in queue order for a category
      getActive: (categoryId) => {
        return get().queue[categoryId] || [];
      },

      // Returns done card IDs for a category
      getDone: (categoryId) => {
        const category = get().progress[categoryId] || {};
        return Object.entries(category)
          .filter(([_, card]) => card.status === 'done')
          .map(([id]) => id);
      },

      // Explicitly resets all cards to active for a category - triggered by user restart
      // Todo: add a button next to done to trigger this
      resetDeck: (categoryId) => set((state) => {
        const category = state.progress[categoryId] || {};

        // Reset all statuses to active with fresh timestamp
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
            [categoryId]: Object.keys(category),
          }
        };
      }),
    }),
    {
      name: 'deck-progress',
      // Only persist progress to localStorage, not the queue
      partialize: (state) => ({ progress: state.progress }),
    }
  )
);

export default useDeckStore;