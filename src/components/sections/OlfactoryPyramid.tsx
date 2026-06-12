'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { OlfactoryPyramidProps } from './interfaces';

/** Pirámide olfativa (composición de marca): familia + Salida·Cuerpo·Fondo en gran formato. */
export function OlfactoryPyramid({ alt, height, src, width }: OlfactoryPyramidProps) {
  return (
    <section className="pt-[60px]">
      <ScrollReveal className="mx-auto max-w-[760px]" duration={1.2}>
        <div className="overflow-hidden rounded-md border border-accent/[0.12] shadow-hero-img">
          <Image
            alt={alt}
            className="h-auto w-full"
            height={height}
            sizes="(max-width: 760px) 100vw, 760px"
            src={src}
            width={width}
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
