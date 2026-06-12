'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { FragranceCardProps } from './interfaces';

/** Card de fragancia: botella + nombre + meta. Hover revela carácter + CTA. */
export function FragranceCard({ product, active = false }: FragranceCardProps) {
  const translate = useTranslations();
  const thumb = product.images.find((image) => image.role === 'thumb') ?? product.images[0];

  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={`group relative block overflow-hidden rounded-card border bg-[image:var(--card-gradient)] px-6 pb-[34px] pt-[46px] shadow-card transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-[6px] hover:shadow-card-hover ${
        active
          ? 'border-accent shadow-card-hover'
          : 'border-accent/[0.12] hover:border-accent/50'
      }`}
      href={`/fragancias/${product.slug}`}
    >
      {active ? (
        <span className="absolute right-4 top-4 z-10 rounded-[2px] border border-accent/60 bg-accent/10 px-[10px] py-[5px] font-mono text-[9px] uppercase tracking-eyebrow-sm text-accent">
          {translate('collection.current')}
        </span>
      ) : null}
      <div className="relative flex h-[210px] items-center justify-center">
        <Image
          alt={translate(thumb.altKey)}
          className="max-h-[210px] w-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.6)] transition-transform duration-[600ms] ease-premium group-hover:-translate-y-[10px] group-hover:scale-[1.04]"
          height={thumb.height}
          sizes="(max-width: 640px) 80vw, 360px"
          src={thumb.src}
          width={thumb.width}
        />
      </div>

      <div className="relative mt-[26px] transition-[opacity,transform] duration-[400ms] group-hover:translate-y-2 group-hover:opacity-0">
        <div className="font-display text-[25px] tracking-[0.1em] text-text-primary">
          {translate(product.nameKey)}
        </div>
        <div className="mt-[9px] font-mono text-[10.5px] uppercase tracking-eyebrow-sm text-gold-label">
          {translate('collection.size')}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.82)_26%,rgba(0,0,0,0.97)_60%)] px-6 pb-8 pt-[30px] text-center transition-transform duration-[600ms] ease-premium group-hover:translate-y-0">
        <div className="mx-auto mb-[18px] h-px w-[34px] bg-accent/55" />
        <div className="font-mono text-[11px] uppercase tracking-eyebrow-sm text-[#d8c089]">
          {translate(product.characterKey)}
        </div>
        <p className="mt-[14px] font-display text-[17px] italic leading-[1.55] text-[#d6d6d6]">
          {translate(product.taglineKey)}
        </p>
        <span className="mt-[22px] inline-block rounded-[2px] border border-accent/50 px-[30px] py-[11px] font-sans text-[11.5px] uppercase tracking-eyebrow-sm text-[#e7d6a4] transition-colors duration-[400ms] group-hover:bg-accent/90 group-hover:text-[#000000]">
          {translate('collection.explore')}
        </span>
      </div>
    </Link>
  );
}
