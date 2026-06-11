import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { isLocale, routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';
import { ThemeProvider, themeInitScript } from '@/components/providers/ThemeProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import '@/styles/globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const translate = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({
    description: translate('home.description'),
    locale,
    path: '',
    title: translate('home.title'),
  });
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const translateA11y = await getTranslations({ locale, namespace: 'a11y' });

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/assets/brand/logo-letter-b.png`,
    sameAs: [site.social.instagram, site.social.tiktok],
  };

  return (
    <html className={`${cormorant.variable} ${jost.variable} dark`} lang={locale} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip-link" href="#top">
          {translateA11y('skipToContent')}
        </a>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
