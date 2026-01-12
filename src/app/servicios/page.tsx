"use client";
import { useScroll } from "framer-motion";
import HeroServices from "@/src/components/sections/HeroServices";
import DesarrolloWeb from "@/src/components/sections/DesarrolloWeb";
import Marketing from "@/src/components/sections/Marketing";
import Automatizaciones from "@/src/components/sections/Automatizaciones";
import Contactanos from "@/src/components/sections/Contactanos";

export default function Page() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30">
      <main className="relative z-10">
        <HeroServices />
        <DesarrolloWeb />
        <Marketing />
        <Automatizaciones />
        <Contactanos scrollProgress={scrollYProgress} />
      </main>
    </div>
  );
}