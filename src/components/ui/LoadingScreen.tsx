"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/../public/KrouHub_Logo_blanco.png";

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Logo Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                    opacity: { duration: 0.5 },
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="relative z-10 mb-8"
            >
                <Image
                    src={logo}
                    alt="KrouHub Logo"
                    width={300}
                    height={200}
                    className="h-16 w-auto opacity-90"
                    priority
                />
            </motion.div>

            {/* Loading Progress Bar Container */}
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative z-10">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 text-cyan-500/70 text-xs font-semibold uppercase tracking-[0.2em] relative z-10"
            >
                Cargando Experiencia
            </motion.p>
        </div>
    );
};

export default LoadingScreen;
