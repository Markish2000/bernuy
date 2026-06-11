'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/types/product';

interface FragranceCardProps {
  readonly product: Product;
}

/** Card de fragancia: botella + nombre + meta. Hover revela carácter + CTA. */
export function FragranceCard({ product }: FragranceCardProps) {
  const translate = useTranslations();
  const thumb = product.images.find((image) => image.role === 'thumb') ?? product.images[0];

  return (
    <Link
      className="group relative block overflow-hidden rounded-card border border-accent/[0.12] bg-[image:var(--card-gradient)] px-6 pb-[34px] pt-[46px] shadow-card transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-[6px] hover:border-accent/50 hover:shadow-card-hover"
      href={`/fragancias/${product.slug}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-3/5 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center_top,rgba(202,164,90,0.14),rgba(0,0,0,0)_70%)]"
      />

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
        <p className="mt-[14px] font-display text-[17px] italic leading-[1.55] text-text-body">
          {translate(product.taglineKey)}
        </p>
        <span className="mt-[22px] inline-block rounded-[2px] border border-accent/50 px-[30px] py-[11px] font-sans text-[11.5px] uppercase tracking-eyebrow-sm text-[#e7d6a4] transition-colors duration-[400ms] group-hover:bg-accent/90 group-hover:text-[#000000]">
          {translate('collection.explore')}
        </span>
      </div>
    </Link>
  );
}
