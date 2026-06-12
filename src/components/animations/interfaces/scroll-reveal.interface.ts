import type { ReactNode } from 'react';

export interface ScrollRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly duration?: number;
  readonly once?: boolean;
  readonly y?: number;
}
