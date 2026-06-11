'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { Product } from '@/types/product';

interface ExclusiveShowcaseProps {
  readonly product: Product;
}

/** "Una fragancia exclusiva": botella + estuche en gran formato + frase editorial. */
export function ExclusiveShowcase({ product }: ExclusiveShowcaseProps) {
  const translate = useTranslations();
  const translateDetail = useTranslations('detail');
  const bottle = product.images.find((image) => image.role === 'bottle');
  const box = product.images.find((image) => image.role === 'box');
  const showcaseImages = [bottle, box].filter((image) => image !== undefined);

  return (
    <section
      aria-labelledby="exclusive-title"
      className="px-5 pb-10 pt-24 text-center sm:px-6 lg:px-12"
      id="exclusiva"
    >
      <ScrollReveal y={28}>
        <h2
          className="font-display text-[clamp(30px,4.4vw,52px)] font-normal uppercase tracking-[0.14em] text-text-primary"
          id="exclusive-title"
        >
          {translateDetail('exclusive')}
        </h2>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-eyebrow text-gold-label">
          {translateDetail('exclusiveEyebrow')}
        </p>
      </ScrollReveal>

      {showcaseImages.map((image, index) => (
        <ScrollReveal
          key={image.role}
          className={index === 0 ? 'mx-auto mt-14 max-w-showcase' : 'mx-auto mt-[30px] max-w-showcase'}
        >
          <div className="overflow-hidden rounded-md border border-accent/[0.12] shadow-hero-img">
            <Image
              alt={translate(image.altKey)}
              className="h-auto w-full"
              height={image.height}
              sizes="(max-width: 1100px) 100vw, 1100px"
              src={image.src}
              width={image.width}
            />
          </div>
        </ScrollReveal>
      ))}

      <ScrollReveal y={20}>
        <p className="mx-auto mt-[46px] max-w-[720px] font-display text-[clamp(20px,2.6vw,30px)] italic tracking-[0.06em] text-text-primary">
          {translate(product.quoteKey)}
        </p>
      </ScrollReveal>
    </section>
  );
}
