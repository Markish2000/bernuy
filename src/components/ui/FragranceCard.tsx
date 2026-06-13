'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { FragranceCardProps } from './interfaces';

/** Card de fragancia: botella + nombre + meta; hover revela carácter + tagline + CTA.
 *  `collection` añade glow superior + índice (01…06). */
export function FragranceCard({ product, active = false, variant = 'grid' }: FragranceCardProps) {
  const translate = useTranslations();
  const thumb = product.images.find((image) => image.role === 'thumb') ?? product.images[0];

  const baseLink =
    'group relative block overflow-hidden rounded-card border bg-black transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-[6px]';
  const stateClass = active
    ? 'border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_0_46px_-10px_rgba(220,226,236,0.3),0_22px_60px_-24px_rgba(0,0,0,0.95)]'
    : 'border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_18px_50px_-28px_rgba(0,0,0,0.9)] hover:border-white/30 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.32),0_0_38px_-12px_rgba(220,226,236,0.24),0_20px_56px_-26px_rgba(0,0,0,0.95)]';

  const isCollection = variant === 'collection';

  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={`${baseLink} ${stateClass} px-6 pb-[34px] pt-[46px]`}
      href={`/fragancias/${product.slug}`}
    >
      {isCollection ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(202,164,90,0.10),transparent_70%)]"
          />
          <span className="absolute right-5 top-5 z-10 font-mono text-[10px] tracking-eyebrow-sm text-gold-label">
            {String(product.order).padStart(2, '0')}
          </span>
        </>
      ) : null}
      {active ? (
        <span className="absolute right-4 top-4 z-10 rounded-[2px] border border-white/40 bg-white/10 px-[10px] py-[5px] font-mono text-[9px] uppercase tracking-eyebrow-sm text-white/85">
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
        <div className="mt-[9px] font-mono text-[10.5px] uppercase tracking-eyebrow-sm text-gold-label">
          {translate('collection.size')}
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
