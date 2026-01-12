"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <h1 className="text-[150px] md:text-[200px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none">
                    404
                </h1>

                <div className="space-y-6 -mt-10 md:-mt-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Página no encontrada
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto text-lg">
                        Parece que te has desviado del camino. La página que buscas no existe o ha sido movida.
                    </p>

                    <div className="pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
