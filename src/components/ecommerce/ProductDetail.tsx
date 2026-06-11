import type { ReactNode } from 'react';
import { FragranceDetail } from '@/components/sections/FragranceDetail';
import type { Product } from '@/types/product';

interface ProductDetailProps {
  readonly product: Product;
  readonly purchaseSlot?: ReactNode;
}

/**
 * STUB de tienda: hoy = FragranceDetail. `purchaseSlot` reserva el espacio
 * para AddToCartButton + VariantSelector cuando features.ecommerce esté activo.
 */
export async function ProductDetail({ product, purchaseSlot }: ProductDetailProps) {
  return (
    <>
      <FragranceDetail product={product} />
      {purchaseSlot}
    </>
  );
}
