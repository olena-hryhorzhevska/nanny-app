import { Link } from "react-router-dom";
import "./Home.css";
import PageLayout from "../components/PageLayout.jsx";

export default function Home() {
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
              <Link to="/">Home</Link>
              <Link to="/nannies">Nannies</Link>
              <button className="nav-btn">Log in</button>
              <button className="nav-btn nav-btn-primary">Registration</button>
            </nav>
          </header>

          <div className="hero-right-body">
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
