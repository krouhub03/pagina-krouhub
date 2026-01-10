"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Definimos la estructura de datos para un proyecto
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
    // Esta imagen debe existir en su servidor o ser una URL válida
    image: "/koko-toys-logo.png", 
    logo: "/koko-toys-logo.png",
    desc: "Tienda e-commerce especializada en juguetes educativos y didácticos.",
    tech: ["WordPress", "E-commerce"],
    color: "from-pink-500 to-rose-400"
  },
  {
    title: "Ingecivil Mantenimiento",
    url: "https://ingecivilmantenimiento.com/",
    // Verifica la ruta exacta del logo en su web
    image: "/ingecivil-mantenimiento.webp",
    logo: "/ingecivil-mantenimiento.webp",
    desc: "Plataforma corporativa para servicios de ingeniería civil y mantenimiento industrial.",
    tech: ["React", "SEO", "Business"],
    color: "from-blue-600 to-cyan-500"
  },
  {
    title: "Gardner Jardín Infantil",
    url: "https://gardnerjardininfantil.com/",
    image: "/Gardner-logo.webp",
    logo: "/Gardner-logo.webp",
    desc: "Portal educativo enfocado en la metodología Gardner para la primera infancia.",
    tech: ["Next.js", "Education", "UI/UX"],
    color: "from-green-500 to-emerald-400"
  }
];
const Proyectos: React.FC = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-[#030712] via-[#0a0f1e] to-[#030712] relative overflow-hidden">
      {/* Efectos de fondo mejorados */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Título mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-semibold bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20">
              Portfolio
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white">
            Proyectos Destacados
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Soluciones digitales a medida que combinan funcionalidad avanzada con diseño de impacto
          </p>
        </motion.div>

        {/* Grid de tarjetas mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto, index) => (
            <motion.div
              key={proyecto.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut"
              }}
              className="group relative"
            >
              {/* Card wrapper */}
              <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 overflow-hidden backdrop-blur-sm flex flex-col h-full transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]">
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-500/5" />
                </div>

                {/* Mockup de navegador */}
                <div className="relative aspect-video overflow-hidden border-b border-white/10">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md flex items-center px-4 gap-2 z-20 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={proyecto.image}
                      alt={proyecto.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-all duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${proyecto.color} opacity-20 group-hover:opacity-0 transition-opacity duration-500 mix-blend-overlay`} />
                  </motion.div>
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="w-14 h-14 relative bg-white/5 rounded-xl p-2 border border-white/10 group-hover:border-cyan-400/30 transition-colors">
                      <Image
                        src={proyecto.logo}
                        alt={`${proyecto.title} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {proyecto.tech.slice(0, 2).map((t) => (
                        <span key={t} className="text-[9px] uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md border border-cyan-400/20 font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {proyecto.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                    {proyecto.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-white/5">
                    {proyecto.tech.map((t) => (
                      <span key={t} className="text-xs text-gray-500 group-hover:text-cyan-400/70 transition-colors">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={proyecto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    className="inline-flex items-center justify-between text-white font-semibold gap-3 text-sm group/link w-full py-3 px-4 bg-white/5 hover:bg-cyan-400/10 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <span className="group-hover/link:text-cyan-400 transition-colors">
                      Visitar sitio web
                    </span>
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              </div>
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">¿Tienes un proyecto en mente?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300"
          >
            Hablemos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Proyectos;