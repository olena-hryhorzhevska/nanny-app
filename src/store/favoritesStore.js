import { create } from "zustand";

export const useFavoritesStore = create((set, get) => ({
  favoriteIds: [],

  setFavorites: (ids) => set({ favoriteIds: ids }),

  clearFavorites: () => set({ favoriteIds: [] }),

  isFavorite: (id) => get().favoriteIds.includes(id),

  addLocal: (id) =>
    set((state) =>
      state.favoriteIds.includes(id)
        ? state
        : { favoriteIds: [...state.favoriteIds, id] }
    ),

  removeLocal: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.filter((x) => x !== id),
    })),
}));
