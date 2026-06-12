import type { ReactNode } from 'react';
import type { RevealVariant } from '../types';

export interface AnimatedTextRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly variant?: RevealVariant;
}
