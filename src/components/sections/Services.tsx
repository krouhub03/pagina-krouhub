"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  BarChart3,
  Bot,
  ArrowRight,
  CheckCircle2,
  LucideIcon
} from "lucide-react";

// Definimos la interfaz para cada servicio
interface Servicio {
  title: string;
  desc: string;
  details: string[];
  icon: LucideIcon; // Tipo específico para los iconos de Lucide
  iconColor: string;
  iconBg: string;
  borderColor: string;
}

const servicios: Servicio[] = [
  {
    title: "Desarrollo Web",
    desc: "Creamos experiencias digitales rápidas y robustas.",
    details: ["Landing pages", "E-commerce", "Aplicaciones Web", "Sitios Corporativos"],
    icon: Monitor,
    iconColor: "group-hover:text-cyan-400",
    iconBg: "group-hover:bg-cyan-400/10",
    borderColor: "group-hover:border-cyan-500/50"
  },
  {
    title: "Automatizaciones",
    desc: "Tecnología que trabaja por ti 24/7.",
    details: ["Chatbots con IA", "Integraciones CRM", "Flujos de Email Marketing", "Optimización de procesos"],
    icon: Bot,
    iconColor: "group-hover:text-emerald-400",
    iconBg: "group-hover:bg-emerald-400/10",
    borderColor: "group-hover:border-emerald-500/50"
  }
];

const Servicios: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden min-h-screen snap-start flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-500 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Soluciones digitales diseñadas para <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              escalar tu negocio
            </span>
          </h2>
        </motion.div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(0,255,255,0.1)] ${servicio.borderColor}`}
            >
              {/* Icono Principal con glow suave */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/10 transition-all duration-300 text-gray-500 bg-white/5 ${servicio.iconBg} ${servicio.iconColor} group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]`}>
                <servicio.icon size={28} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {servicio.title}
              </h3>

              <p className="text-gray-400 mb-8 leading-relaxed">
                {servicio.desc}
              </p>

              {/* Lista de características */}
              <ul className="space-y-3 mb-8">
                {servicio.details.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gray-600 shrink-0 mt-[1px] group-hover:text-gray-400 transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>



              {/* Efecto de brillo interior */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Servicios;