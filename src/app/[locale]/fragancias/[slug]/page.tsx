import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';
import { FragranceDetail } from '@/components/sections/FragranceDetail';
import { JsonLd } from '@/components/seo/JsonLd';

interface FragrancePageProps {
  readonly params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({ params }: FragrancePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const translate = await getTranslations({ locale });
  const character = translate(product.characterKey);
  return buildMetadata({
    description: translate(product.descriptionKey),
    locale,
    path: `/fragancias/${slug}`,
    title: `${character} · ${site.name}`,
  });
}

export default async function FragrancePage({ params }: FragrancePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const translate = await getTranslations({ locale });
  const translateSeo = await getTranslations({ locale, namespace: 'seo' });
  const heroImage = product.images.find((image) => image.role === 'hero') ?? product.images[0];

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${site.name} ${product.letter} — ${translate(product.nameKey)}`,
    description: translate(product.descriptionKey),
    brand: { '@type': 'Brand', name: site.name },
    category: translate(product.familyKey),
    image: `${site.url}${heroImage.src}`,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: translateSeo('fragrancesLabel'),
        item: `${site.url}/fragancias`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: translate(product.characterKey),
        item: `${site.url}/fragancias/${slug}`,
      },
    ],
  };

  return (
    <>
      <FragranceDetail product={product} />
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />
    </>
  );
}
