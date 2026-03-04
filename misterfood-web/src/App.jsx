import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import MenuSection from "./components/MenuSection.jsx";
import Promos from "./components/Promos.jsx"; // Importamos Promos

function App() {
  return (
    <div className="min-h-screen bg-mister-cream">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <Promos /> {/* Lo agregamos aquí */}
      </main>
    </div>
  );
}

export default App;