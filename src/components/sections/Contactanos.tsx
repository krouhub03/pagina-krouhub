"use client";

import { motion, useTransform, useMotionValue, MotionValue } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import ContactForm from "../forms/ContactForm";

interface ContactanosProps {
    scrollProgress?: MotionValue<number>;
}

export default function Contactanos({ scrollProgress }: ContactanosProps) {
    // Evita el error "Cannot read properties of undefined (reading 'get')"
    const fallbackScroll = useMotionValue(0);
    const safeScroll = scrollProgress || fallbackScroll;

    // Sincronización de aparición (entre el 80% y 90% del scroll total)
    const opacity = useTransform(safeScroll, [0.70, 0.90 ], [0, 1]);

    return (
        <motion.section
            style={{ opacity: scrollProgress ? opacity : 1 }}
            className="py-20 lg:py-40 bg-background relative min-h-[90dvh] flex items-start lg:items-center overflow-visible snap-start scroll-mt-28 md:scroll-mt-32 transition-colors duration-500"
        >
            {/* Luces de fondo sutiles (Cian y Púrpura) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 -left-24 w-72 h-72 lg:w-96 lg:h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[130px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center"
                >

                    {/* Bloque de Texto */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border text-foreground text-[10px] lg:text-xs font-medium mb-6 uppercase tracking-widest">
                            <Sparkles size={14} className="text-cyan-500" /> ¿Hablamos de tu proyecto?
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Lleva tu idea al <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400">
                                Siguiente Nivel
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                            Analizamos tu caso sin compromiso. Cuéntanos qué necesitas y nuestro equipo diseñará la solución técnica ideal para tu negocio.
                        </p>

                        <div className="hidden lg:flex flex-col gap-4 max-w-sm mx-auto lg:mx-0">
                            {[
                                { text: "Respuesta en menos de 24h", color: "text-cyan-500" },
                                { text: "Consultoría técnica incluida", color: "text-purple-500" },
                                { text: "Presupuesto 100% a medida", color: "text-indigo-500" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-left">
                                    <CheckCircle2 size={18} className={item.color} />
                                    <span className="text-muted-foreground text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formulario extraído */}
                    <div className="w-full lg:w-1/2">
                        <ContactForm />
                    </div>
                </motion.div>
            </div>
        
        </motion.section>
    );
}


