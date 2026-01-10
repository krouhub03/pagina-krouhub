"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useSpring, MotionValue } from 'framer-motion';

// Importante: Asegúrate de que la ruta del logo sea correcta según tu árbol de proyecto
import logo from "../../public/KrouHub_Logo_blanco.png";

// Definimos la interfaz para los links de navegación
interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // 1. Lógica para la barra de progreso superior
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Servicios', href: '/servicios' },
  ];

  return (
    <nav 
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled 
        ? "bg-[#030712]/70 backdrop-blur-md border-b border-white/5 py-2" 
        : "bg-transparent py-6"
      }`}
    >
      {/* BARRA DE PROGRESO */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center">
              <Image 
                src={logo}
                alt="Logo Krou Hub" 
                width={350} 
                height={250} 
                priority // Agregamos priority para LCP (Largest Contentful Paint)
                className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
          </motion.div>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute inset-x-4 -bottom-1 h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}

            <Link 
              href="/contacto" 
              className="ml-4 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-5 py-2 rounded-full text-sm font-bold hover:bg-cyan-500 hover:text-white transition-all duration-300"
            >
              Contacto
            </Link>
          </div>

          {/* BOTÓN MÓVIL */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
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
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#030712] border-b border-white/10 flex flex-col p-6 space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="text-lg text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contacto" 
              onClick={() => setIsOpen(false)}
              className="text-lg text-cyan-400 font-bold"
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