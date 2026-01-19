import { useEffect } from "react";
import { subscribeFavorites } from "../firebase/favoritesApi";
import { useFavoritesStore } from "../store/favoritesStore";

export function useFavoritesSync(user) {
  const setFavorites = useFavoritesStore((s) => s.setFavorites);
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);

  useEffect(() => {
    if (!user) {
      clearFavorites();
      return;
    }
    const unsubscribe = subscribeFavorites(user.uid, (ids) => {
      setFavorites(ids);
    });

    return unsubscribe;
  }, [user, setFavorites, clearFavorites]);
}
