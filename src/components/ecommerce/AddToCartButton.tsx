import type { AddToCartButtonProps } from './interfaces';

/** STUB: deshabilitado hasta activar features.ecommerce. Sin lógica de carrito. */
export function AddToCartButton({ label, variantId }: AddToCartButtonProps) {
  return (
    <button
      className="rounded-[2px] border border-accent/50 px-[30px] py-[11px] font-sans text-[11.5px] uppercase tracking-eyebrow-sm text-text-muted"
      data-variant-id={variantId}
      disabled
      type="button"
    >
      {label}
    </button>
  );
}
