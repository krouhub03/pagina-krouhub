"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroHome from "@/src/components/sections/HeroHome";
import Seccion from "@/src/components/sections/Seccion";
import Servicios from "@/src/components/sections/Services";
import MetodologiaHome from "@/src/components/sections/MetodologiaHome";
import ProyectosHome from "@/src/components/sections/ProyectosHome";

// Importación de componentes
import Navbar from "@/src/components/shared/Navbar";

/**
 * Componente principal de la página de inicio.
 * Next.js detectará automáticamente este export como la página raíz.
 */
const Home: React.FC = () => {
  return (
    <div className="bg-[#030712]  selection:bg-cyan-500/30">
      
      {/* 1. Navbar: Generalmente fijo o absoluto */}
  

      {/* 2. Hero: Sección de impacto inicial */}
   

      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }} // Optimización: anima solo la primera vez que entra en vista
          transition={{ duration: 1 }}
        >

        </motion.div>
              <HeroHome />
              <Seccion />
              <Servicios />
              <MetodologiaHome / >
              <ProyectosHome />
        {/* 7. Footer */}
      </main>
    </div>
  );
};

export default Home;