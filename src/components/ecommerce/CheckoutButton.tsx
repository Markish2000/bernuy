import type { CheckoutButtonProps } from './interfaces';

/** STUB deshabilitado. Inicia checkout cuando features.ecommerce esté activo. */
export function CheckoutButton({ label }: CheckoutButtonProps) {
  return (
    <button
      className="w-full rounded-[2px] bg-accent/90 py-3 font-sans text-[12px] uppercase tracking-eyebrow-sm text-[#000000]"
      disabled
      type="button"
    >
      {label}
    </button>
  );
}
