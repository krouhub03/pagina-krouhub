import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Digital | KrouHub",
  description: "Estrategias de marketing digital impulsadas por datos para hacer crecer tu negocio.",
};

export default function Page() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 md:px-8 selection:bg-cyan-500/30 overflow-hidden">

      <div className="container mx-auto relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-500 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          Marketing Digital
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Potencia tu marca con nuestras estrategias avanzadas de marketing.
        </p>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-3xl mx-auto">
          <p className="text-purple-400 font-medium animate-pulse">
            🚀 Próximamente
          </p>
        </div>
      </div>
    </div>
  );
}