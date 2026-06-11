'use client';

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { NoteCard } from '@/components/ui/NoteCard';
import type { Product } from '@/types/product';

interface OlfactoryNotesProps {
  readonly product: Product;
}

/** Familia olfativa + pirámide (Salida · Cuerpo · Fondo) con reveal escalonado. */
export function OlfactoryNotes({ product }: OlfactoryNotesProps) {
  const translate = useTranslations();
  const translateDetail = useTranslations('detail');

  return (
    <section
      aria-labelledby="olfactory-title"
      className="mx-auto max-w-content px-5 pb-[110px] pt-24 sm:px-6 lg:px-12"
    >
      <ScrollReveal className="text-center" y={24}>
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-gold-label">
          {translateDetail('olfactory')}
        </p>
        <h2
          className="mt-4 font-display text-[clamp(28px,4.2vw,50px)] font-normal uppercase tracking-[0.12em] text-text-primary"
          id="olfactory-title"
        >
          {translate(product.familyKey)}
        </h2>
      </ScrollReveal>

      <div className="mt-[60px] grid grid-cols-1 gap-[30px] md:grid-cols-3">
        {product.notes.map((note, index) => {
          const tierLabel = translateDetail(`tiers.${note.tier}`);
          return (
            <ScrollReveal key={note.tier} delay={index * 0.12} y={30}>
              <NoteCard
                alt={translateDetail('noteAlt', { tier: tierLabel })}
                image={note.image}
                items={translate(note.itemsKey)}
                tier={note.tier}
                tierLabel={tierLabel}
              />
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
