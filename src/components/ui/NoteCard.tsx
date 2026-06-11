'use client';

import Image from 'next/image';
import type { NoteTier } from '@/types/product';

interface NoteCardProps {
  readonly alt: string;
  readonly image: string;
  readonly items: string;
  readonly tierLabel: string;
  readonly tier: NoteTier;
}

/** Tarjeta de capa olfativa: imagen 3/4 + título de capa + lista de notas. */
export function NoteCard({ alt, image, items, tierLabel }: NoteCardProps) {
  return (
    <div>
      <div className="group relative aspect-[3/4] overflow-hidden rounded-card border border-accent/[0.12] shadow-card transition-[transform,box-shadow] duration-[550ms] ease-premium hover:-translate-y-[6px] hover:shadow-note-hover">
        <Image
          alt={alt}
          className="h-full w-full object-cover"
          fill
          sizes="(max-width: 1024px) 100vw, 380px"
          src={image}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_60%,rgba(0,0,0,0.55)_100%)]"
        />
      </div>
      <h3 className="mt-6 font-display text-[27px] font-medium tracking-title text-text-primary">
        {tierLabel}
      </h3>
      <div className="my-[14px] h-px w-[30px] bg-accent/50" />
      <p className="font-mono text-[11px] uppercase leading-[1.9] tracking-[0.2em] text-text-body">
        {items}
      </p>
    </div>
  );
}
