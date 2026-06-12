import type { Product } from '@/types/product';

/**
 * MOCK de las 6 fragancias (B·E·R·N·U·Y). Único archivo que cambia al migrar a API.
 * Copy visible → messages.products.<slug>.* (i18n). Aquí solo estructura + keys.
 * Variantes: hoy un único 100 ml con precio placeholder.
 */

function bottleHero(slug: string) {
  return {
    altKey: `products.${slug}.images.bottle`,
    height: 358,
    role: 'hero' as const,
    src: `/assets/products/${slug}/perfume-bottle-${slug}.png`,
    width: 322,
  };
}
function bottleDetail(slug: string) {
  return {
    altKey: `products.${slug}.images.bottleDetail`,
    height: 741,
    role: 'bottle' as const,
    src: `/assets/products/${slug}/perfume-packshot-${slug}.png`,
    width: 1113,
  };
}
function bottleThumb(slug: string) {
  return {
    altKey: `products.${slug}.images.thumb`,
    height: 358,
    role: 'thumb' as const,
    src: `/assets/products/${slug}/perfume-bottle-${slug}-thumb.png`,
    width: 322,
  };
}
function box(slug: string) {
  return {
    altKey: `products.${slug}.images.box`,
    height: 788,
    role: 'box' as const,
    src: `/assets/products/${slug}/perfume-banner-${slug}.png`,
    width: 1136,
  };
}
function lifestyle(slug: string) {
  return {
    altKey: `products.${slug}.images.lifestyle`,
    height: 649,
    role: 'lifestyle' as const,
    src: `/assets/products/${slug}/lifestyle-${slug}.png`,
    width: 1136,
  };
}
function notes(slug: string) {
  return [
    {
      image: `/assets/products/${slug}/note-top-${slug}.png`,
      itemsKey: `products.${slug}.notes.top`,
      tier: 'top' as const,
    },
    {
      image: `/assets/products/${slug}/note-heart-${slug}.png`,
      itemsKey: `products.${slug}.notes.heart`,
      tier: 'heart' as const,
    },
    {
      image: `/assets/products/${slug}/note-base-${slug}.png`,
      itemsKey: `products.${slug}.notes.base`,
      tier: 'base' as const,
    },
  ];
}
function variant100(slug: string, price: number) {
  return [
    {
      available: true,
      currency: 'ARS',
      id: `${slug}-100`,
      price,
      size: 100,
      sku: `BERNUY-${slug.toUpperCase()}-100`,
      stock: 25,
    },
  ];
}

function makeProduct(
  slug: string,
  letter: string,
  order: number,
  gender: Product['gender'],
  price: number,
): Product {
  return {
    availableSizes: [100],
    characterKey: `products.${slug}.character`,
    descriptionKey: `products.${slug}.description`,
    familyKey: `products.${slug}.family`,
    featured: true,
    gender,
    id: slug,
    images: [bottleHero(slug), bottleDetail(slug), box(slug), bottleThumb(slug), lifestyle(slug)],
    intensity: 'eau-de-parfum',
    letter,
    nameKey: `products.${slug}.name`,
    notes: notes(slug),
    order,
    quoteKey: `products.${slug}.quote`,
    slug,
    specFamilyKey: `products.${slug}.specFamily`,
    taglineKey: `products.${slug}.tagline`,
    variants: variant100(slug, price),
  };
}

export const products: Product[] = [
  makeProduct('b', 'B', 1, 'masculino', 89000),
  makeProduct('e', 'E', 2, 'femenino', 89000),
  makeProduct('r', 'R', 3, 'masculino', 89000),
  makeProduct('n', 'N', 4, 'femenino', 89000),
  makeProduct('u', 'U', 5, 'unisex', 89000),
  makeProduct('y', 'Y', 6, 'femenino', 89000),
];
