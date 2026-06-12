'use client';

import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import type { CollectionFilterProps, CollectionFilterValue } from './interfaces';

const ORDER: CollectionFilterValue[] = ['all', 'men', 'women'];

/** Segmented control (radiogroup ARIA, navegable con ←/→) Todos · Para él · Para ella. */
export function CollectionFilter({ value, labels, onChange }: CollectionFilterProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + direction + ORDER.length) % ORDER.length;
    onChange(ORDER[next]);
    refs.current[next]?.focus();
  }

  return (
    <div
      aria-label={labels.all}
      className="inline-flex rounded-pill border border-accent/20 bg-accent/[0.04] p-[5px]"
      role="radiogroup"
    >
      {ORDER.map((option, index) => {
        const selected = value === option;
        return (
          <button
            key={option}
            ref={(node) => {
              refs.current[index] = node;
            }}
            aria-checked={selected}
            className={`relative rounded-pill px-[26px] py-[11px] font-sans text-[11.5px] uppercase tracking-eyebrow-sm transition-colors duration-[400ms] ${
              selected
                ? 'font-medium text-[#0a0908]'
                : 'font-light text-text-body hover:text-gold-3'
            }`}
            onClick={() => onChange(option)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            role="radio"
            tabIndex={selected ? 0 : -1}
            type="button"
          >
            {selected && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-pill bg-[linear-gradient(180deg,var(--gold-4),var(--gold-5))]"
                layoutId="collection-filter-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative">{labels[option]}</span>
          </button>
        );
      })}
    </div>
  );
}
