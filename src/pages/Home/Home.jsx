import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import PageLayout from "../../components/PageLayout.jsx";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import { useState } from "react";
import RegistrationModal from "../../components/RegistrationModal/RegistrationModal.jsx";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  const handleLoginSubmit = (data) => {
    console.log("Login form data:", data);
    // сюда позже добавим firebase login
    // closeLogin();
  };

  const handleRegisterSubmit = (data) => {
    console.log("Registration form data:", data);
    // сюда позже добавим firebase registration
    // closeRegister();
  };

  return (
    <PageLayout>
      <section className={styles["hero-card"]}>
        <div className={`${styles["hero-left"]} section-inner`}>
          <header className={styles["hero-left-header"]}>
            <div className={styles["logo"]}>Nanny.Services</div>
          </header>

          <div className={styles["hero-left-body"]}>
            <h1>Make Life Easier for the Family:</h1>
            <p>Find Babysitters Online for All Occasions</p>
            <button className={styles["hero-btn"]}>Get started →</button>
          </div>
        </div>

        <div className={`${styles["hero-right"]} section-inner`}>
          <header className={styles["hero-right-header"]}>
            <nav className={styles["hero-nav"]}>
              <div className={styles["nav-links"]}>
                <Link to="/">Home</Link>
                <Link to="/nannies">Nannies</Link>
              </div>

              <div className={styles["auth-buttons"]}>
                <button className={styles["nav-btn"]} onClick={openLogin}>
                  Log in
                </button>

                <button
                  className={`${styles["nav-btn"]} ${styles["nav-btn-primary"]}`}
                  onClick={openRegister}
                >
                  Registration
                </button>
              </div>
            </nav>
          </header>

          <div className={styles["hero-right-body"]}>
            <div className={styles["stats-card"]}>
              <div className={styles["red-square"]}>
                <svg width="30" height="30">
                  <use href="/src/assets/icons.svg#icon-check" />
                </svg>
              </div>

              <div className={styles["container-exp-nannies"]}>
                <p className={styles["exp-nannies"]}>Experienced nannies</p>
                <p className={styles["nannies-number"]}>15,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onSubmit={handleLoginSubmit}
      />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        onSubmit={handleRegisterSubmit}
      />
    </PageLayout>
  );
}
