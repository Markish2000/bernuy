'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from '@/i18n/navigation';
import type { HeroSectionProps } from './interfaces';

gsap.registerPlugin(useGSAP);

const LETTER_WIDTH: Record<string, number> = {
  b: 97,
  e: 96,
  r: 93,
  n: 101,
  u: 106,
  y: 104,
};

/** Hero: monograma navegable (6 letras-imagen) + intro + scroll-cue. */
export function HeroSection({ fragrances }: HeroSectionProps) {
  const translate = useTranslations('hero');
  const translateA11y = useTranslations('a11y');
  const monogramRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = monogramRef.current;
      if (!element) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReducedMotion) {
        gsap.set(element, { opacity: 1, scale: 1 });
        return;
      }

      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' },
      );
    },
    { scope: monogramRef },
  );

  return (
    <header
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[18px] pb-20 pt-[120px] text-center"
      id="top"
    >
      <div
        className="relative flex w-full max-w-monogram items-end justify-center gap-[clamp(8px,2.6vw,46px)]"
        ref={monogramRef}
        style={{ opacity: 0 }}
      >
        {fragrances.map((fragrance) => {
          const slug = fragrance.slug;
          const isSilver = slug === 'b' || slug === 'r' || slug === 'u';
          const hoverGlow = isSilver
            ? 'hover:drop-shadow-[0_30px_50px_rgba(214,214,222,0.55)]'
            : 'hover:drop-shadow-[0_30px_50px_rgba(202,164,90,0.55)]';
          return (
            <Link
              key={slug}
              className="block leading-[0]"
              href={`/fragancias/${slug}`}
              title={translate('letterTitle', { letter: fragrance.letter })}
            >
              <Image
                alt={fragrance.letter}
                className={`block h-[clamp(108px,26vw,420px)] w-auto origin-bottom transition-[transform,filter] duration-[550ms] ease-premium hover:-translate-y-[18px] hover:scale-[1.08] hover:brightness-110 ${hoverGlow} motion-reduce:transform-none`}
                height={318}
                priority
                src={`/assets/brand/logo-letter-${slug}.png`}
                width={LETTER_WIDTH[slug] ?? 100}
              />
            </Link>
          );
        })}
      </div>

      <p className="relative mt-[34px] max-w-[540px] font-sans text-[14.5px] font-light leading-[2.5] tracking-[0.06em] text-text-body">
        {translate('intro')}
      </p>

      <a
        className="relative mt-[54px] flex flex-col items-center gap-[10px]"
        href="#fragancias"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-eyebrow text-text-muted">
          {translate('scroll')}
        </span>
        <span
          aria-hidden="true"
          className="animate-bob-arrow flex h-[30px] w-[30px] items-center justify-center rounded-full border border-accent/40 text-[13px] text-accent"
        >
          ↓
        </span>
        <span className="sr-only">{translateA11y('scrollCue')}</span>
      </a>
    </header>
  );
}
