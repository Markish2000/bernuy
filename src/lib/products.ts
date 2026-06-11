import { products } from '@/data/products';
import type { Product } from '@/types/product';

/**
 * Capa de aislamiento mock → API. Los componentes SOLO consumen estas funciones.
 * Migrar a backend = reescribir el cuerpo (fetch + revalidación). UI intacta.
 */

export async function getAllProducts(): Promise<Product[]> {
  return [...products].sort((first, second) => first.order - second.order);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((product) => product.featured);
}
