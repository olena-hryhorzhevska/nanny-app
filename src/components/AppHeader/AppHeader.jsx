import { Link, NavLink } from "react-router-dom";
import styles from "./AppHeader.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function AppHeader({ user, onOpenLogin, onOpenRegister }) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const getLinkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <div className={`${styles.container} container`}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            Nanny.Services
          </Link>
          <nav className={styles.nav}>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="/nannies" className={getLinkClass}>
              Nannies
            </NavLink>
            <NavLink to="/favorites" className={getLinkClass}>
              Favorites
            </NavLink>
          </nav>
          <div className={styles.right}>
            {user ? (
              <>
                <div className={styles.user}>
                  <div className={styles["white-square"]}>
                    <svg width="24" height="24">
                      <use href="/src/assets/icons.svg#icon-user" />
                    </svg>
                  </div>
                  <span className={styles.userName}>
                    {user.displayName || user.email}
                  </span>
                </div>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <div className={styles.btns}>
                <button className={styles.navBtn} onClick={onOpenLogin}>
                  Log in
                </button>
                <button
                  className={`${styles.navBtn} ${styles.whiteBtn}`}
                  onClick={onOpenRegister}
                >
                  Registration
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
