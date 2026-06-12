import type { Product } from '@/types/product';

export interface FragranceCollectionProps {
  readonly fragrances: Product[];
  readonly activeSlug?: string;
}
