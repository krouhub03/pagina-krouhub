import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Automatización de IA | KrouHub",
    description: "Optimiza tus procesos empresariales con nuestras soluciones de automatización inteligente e IA.",
};

export default function Page() {
    return (
        <div className="relative min-h-screen pt-32 pb-20 px-4 md:px-8 selection:bg-cyan-500/30 overflow-hidden">
            {/* Background with Grid or Spotlight can be added here if globally available or imported */}

            <div className="container mx-auto relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-500 mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Automatizaciones con IA
                </h1>

                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                    Estamos construyendo esta sección para ofrecerte lo mejor en tecnología de automatización.
                </p>

                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-3xl mx-auto">
                    <p className="text-cyan-400 font-medium animate-pulse">
                        🚀 Próximamente
                    </p>
                </div>
            </div>
        </div>
    );
}