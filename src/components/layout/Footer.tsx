import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-10 border-t border-white/5 text-center relative z-10 snap-start bg-[#020617]">
            <p className="text-gray-500 text-sm mb-2">
                © {new Date().getFullYear()} KrouHub Servicios Digitales.
            </p>
            <Link
                href="/politica-de-privacidad"
                className="text-gray-600 hover:text-cyan-500 text-xs transition-colors"
            >
                Política de Tratamiento de Datos Personales
            </Link>
        </footer>
    );
}   