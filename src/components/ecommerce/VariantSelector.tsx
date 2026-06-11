'use client';

import { useState } from 'react';

interface VariantSelectorProps {
  readonly availableSizes: number[];
}

/** STUB: lee availableSizes (hoy [100]). Sin efecto sobre el carrito. */
export function VariantSelector({ availableSizes }: VariantSelectorProps) {
  const [selected, setSelected] = useState(availableSizes[0]);

  return (
    <div className="inline-flex gap-2">
      {availableSizes.map((size) => (
        <button
          key={size}
          aria-pressed={size === selected}
          className="border border-hairline px-4 py-2 font-mono text-[12px] text-text-body aria-pressed:border-accent aria-pressed:text-accent"
          onClick={() => setSelected(size)}
          type="button"
        >
          {size} ml
        </button>
      ))}
    </div>
  );
}
