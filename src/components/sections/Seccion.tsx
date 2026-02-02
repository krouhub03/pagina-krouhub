"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  MotionValue
} from "framer-motion";

// Definimos la estructura de datos para las tarjetas
interface Feature {
  title: string;
  desc: string;
  icon: string;
}

const Services: React.FC = () => {
  // Tipamos la referencia del contenedor
  const targetRef = useRef<HTMLElement>(null);

  // 1. Efecto Parallax para el fondo basado en el scroll de esta sección
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  // 2. Variantes para las tarjetas (Scroll Reveal)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const features: Feature[] = [
    {
      title: "Experiencia Comprobada",
      desc: "Más de 10 años creando soluciones digitales que impulsan negocios reales.",
      icon: "01"
    },
    {
      title: "Enfoque Personalizado",
      desc: "Cada proyecto es único. Nos involucramos para entender tus objetivos y desafíos reales.",
      icon: "02"
    },
    {
      title: "Resultados Medibles",
      desc: "Trabajamos con métricas claras para asegurar impacto, crecimiento y retorno de inversión.",
      icon: "03"
    }
  ];

  return (
    <section
      ref={targetRef}
      className="relative py-10 overflow-hidden min-h-screen snap-start flex flex-col justify-center"
    >
      {/* Elementos decorativos de fondo con Parallax */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >

        {/* Título animado con Scroll Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            ¿Por qué elegir <span className="text-cyan-400">KrouHub</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Combinamos estrategia, diseño y tecnología para escalar tu negocio al siguiente nivel.
          </p>
        </motion.div>

        {/* Grid de tarjetas con Stagger Effect */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="relative group p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:shadow-[0_15px_40px_rgba(0,255,255,0.1)] transition-all duration-500"
            >
              {/* Número de fondo sutil */}
              <span className="absolute top-4 right-8 text-7xl font-bold text-white/5 group-hover:text-cyan-500/20 transition-colors">
                {item.icon}
              </span>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {item.desc}
              </p>

              {/* Decoración inferior de la tarjeta */}
              <div className="mt-6 w-12 h-1 bg-cyan-500/30 group-hover:w-full group-hover:bg-cyan-500 transition-all duration-700 rounded-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Sección final con efecto de escala al scroll */}
        <motion.div
          style={{ scale }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="mt-20 p-12 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Dedicación a la Excelencia</h3>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            En KrouHub creemos en relaciones a largo plazo. Nos enfocamos en entender tu negocio y optimizar tus procesos para entregar soluciones que impulsen tu crecimiento.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;