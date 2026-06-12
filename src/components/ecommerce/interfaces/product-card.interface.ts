import type { ReactNode } from 'react';
import type { Product } from '@/types/product';

export interface ProductCardProps {
  readonly action?: ReactNode;
  readonly price?: ReactNode;
  readonly product: Product;
}
