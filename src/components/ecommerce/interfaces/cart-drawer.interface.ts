import type { ReactNode } from 'react';

export interface CartDrawerProps {
  readonly children?: ReactNode;
  readonly onClose: () => void;
  readonly open: boolean;
  readonly title: string;
}
