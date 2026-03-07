"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Aparece el botÃ³n tras 1.5s
        const timer = setTimeout(() => setIsVisible(true), 1500);
        // Aparece el mensaje de ayuda tras 4s
        const tooltipTimer = setTimeout(() => setShowTooltip(true), 4000);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    const phoneNumber = "573180157998";
    const message = encodeURIComponent("¡Hola KrouHub! Me gustaría obtener más información sobre sus servicios.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    const trackWhatsAppClick = () => {
        sendGTMEvent({
            event: "whatsapp_click",
            placement: "floating_button",
            page_path: window.location.pathname + window.location.search,
        });
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isVisible && (
                    <div className="relative flex flex-col items-end">

                        {/* Tooltip con Estilo Glassmorphism Adaptable */}
                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5, x: 20, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, x: 20 }}
                                    className="mb-6 mr-2 pointer-events-auto relative group"
                                >
                                    <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 px-5 py-3 rounded-[2rem] shadow-2xl flex items-center gap-3 transition-colors duration-500">
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <Bot size={16} className="text-green-600 dark:text-green-400" />
                                            </div>
                                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-tighter text-slate-500 dark:text-slate-400 font-bold">Asistente KrouHub</span>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Â¿CÃ³mo podemos ayudarte?</p>
                                        </div>

                                        <button
                                            onClick={() => setShowTooltip(false)}
                                            className="ml-2 p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <X size={14} className="text-slate-400" />
                                        </button>
                                    </div>

                                    {/* Flecha del Tooltip */}
                                    <div className="absolute -bottom-1.5 right-8 w-4 h-4 bg-white/95 dark:bg-slate-900/90 border-r border-b border-slate-200 dark:border-white/10 rotate-45 transition-colors duration-500" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* BotÃ³n Principal con Efecto Glow y Evento GA4 */}
                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={trackWhatsAppClick}
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="pointer-events-auto group relative flex items-center justify-center w-16 h-16 rounded-[1.5rem] transition-all duration-300"
                        >
                            {/* Fondo Gradiente con Sombra DinÃ¡mica */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-emerald-400 rounded-[1.5rem] shadow-[0_10px_30px_rgba(34,197,94,0.4)] group-hover:shadow-[0_15px_40px_rgba(34,197,94,0.6)] transition-all duration-300" />

                            {/* Icono Principal Animado */}
                            <motion.div
                                animate={{
                                    rotate: [0, -10, 10, -10, 0],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                                className="relative z-10 text-white"
                            >
                                <MessageCircle size={32} strokeWidth={2.5} />
                            </motion.div>

                            {/* Indicador de NotificaciÃ³n (Social Proof) */}
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white dark:border-slate-950 rounded-full z-20 flex items-center justify-center">
                                <span className="text-[10px] font-black text-white">1</span>
                            </span>

                            {/* Pulso de atenciÃ³n */}
                            <div className="absolute inset-0 rounded-[1.5rem] bg-green-500 animate-ping opacity-10 group-hover:opacity-25" />
                        </motion.a>

                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WhatsAppButton;


