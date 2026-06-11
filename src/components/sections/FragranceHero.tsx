'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FloatingBottle } from '@/components/animations/FloatingBottle';
import type { Product } from '@/types/product';

interface FragranceHeroProps {
  readonly product: Product;
}

/** Hero de producto: back-link + carácter + specs + botella flotante. */
export function FragranceHero({ product }: FragranceHeroProps) {
  const translate = useTranslations();
  const translateDetail = useTranslations('detail');
  const heroImage = product.images.find((image) => image.role === 'hero') ?? product.images[0];

  return (
    <header className="relative flex min-h-screen items-center overflow-hidden px-5 pt-[120px] sm:px-6 lg:px-12" id="top">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[30%] h-[620px] w-[620px] max-w-[90vw] bg-[radial-gradient(circle,rgba(202,164,90,0.10)_0%,rgba(202,164,90,0.03)_40%,rgba(0,0,0,0)_70%)]"
      />

      <div className="relative mx-auto grid w-full max-w-detail grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 md:order-1">
          <Link
            className="mb-7 inline-flex items-center gap-[9px] font-mono text-[11px] uppercase tracking-eyebrow-sm text-text-muted transition-colors duration-[350ms] hover:text-accent"
            href="/#fragancias"
          >
            <span aria-hidden="true">←</span>
            {translateDetail('back')}
          </Link>

          <h1 className="font-display text-[clamp(38px,5.4vw,72px)] font-medium uppercase leading-[1.04] tracking-[0.07em] text-text-primary">
            {translate(product.characterKey)}
          </h1>

          <div className="my-[30px] h-px w-[56px] bg-[linear-gradient(90deg,#caa45a,rgba(202,164,90,0))]" />

          <p className="max-w-[520px] font-sans text-[14.5px] font-light leading-[2] tracking-[0.02em] text-text-body">
            {translate(product.descriptionKey)}
          </p>

          <div className="mt-10 flex gap-[30px]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-eyebrow-sm text-accent">
                {translateDetail('specs.format')}
              </div>
              <div className="mt-[6px] font-display text-[21px] text-text-primary">
                {translateDetail('specs.formatValue')}
              </div>
            </div>
            <div className="w-px bg-accent/[0.18]" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-eyebrow-sm text-accent">
                {translateDetail('specs.family')}
              </div>
              <div className="mt-[6px] font-display text-[21px] text-text-primary">
                {translate(product.specFamilyKey)}
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 flex items-center justify-center md:order-2">
          <FloatingBottle
            alt={translate(heroImage.altKey)}
            height={heroImage.height}
            priority
            src={heroImage.src}
            width={heroImage.width}
          />
        </div>
      </div>
    </header>
  );
}
