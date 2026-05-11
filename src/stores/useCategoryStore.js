import { create } from 'zustand';
import { getCategories } from '../services/deckService';

const useCategoryStore = create((set, get) => ({
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  error: null,

  fetchIfNeeded: async () => {
    if (get().status !== 'idle') return;

    set({ status: 'loading' });
    try {
      const data = await getCategories();
      set({ categories: data, status: 'success' });
    } catch (err) {
      set({ error: err.message, status: 'error' });
    }
  },
}));

export default useCategoryStore;