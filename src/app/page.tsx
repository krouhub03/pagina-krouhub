import React from "react";
import HeroHome from "@/components/sections/HeroHome";
import Seccion from "@/components/sections/Seccion";
import Servicios from "@/components/sections/Services";
import MetodologiaHome from "@/components/sections/MetodologiaHome";
import ProyectosHome from "@/components/sections/ProyectosHome";
import CTA from "@/components/sections/CTA";
// Importación de componentes
// import Navbar from "@/src/components/shared/Navbar"; // Navbar is commented out in original file as well

/**
 * Componente principal de la página de inicio.
 * Next.js detectará automáticamente este export como la página raíz.
 */
const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30">

      {/* 1. Navbar */}


      {/* 2. Hero */}
      <HeroHome />

      <main className="relative z-10">

        <Seccion />
        <Servicios />
        <MetodologiaHome />
        <ProyectosHome />
        <CTA />
        {/* 7. Footer */}
      </main>
    </div>
  );
};

export default Home;