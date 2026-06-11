import { defineRouting } from 'next-intl/routing';

export const locales = [
  // Español — Latinoamérica
  'es-AR', 'es-MX', 'es-CL', 'es-CO', 'es-PE', 'es-UY', 'es-PY', 'es-BO',
  'es-EC', 'es-VE', 'es-CR', 'es-GT', 'es-PA', 'es-DO', 'es-HN', 'es-SV',
  'es-NI', 'es-PR',
  // Español genérico (fallback)
  'es',
  // Portugués (Brasil) + Inglés (opcional)
  'pt-BR', 'en-US',
] as const;

export type Locale = (typeof locales)[number];

/** Type guard: ¿`value` es uno de los locales soportados? */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const routing = defineRouting({
  locales,
  defaultLocale: 'es-AR',
  localePrefix: 'as-needed',
  localeDetection: true,
});
