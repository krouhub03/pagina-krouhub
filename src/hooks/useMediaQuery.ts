import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    // 1. Suscripción: Avisa a React cuando la media query cambia
    (callback) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    // 2. Cliente: Cómo obtener el valor actual en el navegador
    () => window.matchMedia(query).matches,
    // 3. Servidor: Valor por defecto durante el renderizado inicial en Next.js
    () => false
  );
}