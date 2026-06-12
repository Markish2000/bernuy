import { defineRouting } from 'next-intl/routing';
import type { Locale } from './types';

export type { Locale } from './types';

export const locales = [
  'es', // Español
  'en', // Inglés
  'pt', // Portugués
  'fr', // Francés
] as const;

/** Type guard: ¿`value` es uno de los locales soportados? */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const routing = defineRouting({
  locales,
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: true,
});
