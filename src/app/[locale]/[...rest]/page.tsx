import { notFound } from 'next/navigation';

/**
 * Catch-all: cualquier ruta no resuelta bajo el locale dispara la 404 de marca
 * ([locale]/not-found.tsx) en vez del 404 por defecto de Next.
 */
export default function CatchAllNotFound() {
  notFound();
}
