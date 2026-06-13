import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Link } from '@/i18n/navigation';
import type { FragrancePagerProps } from './interfaces';

/** Navegación prev/next lineal entre las 6 fragancias (Fragancias → B·E·R·N·U·Y).
 *  En los extremos enlaza al catálogo en vez de hacer wrap cíclico. */
export async function FragrancePager({ product, fragrances }: FragrancePagerProps) {
  const translate = await getTranslations();
  const translateDetail = await getTranslations('detail');
  const translateNav = await getTranslations('nav');

  const ordered = [...fragrances].sort((first, second) => first.order - second.order);
  const total = ordered.length;
  const current = ordered.findIndex((item) => item.slug === product.slug);
  if (current === -1 || total < 2) return null;

  const previousItem = current > 0 ? ordered[current - 1] : null;
  const nextItem = current < total - 1 ? ordered[current + 1] : null;
  const catalogLabel = translateNav('fragrances');

  const previousHref = previousItem ? `/fragancias/${previousItem.slug}` : '/fragancias';
  const previousName = previousItem ? translate(previousItem.nameKey) : catalogLabel;
  const nextHref = nextItem ? `/fragancias/${nextItem.slug}` : '/fragancias';
  const nextName = nextItem ? translate(nextItem.nameKey) : catalogLabel;

  return (
    <nav
      aria-label={translateDetail('nav.label')}
      className="border-t border-accent/15 px-5 py-16 sm:px-6 lg:px-12"
    >
      <ScrollReveal className="mx-auto grid max-w-content grid-cols-2 gap-5" y={20}>
        <Link
          className="group flex items-center gap-4 rounded-pill border border-accent/30 px-6 py-5 transition-colors duration-[400ms] hover:border-accent hover:bg-accent/10"
          href={previousHref}
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
              {previousName}
            </span>
          </span>
        </Link>

        {nextItem ? (
          <Link
            className="group flex items-center justify-end gap-4 rounded-pill border border-accent/30 px-6 py-5 text-right transition-colors duration-[400ms] hover:border-accent hover:bg-accent/10"
            href={nextHref}
          >
            <span className="flex flex-col">
              <span className="font-sans text-[11px] uppercase tracking-eyebrow-sm text-text-muted">
                {translateDetail('nav.next')}
              </span>
              <span className="font-display text-[20px] text-text-primary">
                {nextName}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="font-sans text-[18px] text-gold-3 transition-transform duration-[400ms] ease-premium group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ) : null}
      </ScrollReveal>
    </nav>
  );
}
