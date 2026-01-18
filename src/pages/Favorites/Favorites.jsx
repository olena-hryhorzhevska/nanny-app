import AppHeader from "../../components/AppHeader/AppHeader";
import { useAuthUser } from "../../hooks/useAuthUser.js";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import RegistrationModal from "../../components/RegistrationModal/RegistrationModal.jsx";
import { useState, useEffect } from "react";
import { useFavoritesStore } from "../../store/favoritesStore";
import NannyCard from "../../components/NannyCard/NannyCard.jsx";
import styles from "../Nannies/Nannies.module.css";
import { useNavigate } from "react-router-dom";
import styless from "./Favorites.module.css";
import FiltersDropdown from "../../components/FiltersDropdown/FiltersDropdown.jsx";

export default function Favorites() {
  const { user, loading } = useAuthUser();
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [filter, setFilter] = useState("A_TO_Z");

  const favorites = useFavoritesStore((s) => s.favorites);
  const requireAuth = () => {
    if (user) return true;
    setIsLoginOpen(true);
    return false;
  };

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/nannies", { state: { openLogin: true } });
    }
  }, [user, loading, navigate]);

  if (loading) return null;
  if (!user) return null;

  function applyFilter(list, filter) {
    const arr = [...list]; 

    switch (filter) {
      case "A_TO_Z":
        return arr.sort((a, b) => a.name.localeCompare(b.name));

      case "Z_TO_A":
        return arr.sort((a, b) => b.name.localeCompare(a.name));

      case "PRICE_LT_10":
        return arr.filter((n) => n.price_per_hour < 10);

      case "PRICE_GT_10":
        return arr.filter((n) => n.price_per_hour > 10);

      case "POPULAR":
        return arr.sort((a, b) => b.rating - a.rating);

      case "NOT_POPULAR":
        return arr.sort((a, b) => a.rating - b.rating);

      case "SHOW_ALL":
        return arr;

      default:
        return arr;
    }
  }

  const filteredFavorites = applyFilter(favorites, filter);

  return (
    <div>
      <AppHeader
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <section className={styles.nanniesPage}>
        {favorites.length === 0 ? (
          <div className={styless.emptyState}>
            <h2 className={styless.emptyTitle}>No favorites yet</h2>
            <p className={styless.emptyText}>
              Tap the heart on a nanny’s card to save them here.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.filtersRow}>
              <FiltersDropdown value={filter} onChange={setFilter} />
            </div>

            {filteredFavorites.length === 0 ? (
              <div className={styless.emptyState}>
                <h2 className={styless.emptyTitle}>No results</h2>
                <p className={styless.emptyText}>
                  Try changing the filter options.
                </p>
              </div>
            ) : (
              <div className={styles.list}>
                {filteredFavorites.map((nanny) => (
                  <NannyCard
                    key={nanny.id}
                    nanny={nanny}
                    requireAuth={requireAuth}
                  />
                ))}
              </div>
            )}
          </>
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
