"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useScroll,
  useMotionValue,
  useMotionTemplate
} from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";
import { useTheme } from "next-themes";

export default function HeroServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end start"],
  });

  // Animaciones de scroll suavizadas para móvil
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]); // Reducido el desplazamiento
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Evitamos el scale en móviles muy pequeños para mantener legibilidad
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const ySpring = useSpring(y, { stiffness: 80, damping: 25 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (!isMounted) return;

    const handleMove = (x: number, y: number) => {
      if (!containerRef.current) return;
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(x - left);
      mouseY.set(y - top);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMounted, mouseX, mouseY]);

  const spotlightOpacity = theme === "dark" ? "0.15" : "0.08";
  // Gradiente radial optimizado: más pequeño en móvil para no "lavar" el color de fondo
  const background = useMotionTemplate`radial-gradient(clamp(250px, 60vw, 600px) circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, ${spotlightOpacity}), transparent 85%)`;

  if (!isMounted) {
    return <section className="min-h-screen bg-background" />;
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-background pt-20 pb-10 overflow-hidden transition-colors duration-500 px-6 snap-start"
    >
      {/* 1. Grid Background - Optimización de densidad */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_0.5px,transparent_0.5px),linear-gradient(to_bottom,#1f2937_0.5px,transparent_0.5px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_60%,transparent_100%)] opacity-50" />

      {/* 2. Spotlight */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ background }} />

      {/* 3. Contenido Principal */}
      <motion.div
        style={{ y: ySpring, opacity, scale }}
        className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[11px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <Zap size={14} className="fill-current" />
            Ingeniería & Estrategia
          </span>
        </motion.div>

        {/* Título - Tamaños corregidos para evitar cortes en móviles pequeños (320px) */}
        <h1 className="text-[2.6rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight mb-6 md:mb-8 max-w-[18ch] mx-auto">
          Todo lo que necesitas para <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 pb-2">
            dominar el entorno digital
          </span>
        </h1>

        {/* Descripción */}
        <p className="text-base md:text-xl text-muted-foreground max-w-[90%] md:max-w-2xl mx-auto mb-10 md:mb-14 font-medium md:font-light leading-relaxed transition-colors duration-500">
          Fusionamos desarrollo a medida con estrategias de crecimiento para crear ecosistemas que escalan por sí solos.
        </p>

        {/* Botón Explorar */}
        <motion.a
          href="#contenido-servicios"
          className="inline-flex flex-col items-center gap-4 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explorar Catálogo</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center backdrop-blur-xl shadow-lg group-hover:border-cyan-500/50 transition-colors"
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}