import type { PriceTagProps } from './interfaces';

/** Formatea precio por locale. Stub: usado cuando features.ecommerce esté activo. */
export function PriceTag({ currency, locale, value }: PriceTagProps) {
  const formatted = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  return <span className="font-sans text-[14px] tracking-[0.04em] text-text-primary">{formatted}</span>;
}
