"use client";
import { motion } from "framer-motion";
import { Bot, Database, Mail, Zap, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

const serviciosAutomatizacion = [
    { titulo: "Chatbots IA", desc: "Asistentes 24/7.", icon: Bot },
    { titulo: "CRM", desc: "Base de datos.", icon: Database },
    { titulo: "Emailing", desc: "Flujos automáticos.", icon: Mail },
    { titulo: "Procesos", desc: "Tareas repetitivas.", icon: Zap }
];

function Automatizaciones() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="snap-start min-h-screen w-full flex items-center justify-center bg-transparent relative overflow-hidden">

            {/* Aura de fondo decorativa (Estática para evitar fallos de render) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[600px] h-[280px] md:h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-6 relative z-10 w-full"
            >
                <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

                    {/* BLOQUE DE TEXTO */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <span className="text-amber-400/80 font-semibold uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center md:justify-start gap-2 mb-4">
                            <Cpu size={14} className="animate-pulse" /> Automatizaciónes Inteligentes
                        </span>

                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Escala sin <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                                Fronteras
                            </span>
                        </h2>

                        <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                            Sistemas que trabajan mientras tú descansas. Automatizamos procesos críticos para liberar tu tiempo y maximizar tu rentabilidad.
                        </p>

                        <div className="grid grid-cols-2 gap-3 md:gap-4 text-left">
                            {serviciosAutomatizacion.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 md:p-5 rounded-xl bg-[#0B0F19]/40 border border-white/5 backdrop-blur-xl hover:border-amber-500/20 transition-colors"
                                >
                                    <item.icon className="text-amber-400 mb-2" size={18} />
                                    <h3 className="font-bold text-white text-xs md:text-sm mb-1">{item.titulo}</h3>
                                    <p className="hidden md:block text-[11px] text-gray-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* TARJETA VISUAL */}
                    <div className="w-full md:w-1/2 relative flex justify-center items-center mt-8 md:mt-0">
                        <div className="relative bg-[#0B0F19]/80 p-10 md:p-14 rounded-[30px] md:rounded-[40px] border border-amber-500/10 backdrop-blur-3xl shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-20 h-20 md:w-28 md:h-28 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-amber-500/20 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
                            >
                                <Bot size={isMobile ? 38 : 54} />
                            </motion.div>

                            <div className="text-center relative z-10">
                                <p className="text-white font-bold text-xl md:text-2xl mb-2">Sincronía Total</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-amber-400/60 text-[10px] font-mono tracking-widest uppercase italic">IA Core Optimized</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}

export default Automatizaciones;
