import { FragranceCard } from '@/components/ui/FragranceCard';
import type { ProductCardProps } from './interfaces';

/**
 * STUB de tienda: hoy = FragranceCard. Reserva slots `price` y `action`
 * para precio/CTA cuando features.ecommerce esté activo.
 */
export function ProductCard({ action, price, product }: ProductCardProps) {
  return (
    <div>
      <FragranceCard product={product} />
      {price ? <div className="mt-3 text-center">{price}</div> : null}
      {action ? <div className="mt-3 text-center">{action}</div> : null}
    </div>
  );
}
