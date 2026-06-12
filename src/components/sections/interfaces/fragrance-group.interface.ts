import type { Product } from '@/types/product';

export interface FragranceGroupProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly count: string;
  readonly items: Product[];
}
