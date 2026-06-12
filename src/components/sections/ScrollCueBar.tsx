import type { ScrollCueBarProps } from './interfaces';

/** Barra full-width entre secciones: frase italic + flecha oro animada. */
export function ScrollCueBar({ label, targetId }: ScrollCueBarProps) {
  return (
    <a
      className="flex items-center justify-center gap-[14px] border-y border-accent/[0.14] bg-white/[0.012] px-6 py-[26px] transition-colors duration-[400ms] hover:bg-accent/5"
      href={`#${targetId}`}
    >
      <span className="font-display text-[18px] italic tracking-[0.08em] text-text-body">
        {label}
      </span>
      <span aria-hidden="true" className="animate-bob-arrow text-[15px] text-accent">
        ↓
      </span>
    </a>
  );
}
