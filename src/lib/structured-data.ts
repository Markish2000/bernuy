/**
 * Builders de JSON-LD (schema.org) reutilizables.
 * El copy llega traducido vía `translate` (key i18n → string).
 */

import type { Product } from '@/types/product';
import { site } from '@/config/site';
import type { JsonLd, Translate } from './types';
import type { FragranceBreadcrumbArgs } from './interfaces';

const SCHEMA_CONTEXT = 'https://schema.org';

/** JSON-LD de tipo Organization para el layout raíz. */
export function buildOrganizationLd(): JsonLd {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/assets/brand/logo-letter-b.png`,
    sameAs: [site.social.instagram, site.social.facebook],
  };
}

/** Imagen hero del producto (fallback a la primera). */
function heroImageSrc(product: Product): string {
  const hero = product.images.find((image) => image.role === 'hero') ?? product.images[0];
  return `${site.url}${hero.src}`;
}

/** JSON-LD de tipo Product para la ficha de fragancia. */
export function buildProductLd(product: Product, translate: Translate): JsonLd {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Product',
    name: `${site.name} ${product.letter} — ${translate(product.nameKey)}`,
    description: translate(product.descriptionKey),
    brand: { '@type': 'Brand', name: site.name },
    category: translate(product.familyKey),
    image: heroImageSrc(product),
  };
}

/** JSON-LD BreadcrumbList: Home → Fragancias → ficha. */
export function buildFragranceBreadcrumbLd({
  character,
  fragrancesLabel,
  slug,
}: FragranceBreadcrumbArgs): JsonLd {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: fragrancesLabel,
        item: `${site.url}/fragancias`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: character,
        item: `${site.url}/fragancias/${slug}`,
      },
    ],
  };
}
