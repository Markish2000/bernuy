import type { MetadataRoute } from 'next';
import { locales, routing } from '@/i18n/routing';
import { getAllProducts } from '@/lib/products';
import { site } from '@/config/site';

function url(locale: string, path: string): string {
  const suffix = path || '/';
  if (locale === routing.defaultLocale) return `${site.url}${suffix}`;
  return `${site.url}/${locale}${path}`;
}

function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = url(locale, path);
  }
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const paths = [
    '',
    '/fragancias',
    ...products.map((product) => `/fragancias/${product.slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: url(locale, path),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
