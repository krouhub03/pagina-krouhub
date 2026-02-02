"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useSpring, MotionValue } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useTheme } from 'next-themes';

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

  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full py-6 bg-transparent h-[104px] z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="h-10 w-32 bg-foreground/5 animate-pulse rounded-lg" />
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${(scrolled || !isHome || isOpen)
        ? "bg-background py-2 border-b border-border shadow-sm"
        : "bg-transparent py-6"
        }`}
    >
      {/* BARRA DE PROGRESO */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0">
            <Link href="/" className="flex items-center transition-transform hover:scale-105 active:scale-95">
              <Image
                src={currentLogo}
                alt="Logo Krou Hub"
                width={180}
                height={50}
                priority
                className="h-10 w-auto transition-all duration-500"
              />
            </Link>
          </motion.div>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute inset-x-4 -bottom-1 h-[2px] bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </Link>
            ))}

            <Link
              href="/servicios/#contactanos"
              className="ml-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg shadow-cyan-500/10"
            >
              Contacto
            </Link>
            <div className="ml-4 pl-4 border-l border-border/50">
              <ThemeToggle />
            </div>
          </div>

          {/* BOTÓN MÓVIL */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border flex flex-col p-8 space-y-8 md:hidden shadow-3xl z-[110] min-h-[50vh]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-black text-foreground hover:text-cyan-500 transition-colors"
                style={{ opacity: 1 }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/servicios/#contactanos"
              onClick={() => setIsOpen(false)}
              className="text-2xl text-cyan-600 dark:text-cyan-400 font-black uppercase tracking-widest pt-6 border-t border-border"
            >
              Contacto
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;