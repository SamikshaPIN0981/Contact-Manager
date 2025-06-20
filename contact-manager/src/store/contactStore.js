// src/stores/contactStore.js
import { create } from 'zustand';

const useContactStore = create((set) => ({
  search: '',
  showFavorites: false,
  selectedContactId: null,
  setSearch: (search) => set({ search }),
  setShowFavorites: (showFavorites) => set({ showFavorites }),
  setSelectedContactId: (id) => set({ selectedContactId: id }),
}));

export default useContactStore;
