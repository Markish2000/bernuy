import type { Metadata } from 'next';
import { locales, routing } from '@/i18n/routing';
import { site } from '@/config/site';

interface BuildMetadataArgs {
  readonly description: string;
  readonly locale: string;
  readonly path: string; // ej: '' (home) | '/fragancias/b'
  readonly title: string;
}

function localizedPath(locale: string, path: string): string {
  const suffix = path || '/';
  if (locale === routing.defaultLocale) return suffix;
  return `/${locale}${path}`;
}

/** Construye Metadata por locale con hreflang de todos los locales + x-default. */
export function buildMetadata({ description, locale, path, title }: BuildMetadataArgs): Metadata {
  const languages: Record<string, string> = {};
  for (const candidate of locales) {
    languages[candidate] = localizedPath(candidate, path);
  }
  languages['x-default'] = localizedPath(routing.defaultLocale, path);

  const tabTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: tabTitle,
      template: `%s | ${site.name}`,
    },
    description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale,
      title: tabTitle,
      description,
      url: localizedPath(locale, path),
      images: [{ url: '/assets/og/og-default.png', width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tabTitle,
      description,
    },
  };
}
