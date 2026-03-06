"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
  Variants
} from "framer-motion";
import { getCurrentPagePath, track } from "@/lib/tracking";

const HeroHome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityScroll = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get position relative to the container if possible, or viewport
      const { clientX, clientY } = e;
      const { left, top } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Spotlight gradient
  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.10), transparent 80%)`;

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
      className="relative pt-1 min-h-screen overflow-hidden flex items-center justify-center group snap-start"
    >
      {/* 0. Video Background (Local only) 
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-background/80 dark:bg-neutral-950 z-[1] transition-colors duration-500" />
        <video
          autoPlay
          muted
          loop
          playsInline
          suppressHydrationWarning
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/fondo.webm" type="video/webm" />
        </video>
      </div>*/}

      {/* 1. Static Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* 2. Dynamic Spotlight Effect */}
      <motion.div
        className="absolute inset-0 z-0 opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background }}
      />

      {/* 3. Floating Ambient Blobs (Secondary) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          style={{ y: yParallax, opacity: opacityScroll }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          <div className="flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">
                Soluciones Digitales de Próxima Generación
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight leading-[1.05] mb-4 md:mb-6">
              Impulsamos tu <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Presencia Digital
              </span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Transformamos ideas complejas en productos digitales elegantes y escalables.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <motion.a
                href="/servicios#contactanos"
                onClick={() =>
                  track("click_cta", {
                    button_name: "Hero Comienza tu Proyecto",
                    section: "hero_home",
                    page_path: getCurrentPagePath(),
                  })
                }
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
                className="px-8 py-4 border border-border text-foreground font-semibold rounded-xl backdrop-blur-md transition-all hover:bg-black/5 dark:hover:bg-white/5"
              >
                Nuestros Servicios
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: opacityScroll }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-30 left-1/2 -translate-x-1/2 opacity-30"
      >
        <div className="w-6 h-12 border-1 border-[#51e5f7] rounded-full flex justify-center p-2">
          <div className="w-1 h-4 bg-[#51e5f7] animate-pulse rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroHome;
