"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bot, X } from "lucide-react";
import { useState, useEffect } from "react";

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show button after a short delay
        const timer = setTimeout(() => setIsVisible(true), 1500);
        // Show tooltip after button appearance
        const tooltipTimer = setTimeout(() => setShowTooltip(true), 3500);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    const phoneNumber = "573180157998";
    const message = encodeURIComponent("¡Hola! Me gustaría obtener más información sobre sus servicios.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isVisible && (
                    <div className="relative flex flex-col items-end">
                        {/* Tooltip / Speech Bubble */}
                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="mb-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-2xl shadow-xl border border-white/10 text-sm font-medium whitespace-nowrap pointer-events-auto relative"
                                >
                                    <button
                                        onClick={() => setShowTooltip(false)}
                                        className="absolute -top-1 -right-1 bg-slate-200 dark:bg-slate-800 rounded-full p-0.5 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        <X size={10} />
                                    </button>
                                    ¡Hola! ¿En qué puedo ayudarte?
                                    {/* Arrow */}
                                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-slate-900 border-r border-b border-white/10 rotate-45" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main Bot Button */}
                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{
                                scale: 1,
                                rotate: 0,
                                y: [0, -10, 0], // Floating motion
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{
                                scale: { type: "spring", stiffness: 260, damping: 20 },
                                y: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className="pointer-events-auto group relative flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-shadow"
                        >
                            {/* Waving / Greeting Animation Layer */}
                            <motion.div
                                animate={{
                                    rotate: [0, -15, 15, -15, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                    ease: "easeInOut"
                                }}
                                className="text-white"
                            >
                                <Bot size={32} strokeWidth={2.5} />
                            </motion.div>

                            {/* Pulsing Ring */}
                            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 group-hover:opacity-40" />
                        </motion.a>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WhatsAppButton;
