'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealVariant = 'fade' | 'sweep';

interface AnimatedTextRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly variant?: RevealVariant;
}

/**
 * Revela texto. `sweep` = loop horizontal del título editorial (CSS, ya
 * desactivado en mobile y reduced-motion). `fade` = aparición con GSAP.
 */
export function AnimatedTextReveal({
  children,
  className,
  delay = 0,
  variant = 'fade',
}: AnimatedTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (variant !== 'fade') return;
      const element = ref.current;
      if (!element) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReducedMotion) {
        gsap.set(element, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        element,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          delay,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 85%', once: true },
        },
      );
    },
    { scope: ref },
  );

  if (variant === 'sweep') {
    return <span className={`animate-title-sweep ${className ?? ''}`}>{children}</span>;
  }

  return (
    <span ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </span>
  );
}
