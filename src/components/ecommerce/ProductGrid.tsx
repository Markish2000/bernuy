import { ProductCard } from '@/components/ecommerce/ProductCard';
import type { Product } from '@/types/product';

interface ProductGridProps {
  readonly products: Product[];
}

/** STUB: grilla reutilizable de ProductCard (extraída de FragranceCollection). */
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="mx-auto grid max-w-content grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
