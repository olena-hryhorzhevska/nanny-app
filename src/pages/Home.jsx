import { Link } from "react-router-dom";
import "./Home.css";
import PageLayout from "../components/PageLayout.jsx";
import "../assets/icons.svg";
import LoginModal from "../components/LoginModal.jsx";
import { useState } from "react";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const handleLoginSubmit = (data) => {
    console.log("Login form data:", data);
    // сюда позже добавим firebase login
    // closeLogin();
  };

  return (
    <PageLayout>
      <section className="hero-card">
        <div className="hero-left section-inner">
          <header className="hero-left-header">
            <div className="logo">Nanny.Services</div>
          </header>

          <div className="hero-left-body">
            <h1>Make Life Easier for the Family:</h1>
            <p>Find Babysitters Online for All Occasions</p>
            <button className="hero-btn">Get started →</button>
          </div>
        </div>

        <div className="hero-right section-inner">
          <header className="hero-right-header">
            <nav className="hero-nav">
              <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/nannies">Nannies</Link>
              </div>

              <div className="auth-buttons">
                <button className="nav-btn" onClick={openLogin}>Log in</button>
                <button className="nav-btn nav-btn-primary">
                  Registration
                </button>
              </div>
            </nav>
          </header>

          <div className="hero-right-body">
            <div className="stats-card">
              <div className="red-square">
                <svg width="30" height="30">
                  <use href="/src/assets/icons.svg#icon-check" />
                </svg>
              </div>
              <div className="container-exp-nannies">
                <p className="exp-nannies">Experienced nannies</p>
                <p className="nannies-number">15,000</p>
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
    </PageLayout>
  );
}
