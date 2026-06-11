import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  readonly align?: 'center' | 'left';
  readonly children?: ReactNode;
  readonly eyebrow?: string;
  readonly id?: string;
  readonly subtitle?: string;
  readonly title: string;
}

/** Título de sección reutilizable: eyebrow (mono) + h2 (display) + subtítulo italic. */
export function SectionTitle({
  align = 'center',
  children,
  eyebrow,
  id,
  subtitle,
  title,
}: SectionTitleProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left')}>
      {eyebrow ? (
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-gold-label">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="font-display text-[clamp(28px,4.4vw,52px)] font-normal tracking-h2 text-text-primary"
        id={id}
      >
        {children ?? title}
      </h2>
      {subtitle ? (
        <p className="mt-[14px] font-display text-[18px] italic tracking-spec text-gold-label">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
