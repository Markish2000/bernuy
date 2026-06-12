'use client';

import { useState } from 'react';
import type { QuantitySelectorProps } from './interfaces';

/** STUB controlado, sin store. Preparado para el carrito futuro. */
export function QuantitySelector({ initial = 1, max = 9, min = 1 }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initial);

  function decrease() {
    setQuantity((value) => Math.max(min, value - 1));
  }
  function increase() {
    setQuantity((value) => Math.min(max, value + 1));
  }

  return (
    <div className="inline-flex items-center gap-4 border border-hairline px-3 py-2">
      <button aria-label="−" onClick={decrease} type="button">−</button>
      <span className="font-mono text-[13px] text-text-primary">{quantity}</span>
      <button aria-label="+" onClick={increase} type="button">+</button>
    </div>
  );
}
