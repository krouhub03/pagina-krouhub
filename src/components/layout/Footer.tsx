import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-10  text-center relative z-10 snap-start bg-background text-foreground transition-colors duration-300">
            <p className="text-muted-foreground text-sm mb-2 transition-colors duration-500">
                © {new Date().getFullYear()} KrouHub Servicios Digitales.
            </p>
            <Link
                href="/politica-de-privacidad"
                className="text-muted-foreground/80 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs transition-colors duration-500"
            >
                Política de Tratamiento de Datos Personales
            </Link>
        </footer>
    );
}   