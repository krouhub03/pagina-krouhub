"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    Search, Megaphone, BarChart3, Filter, ArrowRight, TrendingUp
} from "lucide-react";

const serviciosMarketing = [
    { titulo: "SEO & SEM", desc: "Posicionamiento experto.", icon: Search },
    { titulo: "Social Ads", desc: "Meta, TikTok y LinkedIn.", icon: Megaphone },
    { titulo: "Analítica", desc: "Medición de datos real.", icon: BarChart3 },
    { titulo: "Embudos", desc: "Conversión de clics.", icon: Filter }
];

function Marketing() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="snap-start min-h-screen w-full flex items-center justify-center bg-transparent relative overflow-hidden">

            {/* Fondo Decorativo Estático (Evita parpadeos) */}
            <div className="absolute top-1/4 right-0 w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                // Animación de entrada automática cuando la sección entra en el viewport
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-6 relative z-10 w-full"
            >
                <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-center">

                    {/* --- BLOQUE DE TEXTO --- */}
                    <div className="w-full lg:w-1/2 text-center lg:text-right">
                        <span className="text-purple-400 font-semibold uppercase tracking-widest text-[10px] lg:text-sm flex items-center justify-center lg:justify-end gap-2 mb-4">
                            Growth & Performance <TrendingUp size={16} />
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight transition-colors duration-500">
                            Marketing <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-500">
                                Data Driven
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-sm lg:text-lg mb-8 mx-auto lg:ml-auto max-w-xl transition-colors duration-500">
                            Estrategias de crecimiento basadas en datos reales. Enfoque total en el ROI y la escalabilidad de tu negocio.
                        </p>

                        <div className="grid grid-cols-2 gap-3 lg:gap-4">
                            {serviciosMarketing.map((item, i) => (
                                <div
                                    key={i}
                                    className="group p-4 lg:p-5 rounded-2xl bg-card/60 border border-border backdrop-blur-xl text-left hover:border-purple-500/30 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <item.icon className="text-purple-600 dark:text-purple-400" size={18} />
                                        <ArrowRight className="text-muted-foreground/20 lg:group-hover:text-purple-400 transition-all -rotate-45" size={14} />
                                    </div>
                                    <h3 className="font-bold text-foreground text-[12px] lg:text-sm mb-1 transition-colors duration-500">{item.titulo}</h3>
                                    <p className="hidden md:block text-[10px] text-muted-foreground leading-tight transition-colors duration-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- BLOQUE VISUAL --- */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative bg-card/80 backdrop-blur-3xl border border-purple-500/20 rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 shadow-2xl overflow-hidden transition-colors duration-500">
                            <div className="flex justify-between items-start mb-6 lg:mb-8 relative z-10">
                                <div>
                                    <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest mb-1">Performance Index</p>
                                    <h3 className="text-2xl lg:text-4xl font-bold text-foreground flex items-center gap-2 transition-colors duration-500">
                                        +145%
                                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold border border-green-500/20">
                                            ROI
                                        </span>
                                    </h3>
                                </div>
                                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <BarChart3 size={20} />
                                </div>
                            </div>

                            <div className="flex items-end justify-between h-32 lg:h-48 gap-2 relative z-10">
                                {[35, 45, 40, 60, 55, 75, 70, 95].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        style={{ height: `${h}%`, originY: 1 }}
                                        className="w-full bg-gradient-to-t from-purple-600/20 to-purple-400 rounded-t-md"
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between mt-6 pt-4 border-t border-border text-[10px] text-muted-foreground font-mono tracking-tighter transition-colors duration-500">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    LIVE DATA STREAM
                                </span>
                                <span>WEEKLY REPORT 08</span>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}

export default Marketing;
