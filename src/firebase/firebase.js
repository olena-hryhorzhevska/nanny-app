import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCy6x5nq0ZTazUxNB_khax86mkBsBqluwo",
  authDomain: "nanny-app-5249c.firebaseapp.com",
  databaseURL: "https://nanny-app-5249c-default-rtdb.firebaseio.com",
  projectId: "nanny-app-5249c",
  storageBucket: "nanny-app-5249c.firebasestorage.app",
  messagingSenderId: "470996786028",
  appId: "1:470996786028:web:f5eefd2119409dfb6f3149",
  measurementId: "G-SD46SFLYC7",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export let analytics = null;
isSupported().then((ok) => {
  if (ok) analytics = getAnalytics(app);
});
