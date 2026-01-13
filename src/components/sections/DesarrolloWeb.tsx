"use client";
import { motion } from "framer-motion";
import Link from "next/link"; // Importante para la navegación
import {
    Layout, ShoppingBag, AppWindow, Building2,
    Code2, ArrowRight
} from "lucide-react";

const productos = [
    { title: "Landing Pages", desc: "Alta conversión", icon: Layout },
    { title: "E-commerce", desc: "Ventas 24/7", icon: ShoppingBag },
    { title: "Apps Web", desc: "Software SaaS", icon: AppWindow },
    { title: "Corporativos", desc: "Identidad", icon: Building2 },
];

function DesarrolloWeb() {
    // Se eliminó la lógica 'isMobile' innecesaria. Tailwind (lg:...) maneja esto mejor por CSS.

    return (
        <section id="contenido-servicios" className="snap-start min-h-screen w-full flex items-center justify-center bg-transparent relative overflow-hidden">

            {/* Luz de fondo fija */}
            <div className="absolute top-1/2 -left-20 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                // Sugerencia: 'once: true' evita que la animación se repita cada vez que haces scroll arriba/abajo
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20"
            >
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Bloque Texto */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <span className="text-cyan-500 font-semibold uppercase tracking-widest text-xs flex items-center justify-center lg:justify-start gap-2 mb-4">
                            <Code2 size={16} /> Ingeniería de Software
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Desarrollo Web <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Robusto y Escalable
                            </span>
                        </h2>
                        <p className="text-gray-400 text-base lg:text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                            Arquitecturas digitales a medida enfocadas en velocidad y SEO.
                        </p>

                        {/* CORRECCIÓN: Usar Link en lugar de button para navegación */}
                        <Link
                            href="/servicios#contactanos"
                            className="inline-flex px-8 py-4 bg-cyan-600 text-black font-bold rounded-xl items-center gap-3 transition-transform hover:scale-105"
                        >
                            Cotizar Proyecto <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Bloque Grid */}
                    <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                        {productos.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }} // Animación única por ítem también
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="p-6 rounded-2xl bg-[#0B0F19]/60 border border-white/5 backdrop-blur-xl hover:border-cyan-500/30 transition-colors duration-300"
                            >
                                <item.icon className="text-cyan-400 mb-4" size={24} />
                                <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default DesarrolloWeb;