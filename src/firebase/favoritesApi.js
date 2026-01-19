import { ref, set, remove, onValue, off, get } from "firebase/database";
import { db } from "../firebase/firebase.js";

export function addFavorite(uid, nannyId) {
  return set(ref(db, `favorites/${uid}/${nannyId}`), true);
}

export function removeFavorite(uid, nannyId) {
  return remove(ref(db, `favorites/${uid}/${nannyId}`));
}

export function subscribeFavorites(uid, callback) {
  const r = ref(db, `favorites/${uid}`);

  const handler = (snap) => {
    const val = snap.val() || {};
    const ids = Object.keys(val);
    callback(ids);
  };

  onValue(r, handler);

  return () => off(r, "value", handler);
}

export async function fetchFavoritesOnce(uid) {
  const snap = await get(ref(db, `favorites/${uid}`));
  const val = snap.val() || {};
  return Object.keys(val);
}
