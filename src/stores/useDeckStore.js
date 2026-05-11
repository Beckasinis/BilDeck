import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDeckStore = create(
  persist(
    (set, get) => ({
      // Ordered active queue - hålls bara i minnet, byggs om från progress vid sidladdning
      // Todo: synkronisera progress till Supabase
      queue: {},
      // Kortprogress - sparas i localStorage
      // {
      //   [categoryId]: {
      //     [cardId]: { status: 'active' | 'done', updatedAt: timestamp }
      //   }
      // }
      progress: {},

      // Initialiserar kort för en kategori med hänsyn till redan sparad progress
      // Blandar kön slumpmässigt vid varje ny session
      setCards: (cards, categoryId) => set((state) => {
        const existing = state.progress[categoryId] || {};

        // Bygg progress med befintlig status om den finns, annars sätt 'active'
        const updatedProgress = {};
        cards.forEach((card) => {
          updatedProgress[card.id] = existing[card.id] || {
            status: 'active',
            updatedAt: Date.now(),
          };
        });

        // Bygg kö från kort som inte är klara, i slumpad ordning
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

      // Flyttar ett kort till 'done' eller lägger tillbaka det sist i aktiv kö
      moveCard: (cardId, target, categoryId) =>
        set((state) => {
          const currentQueue = state.queue[categoryId] || [];

          // Uppdatera progress med ny status och tidsstämpel
          const updatedProgress = {
            ...state.progress[categoryId],
            [cardId]: {
              status: target,
              updatedAt: Date.now(),
            }
          };

          // Ta bort kortet från nuvarande position, lägg sist om det fortfarande är aktivt
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

      // Returnerar aktiva kort-ID:n i köordning för en kategori
      getActive: (categoryId) => {
        return get().queue[categoryId] || [];
      },

      // Returnerar klara kort-ID:n för en kategori
      getDone: (categoryId) => {
        const category = get().progress[categoryId] || {};
        return Object.entries(category)
          .filter(([_, card]) => card.status === 'done')
          .map(([id]) => id);
      },

      // Återställer alla kort till 'active' för en kategori - triggas när spelaren klarar hela leken
      // eller via "Starta om"-knappen. Blandar kön slumpmässigt vid återstart.
      resetDeck: (categoryId) => set((state) => {
        const category = state.progress[categoryId] || {};

        // Sätt alla kort till 'active' med ny tidsstämpel
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
      // Spara bara progress till localStorage, inte kön (den byggs om vid sidladdning)
      partialize: (state) => ({ progress: state.progress }),
    }
  )
);

export default useDeckStore;