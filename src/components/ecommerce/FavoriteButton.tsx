'use client';

import { useState } from 'react';

interface FavoriteButtonProps {
  readonly label: string;
  readonly productId: string;
}

/** STUB local sin persistencia. Activable con features.favorites. */
export function FavoriteButton({ label, productId }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);

  return (
    <button
      aria-label={label}
      aria-pressed={favorite}
      className="text-[18px] text-accent"
      data-product-id={productId}
      onClick={() => setFavorite((value) => !value)}
      type="button"
    >
      {favorite ? '♥' : '♡'}
    </button>
  );
}
