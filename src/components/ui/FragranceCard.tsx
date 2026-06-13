'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { FragranceCardProps } from './interfaces';

/** Card de fragancia: botella + nombre + meta; hover revela carácter + tagline + CTA.
 *  `collection` añade glow superior. */
export function FragranceCard({ product, active = false }: FragranceCardProps) {
  const translate = useTranslations();
  const thumb = product.images.find((image) => image.role === 'thumb') ?? product.images[0];

  const baseLink =
    'group relative block overflow-hidden rounded-card border bg-[color:var(--card-bg)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-[6px]';
  const stateClass = active
    ? 'border-[color:var(--card-edge-active)] shadow-[var(--card-shadow-active)]'
    : 'border-[color:var(--card-edge)] shadow-[var(--card-shadow)] hover:border-[color:var(--card-edge-active)] hover:shadow-[var(--card-shadow-hover)]';

  const sizeKeyByGender: Record<string, string> = {
    masculino: 'collection.sizeMasculine',
    femenino: 'collection.sizeFeminine',
  };
  const sizeKey = sizeKeyByGender[product.gender] ?? 'collection.size';

  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={`${baseLink} ${stateClass} px-6 pb-[34px] pt-[46px]`}
      href={`/fragancias/${product.slug}`}
    >
      {active ? (
        <span className="absolute right-4 top-4 z-10 rounded-[2px] border border-accent/40 bg-accent/10 px-[10px] py-[5px] font-mono text-[9px] uppercase tracking-eyebrow-sm text-accent">
          {translate('collection.current')}
        </span>
      ) : null}
      <div className="relative flex h-[250px] items-center justify-center">
        <Image
          alt={translate(thumb.altKey)}
          className="h-auto w-full max-w-[230px] object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.6)] transition-transform duration-[600ms] ease-premium group-hover:-translate-y-[10px] group-hover:scale-[1.04]"
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
        <div className="mt-[9px] font-mono text-[10.5px] uppercase tracking-eyebrow-sm text-text-muted">
          {translate(sizeKey)}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.88)_28%,rgba(0,0,0,0.99)_62%)] px-6 pb-8 pt-[34px] text-center transition-transform duration-[600ms] ease-premium group-hover:translate-y-0">
        <div className="mx-auto mb-[18px] h-px w-[44px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)]" />
        <div className="font-mono text-[11px] uppercase tracking-eyebrow-sm text-white/65">
          {translate(product.characterKey)}
        </div>
        <p className="mt-[14px] font-display text-[17px] italic leading-[1.55] text-[#e8e8e8]">
          {translate(product.taglineKey)}
        </p>
        <span className="mt-[22px] inline-block rounded-[2px] border border-white/35 bg-white/[0.04] px-[32px] py-[11px] font-sans text-[11.5px] uppercase tracking-eyebrow-sm text-white/90 backdrop-blur-[2px] transition-[background-color,color,border-color,box-shadow] duration-[350ms] hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_24px_-4px_rgba(255,255,255,0.45)]">
          {translate('collection.explore')}
        </span>
      </div>
    </Link>
  );
}
