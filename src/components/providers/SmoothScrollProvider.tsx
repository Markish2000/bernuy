'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from '@/i18n/navigation';
import type { SmoothScrollProviderProps } from './interfaces';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll suave premium con inercia (Lenis), sincronizado al ticker de GSAP
 * para que ScrollTrigger lea posiciones sin jitter. Respeta prefers-reduced-motion
 * (desactiva la inercia) e intercepta anclas (#id) con easing.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = globalThis.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      // easeOutExpo: arranque rápido, frenado largo y sedoso.
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sincroniza ScrollTrigger con cada frame de Lenis.
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      // GSAP entrega segundos; Lenis espera milisegundos.
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anclas internas (#nosotros, #top, etc.) con scroll suave de Lenis.
    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;

      const destination = document.querySelector(href);
      if (!destination) return;

      event.preventDefault();
      lenis.scrollTo(destination as HTMLElement, { offset: -80 });
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset al tope en cada cambio de ruta: Lenis controla el scroll del window,
  // así que el scroll-to-top nativo de Next no aplica. Inmediato, sin inercia.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
