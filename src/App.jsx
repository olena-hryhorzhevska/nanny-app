import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Nannies from "./pages/Nannies/Nannies.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nannies" element={<Nannies />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
  );
}

export default App;
