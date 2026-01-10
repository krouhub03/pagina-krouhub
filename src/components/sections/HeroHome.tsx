"use client";

import React, { useEffect, useRef } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useScroll, 
  Variants, 
  MotionValue 
} from "framer-motion";

const HeroHome: React.FC = () => {
  // Tipamos la referencia del contenedor como HTMLDivElement
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Scroll Parallax ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityScroll = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // --- Mouse Tracking ---
  const mouseX: MotionValue<number> = useMotionValue(0);
  const mouseY: MotionValue<number> = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const bounceX = useSpring(mouseX, springConfig);
  const bounceY = useSpring(mouseY, springConfig);
  
  const moveX = useTransform(bounceX, [-500, 500], [-40, 40]);
  const moveY = useTransform(bounceY, [-500, 500], [-40, 40]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent): void => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // --- Animaciones de Entrada (Tipado de Variants) ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative pt-20 min-h-screen bg-[#030712] overflow-hidden flex items-center justify-center"
    >
      {/* Fondo Grid con Parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 md:opacity-20" 
      />

      {/* Círculos de luz interactivos */}
      <motion.div 
        style={{ x: moveX, y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        style={{ 
          x: useTransform(bounceX, (v: number) => v * -0.1), 
          y: useTransform(scrollYProgress, [0, 1], [0, 150]) 
        }}
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Contenido Principal */}
      <motion.div 
        style={{ y: yParallax, opacity: opacityScroll, scale: scaleScroll }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge interactivo */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">
              Soluciones Digitales de Próxima Generación
            </span>
          </motion.div>

          {/* Título con Gradiente */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[1.05] mb-6"
          >
            Impulsamos tu <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Presencia Digital
            </span>
          </motion.h1>

          {/* Descripción */}
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Transformamos ideas complejas en productos digitales simples y elegantes. 
            Optimiza tu negocio con tecnología de vanguardia.
          </motion.p>

          {/* Botones de Acción */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <motion.a
              href="/contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
            >
              Comienza tu Proyecto
            </motion.a>
            
            <motion.a
              href="/servicios"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-md transition-all hover:bg-white/5"
            >
              Nuestros Servicios
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de Scroll */}
      <motion.div 
        style={{ opacity: opacityScroll }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
      >
        <div className="w-6 h-10 border-2 border-[#51e5f7] rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroHome;