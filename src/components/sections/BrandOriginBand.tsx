import Image from 'next/image';
import { Fragment } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { BrandOriginBandProps } from './interfaces';

/**
 * Banda "El origen del nombre": eyebrow + frase italic (BERNUY resaltado) +
 * imagen de composición fundida en negro (mask radial + viñeta inset).
 */
export function BrandOriginBand({ eyebrow, headline, alt, src, width, height }: BrandOriginBandProps) {
  const segments = headline.split('BERNUY');

  return (
    <section className="mx-auto max-w-[1000px] px-8 pb-[70px] pt-[30px] text-center">
      <ScrollReveal y={26}>
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-gold-label">{eyebrow}</p>
        <p className="mx-auto mt-4 max-w-[720px] font-display text-[clamp(19px,2.4vw,27px)] italic leading-[1.5] text-text-body">
          {segments.map((part, index) => (
            <Fragment key={index}>
              {part}
              {index < segments.length - 1 ? (
                <span className="not-italic tracking-[0.14em] text-gold-3">BERNUY</span>
              ) : null}
            </Fragment>
          ))}
        </p>

        <div className="relative mx-auto mt-12 w-full max-w-[760px]">
          <Image
            alt={alt}
            className="h-auto w-full rounded-lg"
            height={height}
            quality={90}
            sizes="(max-width: 800px) 100vw, 760px"
            src={src}
            style={{
              maskImage:
                'radial-gradient(120% 120% at 50% 45%, #000 62%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(120% 120% at 50% 45%, #000 62%, transparent 100%)',
            }}
            width={width}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_0_70px_30px_#090807]"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
