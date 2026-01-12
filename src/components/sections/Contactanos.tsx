"use client";
import { motion, useTransform, useMotionValue, MotionValue } from "framer-motion";
import { Send, User, Mail, MessageSquare, Phone, Sparkles, CheckCircle2 } from "lucide-react";

interface ContactanosProps {
    scrollProgress?: MotionValue<number>;
}

export default function Contactanos({ scrollProgress }: ContactanosProps) {
    // Evita el error "Cannot read properties of undefined (reading 'get')"
    const fallbackScroll = useMotionValue(0);
    const safeScroll = scrollProgress || fallbackScroll;

    // Sincronización de aparición (entre el 85% y 95% del scroll total)
    const opacity = useTransform(safeScroll, [0.85, 0.95], [0, 1]);
    const yPos = useTransform(safeScroll, [0.85, 0.95], [50, 0]);

    return (
        <motion.section
            style={{ opacity: scrollProgress ? opacity : 1 }}
            className="py-20 lg:py-32 bg-transparent relative min-h-screen flex items-center overflow-visible snap-start"
        >
            {/* Luces de fondo sutiles (Cian y Púrpura) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 -left-24 w-72 h-72 lg:w-96 lg:h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[130px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    style={{ y: scrollProgress ? yPos : 0 }}
                    className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center"
                >

                    {/* Bloque de Texto */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] lg:text-xs font-medium mb-6 uppercase tracking-widest">
                            <Sparkles size={14} className="text-cyan-400" /> ¿Hablamos de tu proyecto?
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Lleva tu idea al <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400">
                                Siguiente Nivel
                            </span>
                        </h2>
                        <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                            Analizamos tu caso sin compromiso. Cuéntanos qué necesitas y nuestro equipo diseñará la solución técnica ideal para tu negocio.
                        </p>

                        <div className="hidden lg:flex flex-col gap-4 max-w-sm mx-auto lg:mx-0">
                            {[
                                { text: "Respuesta en menos de 24h", color: "text-cyan-400" },
                                { text: "Consultoría técnica incluida", color: "text-purple-400" },
                                { text: "Presupuesto 100% a medida", color: "text-indigo-400" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-left">
                                    <CheckCircle2 size={18} className={item.color} />
                                    <span className="text-gray-300 text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="w-full lg:w-1/2">
                        <form className="relative bg-[#0B0F19]/80 backdrop-blur-3xl border border-white/10 p-6 md:p-10 rounded-[24px] lg:rounded-[32px] space-y-4 md:space-y-5 shadow-xl">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Nombre</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors" size={16} />
                                        <input type="text" placeholder="Tu nombre" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/40 transition-all text-sm" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Teléfono</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors" size={16} />
                                        <input type="tel" placeholder="+34..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/40 transition-all text-sm" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-400 transition-colors" size={16} />
                                    <input type="email" placeholder="email@empresa.com" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-purple-500/40 transition-all text-sm" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">¿Qué necesitas?</label>
                                <select className="w-full bg-[#0B0F19] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-white/20 transition-all text-sm">
                                    <option>Desarrollo y Diseño Web</option>
                                    <option>Marketing y Growth</option>
                                    <option>Automatizaciones</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Mensaje</label>
                                <div className="relative group">
                                    <MessageSquare className="absolute left-4 top-3 text-gray-600 group-focus-within:text-white transition-colors" size={16} />
                                    <textarea placeholder="Cuéntanos un poco..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/20 transition-all resize-none text-sm"></textarea>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 p-[1px] rounded-xl overflow-hidden mt-2"
                            >
                                <div className="w-full h-full bg-[#0B0F19]/90 py-3.5 rounded-[11px] flex items-center justify-center gap-2">
                                    <span className="text-white font-bold text-sm tracking-wide">Comenzar Ahora</span>
                                    <Send size={16} className="text-white" />
                                </div>
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
