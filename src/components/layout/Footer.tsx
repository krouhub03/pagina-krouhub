import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, MapPin } from "lucide-react";

import logoBlanco from "../../../public/KrouHub_Logo_blanco.png";
import logoNegro from "../../../public/KrouHub_Logo_negro.png";

export default function Footer() {
    return (
        <footer className="py-12 relative z-10 snap-start bg-background text-foreground transition-colors duration-300 border-t border-border/40">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-10">

                {/* Logo */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logoBlanco}
                            alt="Logo Krou Hub"
                            width={200}
                            height={200}
                            className="h-14 w-auto dark:hidden block"
                        />
                        <Image
                            src={logoNegro}
                            alt="Logo Krou Hub"
                            width={200}
                            height={200}
                            className="h-14 w-auto hidden dark:block"
                        />
                    </Link>

                </div>

                {/* Dirección / Address */}
                <div className="flex flex-col items-center  gap-3 text-sm text-muted-foreground">
                    <h3 className="text-foreground font-semibold mb-1">Nuestra Oficina</h3>
                    <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-cyan-500 shrink-0" />
                        <span>Calle 86 # 95f-72<br />Bogotá, Colombia</span>
                    </div>
                </div>

                {/* Redes Sociales */}
                <div className="flex flex-col items-center  gap-3">
                    <h3 className="text-foreground font-semibold mb-1">Síguenos</h3>
                    <div className="flex gap-4">
                        <a href="https://www.tiktok.com/@krouhub" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-foreground/5 hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors dark:bg-white/5 dark:hover:bg-cyan-500/20">
                            <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-3v5.5a4 4 0 0 1-4 4z"></path>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/krouhub/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-foreground/5 hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors dark:bg-white/5 dark:hover:bg-cyan-500/20">
                            <Instagram size={20} />
                        </a>
                        <a href="https://www.facebook.com/krouhub" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-foreground/5 hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors dark:bg-white/5 dark:hover:bg-cyan-500/20">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright y Políticas */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-12 pt-6 border-t border-border/40 flex flex-col  justify-between items-center gap-4">
                <p className="text-muted-foreground text-sm transition-colors duration-500">
                    © {new Date().getFullYear()} KrouHub Servicios Digitales.
                </p>
                <Link
                    href="/politica-de-privacidad"
                    className="text-muted-foreground/80 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs transition-colors duration-500"
                >
                    Política de Tratamiento de Datos Personales
                </Link>
            </div>
        </footer>
    );
}   