import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import { buildMetadata } from '@/lib/seo';
import { buildFragranceBreadcrumbLd, buildProductLd } from '@/lib/structured-data';
import { FragranceDetail } from '@/components/sections/FragranceDetail';
import { JsonLd } from '@/components/seo/JsonLd';
import type { FragrancePageProps } from './interfaces';

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
    title: character,
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

  const productLd = buildProductLd(product, translate);
  const breadcrumbLd = buildFragranceBreadcrumbLd({
    character: translate(product.characterKey),
    fragrancesLabel: translateSeo('fragrancesLabel'),
    slug,
  });

  return (
    <>
      <FragranceDetail product={product} />
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />
    </>
  );
}
