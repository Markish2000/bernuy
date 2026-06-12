'use client';

import { useState } from 'react';
import { CollectionFilter } from './CollectionFilter';
import type { CollectionExplorerProps, CollectionFilterValue } from './interfaces';

/**
 * Estado del filtro (cliente) + visibilidad de los grupos.
 * Ambos grupos se renderizan en server y permanecen en el DOM (SEO); el filtro
 * sólo alterna su visibilidad — sin navegación ni recarga.
 */
export function CollectionExplorer({ labels, men, women }: CollectionExplorerProps) {
  const [filter, setFilter] = useState<CollectionFilterValue>('all');

  return (
    <>
      <div className="mb-[70px] flex justify-center">
        <CollectionFilter labels={labels} onChange={setFilter} value={filter} />
      </div>

      <div className="flex flex-col gap-[46px]">
        <div className={filter === 'women' ? 'hidden' : undefined}>{men}</div>
        <div className={filter === 'men' ? 'hidden' : undefined}>{women}</div>
      </div>
    </>
  );
}
