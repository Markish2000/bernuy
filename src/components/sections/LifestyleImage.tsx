'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface LifestyleImageProps {
  readonly alt: string;
  readonly height: number;
  readonly src: string;
  readonly width: number;
}

/** Imagen ancha lifestyle con overlay degradado inferior. */
export function LifestyleImage({ alt, height, src, width }: LifestyleImageProps) {
  return (
    <section className="px-5 pt-[60px] sm:px-6 lg:px-12">
      <ScrollReveal className="mx-auto max-w-showcase" duration={1.2}>
        <div className="relative overflow-hidden rounded-md shadow-hero-img">
          <Image
            alt={alt}
            className="h-auto w-full"
            height={height}
            sizes="(max-width: 1100px) 100vw, 1100px"
            src={src}
            width={width}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55%,rgba(0,0,0,0.55)_100%)]"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
