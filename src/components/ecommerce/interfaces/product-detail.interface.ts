import type { ReactNode } from 'react';
import type { Product } from '@/types/product';

export interface ProductDetailProps {
  readonly product: Product;
  readonly purchaseSlot?: ReactNode;
}
