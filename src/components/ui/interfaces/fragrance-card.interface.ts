import type { Product } from '@/types/product';

export interface FragranceCardProps {
  readonly product: Product;
  readonly active?: boolean;
  /** 'grid' = landing (overlay hover); 'collection' = catálogo (índice + carácter centrados). */
  readonly variant?: 'grid' | 'collection';
}
