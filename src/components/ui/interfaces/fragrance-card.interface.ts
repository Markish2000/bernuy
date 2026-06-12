import type { Product } from '@/types/product';

export interface FragranceCardProps {
  readonly product: Product;
  readonly active?: boolean;
}
