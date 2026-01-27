"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Proyecto {
  title: string;
  url: string;
  image: string;
  logo: string;
  desc: string;
  tech: string[];
  color: string;
}

const proyectos: Proyecto[] = [
  {
    title: "Koko Toys",
    url: "https://co.koko.toys",
    image: "/koko-toys-logo.png",
    logo: "/koko-toys-logo.png",
    desc: "Tienda e-commerce especializada en juguetes educativos y didácticos.",
    tech: ["WordPress", "E-commerce"],
    color: "from-pink-500 to-rose-400"
  },
  {
    title: "Ingecivil Mantenimiento",
    url: "https://ingecivilmantenimiento.com/",
    image: "/ingecivil-mantenimiento.webp",
    logo: "/ingecivil-mantenimiento.webp",
    desc: "Plataforma corporativa para servicios de ingeniería civil y mantenimiento industrial.",
    tech: ["WordPress", "Corporativo"],
    color: "from-blue-600 to-cyan-500"
  },
  {
    title: "Gardner Jardín Infantil",
    url: "https://gardnerjardininfantil.com/",
    image: "/Gardner-logo.webp",
    logo: "/Gardner-logo.webp",
    desc: "Portal educativo enfocado en la metodología Gardner para la primera infancia.",
    tech: ["WordPress", "Education"],
    color: "from-green-500 to-emerald-400"
  }
];

const Proyectos: React.FC = () => {
  return (
    <section className="min-h-screen w-full relative overflow-hidden snap-start flex flex-col justify-center bg-transparent py-16 md:py-24">
      {/* Efectos de fondo */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col h-full justify-center"
      >
        {/* Título optimizado para ahorrar espacio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-semibold bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20 mb-3 inline-block">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white">
            Proyectos Destacados
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Soluciones digitales a medida con diseño de alto impacto.
          </p>
        </motion.div>

        {/* Grid ajustado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {proyectos.map((proyecto, index) => (
            <motion.div
              key={proyecto.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col"
            >
              <div className="relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm flex flex-col h-full transition-all duration-500 hover:border-cyan-400/50">

                {/* Browser Mockup - Altura fija reducida */}
                <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-gray-900">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-white/5 backdrop-blur-md flex items-center px-3 gap-1.5 z-20">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <Image
                    src={proyecto.image}
                    alt={proyecto.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Contenido - Padding reducido */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 relative bg-white/5 rounded-lg p-1.5 border border-white/10">
                      <Image src={proyecto.logo} alt="logo" fill className="object-contain" />
                    </div>
                    <div className="flex gap-1">
                      {proyecto.tech.slice(0, 2).map((t) => (
                        <span key={t} className="text-[8px] uppercase text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {proyecto.title}
                  </h3>

                  <p className="text-gray-400 text-xs mb-4 line-clamp-2">
                    {proyecto.desc}
                  </p>

                  <div className="mt-auto">
                    <motion.a
                      href={proyecto.url}
                      target="_blank"
                      className="inline-flex items-center justify-between w-full py-2.5 px-4 bg-white/5 hover:bg-cyan-400/10 rounded-xl border border-white/10 text-xs text-white font-medium transition-all"
                    >
                      Ver Proyecto
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Proyectos;