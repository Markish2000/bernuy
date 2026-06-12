import type { ReactNode } from 'react';

export interface SectionTitleProps {
  readonly align?: 'center' | 'left';
  readonly children?: ReactNode;
  readonly eyebrow?: string;
  readonly id?: string;
  readonly subtitle?: string;
  readonly title: string;
}
