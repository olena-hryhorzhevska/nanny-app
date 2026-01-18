import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      isFavorite: (id) => get().favorites.some((n) => n.id === id),

      toggleFavorite: (nanny) =>
        set((state) => {
          const exists = state.favorites.some((n) => n.id === nanny.id);
          return {
            favorites: exists
              ? state.favorites.filter((n) => n.id !== nanny.id)
              : [...state.favorites, nanny],
          };
        }),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((n) => n.id !== id),
        })),

      clearFavorites: () => set({ favorites: [] }),
    }),
    { name: "favorites-store" }
  )
);
