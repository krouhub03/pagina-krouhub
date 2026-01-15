"use client";
import { useEffect, useRef } from "react";
import { motion, useTransform, useSpring, useScroll, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";

export default function HeroServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Efectos de salida basados en el scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const ySpring = useSpring(y, { stiffness: 100, damping: 30 });

  // Spotlight gradient
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.10), transparent 80%)`;

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center bg-transparent pt-20 overflow-hidden snap-start">
      {/* 0. Video Background (Local only) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-slate-950/60 z-[1]" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/fondo.webm" type="video/webm" />
        </video>
      </div>

      {/* 1. Static Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* 2. Dynamic Spotlight Effect */}
      <motion.div
        className="absolute inset-0 z-0 opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background }}
      />

      {/* Orbes Decorativos Dinámicos */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"
      />

      <motion.div
        style={{ y: ySpring, opacity, scale }}
        className="relative z-10 px-6 max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium uppercase backdrop-blur-sm">
            <Zap size={14} className="fill-cyan-400" />
            Ingeniería & Estrategia
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
          Todo lo que necesitas para <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">
            dominar el entorno digital
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
          Fusionamos desarrollo a medida con estrategias de crecimiento para crear ecosistemas que escalan por sí solos.
        </p>

        {/* Botón Explorar */}
        <motion.a
          href="#contenido-servicios"
          className="inline-flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors group"
        >
          <span className="text-sm font-medium">Desliza para descubrir</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5"
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}