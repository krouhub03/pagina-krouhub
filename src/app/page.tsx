"use client";

import React from "react";
import { motion } from "framer-motion";

// Importación de componentes
import Navbar from "@/src/components/shared/Navbar";

/**
 * Componente principal de la página de inicio.
 * Next.js detectará automáticamente este export como la página raíz.
 */
const Home: React.FC = () => {
  return (
    <div className="bg-[#030712] min-h-screen selection:bg-cyan-500/30">
      
      {/* 1. Navbar: Generalmente fijo o absoluto */}
      <Navbar />

      {/* 2. Hero: Sección de impacto inicial */}
   

      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }} // Optimización: anima solo la primera vez que entra en vista
          transition={{ duration: 1 }}
        >

        </motion.div>

        {/* 7. Footer */}
        <footer className="py-10 border-t border-white/5 bg-[#020617] text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KrouHub Servicios Digitales.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Home;