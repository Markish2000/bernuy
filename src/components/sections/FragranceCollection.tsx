import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { FragranceCard } from '@/components/ui/FragranceCard';
import type { FragranceCollectionProps } from './interfaces';

/** Colección: título + grilla de 6 FragranceCard (reveal escalonado). */
export async function FragranceCollection({ fragrances, activeSlug }: FragranceCollectionProps) {
  const translate = await getTranslations('collection');

  return (
    <section
      aria-labelledby="fragrances-title"
      className="px-5 pb-[110px] pt-20 text-center sm:px-6 lg:px-12"
      id="fragancias"
    >
      <ScrollReveal y={30}>
        <h2
          className="font-display text-[clamp(34px,5vw,58px)] font-normal uppercase tracking-h2 text-text-primary"
          id="fragrances-title"
        >
          {translate('title')}
        </h2>
        <p className="mt-[14px] font-display text-[18px] italic tracking-spec text-accent">
          {translate('subtitle')}
        </p>
      </ScrollReveal>

      <div className="mx-auto mt-16 grid max-w-content grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {fragrances.map((product, index) => (
          <ScrollReveal key={product.slug} delay={index * 0.1} y={30}>
            <FragranceCard active={product.slug === activeSlug} product={product} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
