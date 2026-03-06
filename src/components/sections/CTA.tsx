"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
export default function CTA() {
    return (
        <section className="py-24 relative overflow-hidden flex flex-col justify-center min-h-[50vh] snap-start bg-background transition-colors duration-500">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/50 border border-border text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                        <Sparkles size={12} className="fill-current" />
                        Empieza hoy mismo
                    </span>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-8 tracking-tight leading-[1.1] transition-colors duration-500">
                        ¿Listo para escalar <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">
                            tu negocio digital?
                        </span>
                    </h2>

                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light transition-colors duration-500">
                        No dejes que la competencia te tome ventaja. Nuestro equipo está listo para transformar tu visión en una solución técnica de alto rendimiento.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center ">
                        <Link
                            href="/servicios#contactanos"
                            // CAMBIO CLAVE: bg-slate-950 para claro, bg-white para oscuro
                            className="group relative px-10 py-5 bg-red-500 dark:bg-primary text-white dark:text-slate-950 rounded-full font-bold text-lg shadow-xl hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Solicitar Cotización
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>

                            {/* Overlay de brillo al hacer hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}