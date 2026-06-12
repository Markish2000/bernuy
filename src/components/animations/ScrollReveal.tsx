'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ScrollRevealProps } from './interfaces';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Wrapper presentacional que revela su hijo al entrar al viewport
 * (opacity 0→1, translateY → 0). Respeta prefers-reduced-motion y simplifica en mobile.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  once = true,
  y = 38,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(element, { opacity: 1, y: 0 });
        return;
      }

      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      gsap.fromTo(
        element,
        { opacity: 0, y: isMobile ? Math.min(y, 18) : y },
        {
          opacity: 1,
          y: 0,
          delay,
          duration: isMobile ? Math.min(duration, 0.8) : duration,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 82%', once },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
