/**
 * Contrato de producto — fuente de verdad compartible con la futura API.
 * El copy visible (nombre, carácter, descripción, familia, notas) vive en
 * `messages/<locale>.json` y se referencia por key i18n; aquí solo viajan
 * datos estructurales + las keys de traducción.
 */

export type Gender = 'masculino' | 'femenino' | 'unisex';
export type Intensity = 'eau-de-toilette' | 'eau-de-parfum' | 'parfum' | 'extrait';
export type NoteTier = 'top' | 'heart' | 'base';

export type ImageRole =
  | 'bottle'
  | 'bottle-no-cap'
  | 'cap'
  | 'three-quarter'
  | 'box'
  | 'lifestyle'
  | 'hero'
  | 'thumb'
  | 'atomizer'
  | 'mist';

export interface OlfactoryNote {
  image: string; // ruta del asset de esa capa
  itemsKey: string; // key i18n → 'Bergamota · Ozono · Lima'
  tier: NoteTier;
}

export interface ProductImage {
  altKey: string; // key i18n para el alt (a11y/SEO)
  height: number;
  role: ImageRole;
  src: string;
  width: number;
}

export interface ProductVariant {
  available: boolean;
  currency: string; // 'ARS' | 'BRL' | 'USD'…
  id: string;
  price: number;
  size: number; // ml: 30 | 50 | 100
  sku: string;
  stock: number; // 0 = agotado
}

export interface Product {
  availableSizes: number[];
  characterKey: string; // i18n: display del hero ("Rebelde y aventurero")
  descriptionKey: string; // i18n
  familyKey: string; // i18n: "Fougère Aromática Amaderada"
  featured: boolean;
  gender: Gender;
  id: string;
  images: ProductImage[];
  intensity: Intensity;
  letter: string; // 'B'… (monograma del hero)
  nameKey: string; // i18n: nombre comercial ("Audaz")
  notes: OlfactoryNote[]; // 3 capas: top / heart / base
  order: number; // orden en la grilla (B,E,R,N,U,Y)
  quoteKey: string; // i18n: frase editorial del detalle
  slug: string; // 'b' | 'e' | 'r' | 'n' | 'u' | 'y'
  specFamilyKey: string; // i18n: familia corta del spec ("Fougère Amaderada")
  taglineKey: string; // i18n
  variants: ProductVariant[];
  // ---- campos de tienda (preparados, sin usar aún) ----
  badges?: ('new' | 'bestseller' | 'limited')[];
  basePrice?: number;
  currency?: string;
}
