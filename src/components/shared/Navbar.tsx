"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useSpring, MotionValue } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useTheme } from 'next-themes';
import { X, Menu } from 'lucide-react'; // Usamos iconos más limpios

import logoBlanco from "../../../public/KrouHub_Logo_blanco.png";
import logoNegro from "../../../public/KrouHub_Logo_negro.png";

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentLogo, setCurrentLogo] = useState(logoBlanco);

  useEffect(() => {
    if (mounted) {
      const activeTheme = resolvedTheme || theme;
      setCurrentLogo(activeTheme === 'dark' ? logoBlanco : logoNegro);
    }
  }, [mounted, resolvedTheme, theme]);

  const navLinks: NavLink[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
  ];

  if (!mounted) return <nav className="fixed top-0 w-full h-[80px] z-[100] bg-transparent" />;

  return (
    <nav
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${(scrolled || !isHome || isOpen)
        ? "bg-background/80 backdrop-blur-xl py-3 border-b border-border/40 shadow-sm"
        : "bg-transparent py-6"
        }`}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 origin-left z-[101]"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-14">

          {/* LOGO */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0 z-[160]">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
              <Image
                src={currentLogo}
                alt="Logo Krou Hub"
                width={160}
                height={45}
                priority
                className="h-9 w-auto"
              />
            </Link>
          </motion.div>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex space-x-2 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-all relative group"
              >
                {link.name}
                <span className="absolute inset-x-5 -bottom-1 h-[2px] bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
            <Link
              href="/servicios/#contactanos"
              className="ml-4 bg-foreground text-background px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all"
            >
              Contacto
            </Link>
            <div className="ml-4 pl-4 border-l border-border/50">
              <ThemeToggle />
            </div>
          </div>

          {/* BOTÓN MÓVIL (Trigger) */}
          <div className="md:hidden flex items-center gap-3 z-[160]">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-2xl bg-foreground/5 dark:bg-white/10 backdrop-blur-md text-foreground transition-all active:scale-90"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL (Full Screen Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[100dvh] fixed inset-0 z-[150] bg-background flex flex-col md:hidden px-8 pt-32 pb-12 overflow-hidden"
          >
            {/* FONDO FIJO CON GRADIENTES ESTÁTICOS */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {/* Orbes de color fijos que no dependen del scroll */}
              <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[50%] bg-cyan-500/15 blur-[120px] rounded-full" />
              <div className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[50%] bg-indigo-600/15 blur-[120px] rounded-full" />

              {/* Sutil textura de ruido o grid */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-col space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 mb-2"
                >
                  Navegación
                </motion.p>

                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-6xl font-black text-foreground hover:text-cyan-500 transition-colors tracking-tighter"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-12 border-t border-border/40"
              >
                <Link
                  href="/servicios/#contactanos"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between"
                >
                  <span className="text-3xl font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-tighter max-w-[200px] leading-none">
                    Hablemos de tu proyecto
                  </span>
                  <div className="w-30 h-14 rounded-full border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/10">
                    <span className="text-[10px] font-bold">Contáctanos</span>
                  </div>
                </Link>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;