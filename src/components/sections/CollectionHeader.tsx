import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { CollectionHeaderProps } from './interfaces';

/** Header del catálogo: eyebrow + título + subtítulo italic sobre halo dorado. */
export function CollectionHeader({ eyebrow, title, subtitle }: CollectionHeaderProps) {
  return (
    <section className="relative overflow-hidden px-5 pb-[30px] pt-[160px] text-center sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_70%_at_50%_0%,rgba(202,164,90,0.12),transparent_70%)]"
      />
      <ScrollReveal className="relative" y={24}>
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-gold-label">{eyebrow}</p>
        <h1 className="mt-5 font-display text-[clamp(42px,7vw,92px)] font-normal uppercase tracking-title text-text-primary">
          {title}
        </h1>
        <p className="mt-3 font-display text-[clamp(16px,2vw,21px)] italic tracking-spec text-gold-label">
          {subtitle}
        </p>
      </ScrollReveal>
    </section>
  );
}
