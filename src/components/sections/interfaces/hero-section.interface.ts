import type { Product } from '@/types/product';

export interface HeroSectionProps {
  readonly fragrances: Pick<Product, 'letter' | 'slug'>[];
}
