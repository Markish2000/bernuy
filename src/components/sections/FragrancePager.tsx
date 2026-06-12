import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Link } from '@/i18n/navigation';
import type { FragrancePagerProps } from './interfaces';

/** Navegación prev/next cíclica entre las 6 fragancias (B·E·R·N·U·Y). */
export async function FragrancePager({ product, fragrances }: FragrancePagerProps) {
  const translate = await getTranslations();
  const translateDetail = await getTranslations('detail');

  const ordered = [...fragrances].sort((first, second) => first.order - second.order);
  const total = ordered.length;
  const current = ordered.findIndex((item) => item.slug === product.slug);
  if (current === -1 || total < 2) return null;

  const previous = ordered[(current - 1 + total) % total];
  const next = ordered[(current + 1) % total];

  return (
    <nav
      aria-label={translateDetail('nav.label')}
      className="border-t border-accent/15 px-5 py-16 sm:px-6 lg:px-12"
    >
      <ScrollReveal className="mx-auto grid max-w-content grid-cols-2 gap-5" y={20}>
        <Link
          className="group flex items-center gap-4 rounded-pill border border-accent/30 px-6 py-5 transition-colors duration-[400ms] hover:border-accent hover:bg-accent/10"
          href={`/fragancias/${previous.slug}`}
        >
          <span
            aria-hidden="true"
            className="font-sans text-[18px] text-gold-3 transition-transform duration-[400ms] ease-premium group-hover:-translate-x-1"
          >
            ←
          </span>
          <span className="flex flex-col">
            <span className="font-sans text-[11px] uppercase tracking-eyebrow-sm text-text-muted">
              {translateDetail('nav.prev')}
            </span>
            <span className="font-display text-[20px] text-text-primary">
              {translate(previous.nameKey)}
            </span>
          </span>
        </Link>

        <Link
          className="group flex items-center justify-end gap-4 rounded-pill border border-accent/30 px-6 py-5 text-right transition-colors duration-[400ms] hover:border-accent hover:bg-accent/10"
          href={`/fragancias/${next.slug}`}
        >
          <span className="flex flex-col">
            <span className="font-sans text-[11px] uppercase tracking-eyebrow-sm text-text-muted">
              {translateDetail('nav.next')}
            </span>
            <span className="font-display text-[20px] text-text-primary">
              {translate(next.nameKey)}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="font-sans text-[18px] text-gold-3 transition-transform duration-[400ms] ease-premium group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </ScrollReveal>
    </nav>
  );
}
