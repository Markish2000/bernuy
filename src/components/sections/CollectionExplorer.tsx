'use client';

import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CollectionFilter } from './CollectionFilter';
import type { CollectionExplorerProps, CollectionFilterValue } from './interfaces';

/**
 * Estado del filtro (cliente) + visibilidad de los grupos.
 * Ambos grupos se renderizan en server y permanecen en el DOM (SEO); el filtro
 * sólo alterna su visibilidad — sin navegación ni recarga.
 */
export function CollectionExplorer({ labels, men, women }: CollectionExplorerProps) {
  const [filter, setFilter] = useState<CollectionFilterValue>('all');

  // Al cambiar el filtro, un grupo oculto puede subir al viewport. Sus ScrollTrigger
  // tienen posiciones cacheadas (stale) y no se disparan solos → recalcular layout.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

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
