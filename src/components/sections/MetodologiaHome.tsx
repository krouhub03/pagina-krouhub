"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Palette,
  Home as HomeIcon,
  Settings,
  Rocket,
  LucideIcon
} from "lucide-react";

// Definimos la estructura de cada paso del proceso
interface Paso {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon; // Tipo específico para los iconos de Lucide
}

const pasos: Paso[] = [
  {
    num: "01",
    title: "Analizamos tu proyecto",
    desc: "Evaluamos tu marca, objetivos y retos para definir la mejor estrategia digital.",
    icon: Search
  },
  {
    num: "02",
    title: "Diseño y desarrollo",
    desc: "Creamos soluciones web, automatizaciones o marketing digital alineadas a tu presupuesto.",
    icon: Palette
  },
  {
    num: "03",
    title: "Tu tiempo vale",
    desc: "Trabajo 100% remoto y flexible. Avanza sin descuidar tus prioridades.",
    icon: HomeIcon
  },
  {
    num: "04",
    title: "Implementación técnica",
    desc: "Optimización, seguridad e integraciones que potencian tu crecimiento.",
    icon: Settings
  },
  {
    num: "05",
    title: "Entrega y crecimiento",
    desc: "Recibes tu proyecto listo y una consultoría estratégica para seguir escalando.",
    icon: Rocket
  }
];

const Proceso: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden min-h-screen snap-start flex flex-col justify-center">
      {/* Luz de fondo sutil tipo halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 transition-colors duration-500">
            Tu proyecto, tu ritmo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed transition-colors duration-500">
            He diseñado un proceso sin complicaciones donde tú tienes el control. Avanzamos a tu velocidad, con total tranquilidad.
          </p>
        </motion.div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {pasos.map((paso, index) => (
            <motion.div
              key={paso.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-3xl border backdrop-blur-md transition-all duration-300 group ${paso.num === "03"
                ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]"
                : "bg-card border-border hover:bg-accent/10 hover:border-border/50 hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                }`}
            >
              <div className="flex justify-between items-start mb-6">
                {/* Icono dinámico */}
                <div className={`${paso.num === "03" ? "text-cyan-500" : "text-muted-foreground group-hover:text-cyan-500"} transition-colors duration-300`}>
                  <paso.icon size={32} strokeWidth={1.5} />
                </div>
                <span className={`text-xl font-black ${paso.num === "03" ? "text-cyan-500/30" : "text-foreground/10"}`}>
                  {paso.num}
                </span>
              </div>

              <h3 className={`text-lg font-bold mb-3 ${paso.num === "03" ? "text-cyan-600 dark:text-cyan-400" : "text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400"} transition-colors duration-500`}>
                {paso.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
                {paso.desc}
              </p>

              {/* Línea inferior animada */}
              <div className="mt-6 w-12 h-1 bg-cyan-500/30 group-hover:w-full group-hover:bg-cyan-500 transition-all duration-700 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Mensaje de confianza final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <div className="text-cyan-500/80 font-medium flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Hacemos realidad tu proyecto
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Proceso;