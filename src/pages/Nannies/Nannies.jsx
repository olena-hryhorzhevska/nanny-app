import AppHeader from "../../components/AppHeader/AppHeader";
import { useState, useEffect } from "react";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import RegistrationModal from "../../components/RegistrationModal/RegistrationModal.jsx";
import { useAuthUser } from "../../hooks/useAuthUser.js";
import {
  ref,
  get,
  query,
  orderByChild,
  startAt,
  endAt,
  limitToLast,
} from "firebase/database";
import { db } from "../../firebase/firebase";
import NannyCard from "../../components/NannyCard/NannyCard.jsx";
import styles from "./Nannies.module.css";
import FiltersDropdown from "../../components/FiltersDropdown/FiltersDropdown.jsx";

export default function Nannies() {
  const { user, loading } = useAuthUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [filter, setFilter] = useState("A_TO_Z");
  const [nannies, setNannies] = useState([]);
  const [nanniesLoading, setNanniesLoading] = useState(true);

  useEffect(() => {
    const fetchNannies = async () => {
      setNanniesLoading(true);

      try {
        const nanniesRef = ref(db, "nannies");
        let q;

        switch (filter) {
          case "A_TO_Z":
            q = query(nanniesRef, orderByChild("name"));
            break;

          case "Z_TO_A":
            q = query(nanniesRef, orderByChild("name"), limitToLast(9999));
            break;

          case "PRICE_LT_10":
            q = query(nanniesRef, orderByChild("price_per_hour"), endAt(9.99));
            break;

          case "PRICE_GT_10":
            q = query(
              nanniesRef,
              orderByChild("price_per_hour"),
              startAt(10.01)
            );
            break;

          case "POPULAR":
            q = query(nanniesRef, orderByChild("rating"), limitToLast(9999));
            break;

          case "NOT_POPULAR":
            q = query(nanniesRef, orderByChild("rating"));
            break;

          case "SHOW_ALL":
            q = query(nanniesRef, orderByChild("name"));
            break;

          default:
            q = query(nanniesRef, orderByChild("name"));
        }

        const snap = await get(q);

        if (!snap.exists()) {
          setNannies([]);
          return;
        }

        const data = snap.val();
        let list = Object.entries(data).map(([id, nanny]) => ({
          id,
          ...nanny,
        }));

        if (filter === "Z_TO_A" || filter === "POPULAR") {
          list = list.reverse();
        }

        setNannies(list);
      } catch (e) {
        console.log(e);
        setNannies([]);
      } finally {
        setNanniesLoading(false);
      }
    };

    fetchNannies();
  }, [filter]);

  if (loading) return null;

  return (
    <div>
      <AppHeader
        user={user}
        onOpenLogin={() => {
          setIsLoginOpen(true);
        }}
        onOpenRegister={() => {
          setIsRegisterOpen(true);
        }}
      />
      <section className={styles.nanniesPage}>
        <div className={styles.filtersRow}>
          <FiltersDropdown value={filter} onChange={setFilter} />
        </div>
        {nanniesLoading ? (
          <p>Loading nannies…</p>
        ) : (
          <div className={styles.list}>
            {nannies.map((nanny) => (
              <NannyCard key={nanny.id} nanny={nanny} />
            ))}
          </div>
        )}
      </section>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
