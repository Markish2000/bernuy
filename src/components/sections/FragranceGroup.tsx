import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { FragranceCard } from '@/components/ui/FragranceCard';
import type { FragranceGroupProps } from './interfaces';

/** Grupo por género: encabezado (eyebrow · título · hairline · conteo) + grilla de cards. */
export function FragranceGroup({ eyebrow, title, count, items }: FragranceGroupProps) {
  return (
    <div>
      <ScrollReveal
        className="mb-[46px] flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5"
        y={20}
      >
        <p className="shrink-0 font-mono text-[11px] uppercase tracking-eyebrow text-gold-label">
          {eyebrow}
        </p>
        <h2 className="min-w-0 break-words font-display text-[clamp(28px,3.4vw,42px)] font-normal uppercase tracking-[0.14em] text-text-primary sm:shrink-0">
          {title}
        </h2>
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(202,164,90,0.4),transparent)] sm:block"
        />
        <p className="shrink-0 font-mono text-[10.5px] uppercase tracking-eyebrow-sm text-text-muted">
          {count}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product, index) => (
          <ScrollReveal key={product.slug} delay={index * 0.09} y={26}>
            <FragranceCard product={product} variant="collection" />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
