import React from "react";
import HeroHome from "@/src/components/sections/HeroHome";
import Seccion from "@/src/components/sections/Seccion";
import Servicios from "@/src/components/sections/Services";
import MetodologiaHome from "@/src/components/sections/MetodologiaHome";
import ProyectosHome from "@/src/components/sections/ProyectosHome";

// Importación de componentes
// import Navbar from "@/src/components/shared/Navbar"; // Navbar is commented out in original file as well

/**
 * Componente principal de la página de inicio.
 * Next.js detectará automáticamente este export como la página raíz.
 */
const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30">

      {/* 1. Navbar: Generalmente fijo o absoluto */}


      {/* 2. Hero: Sección de impacto inicial */}


      <main className="relative z-10">
        <HeroHome />
        <Seccion />
        <Servicios />
        <MetodologiaHome />
        <ProyectosHome />
        {/* 7. Footer */}
      </main>
    </div>
  );
};

export default Home;