import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getAllProducts } from '@/lib/products';
import { buildMetadata } from '@/lib/seo';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { ScrollProgressIndicator } from '@/components/animations/ScrollProgressIndicator';
import { CollectionHeader } from '@/components/sections/CollectionHeader';
import { BrandOriginBand } from '@/components/sections/BrandOriginBand';
import { CollectionExplorer } from '@/components/sections/CollectionExplorer';
import { FragranceGroup } from '@/components/sections/FragranceGroup';
import type { CollectionPageProps } from './interfaces';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { locale } = await params;
  const translate = await getTranslations({ locale, namespace: 'collection.catalog' });
  return buildMetadata({
    description: translate('subtitle'),
    locale,
    path: '/fragancias',
    title: translate('title'),
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const translate = await getTranslations('collection.catalog');
  const products = await getAllProducts();
  const men = products.filter((product) => product.gender === 'masculino');
  const women = products.filter((product) => product.gender === 'femenino');

  return (
    <>
      <ScrollProgressIndicator />
      <AppHeader variant="solid" />
      <main>
        <CollectionHeader
          eyebrow={translate('eyebrow')}
          subtitle={translate('subtitle')}
          title={translate('title')}
        />

        <BrandOriginBand
          alt={translate('origin.alt')}
          eyebrow={translate('origin.eyebrow')}
          headline={translate('origin.headline')}
          height={941}
          src="/assets/collection/bernuy-composicion.png"
          width={1672}
        />

        <section
          aria-label={translate('title')}
          className="mx-auto max-w-content px-5 pb-[110px] pt-4 sm:px-6 lg:px-12"
        >
          <CollectionExplorer
            labels={{
              all: translate('filter.all'),
              men: translate('filter.men'),
              women: translate('filter.women'),
            }}
            men={
              <FragranceGroup
                count={translate('count', { count: men.length })}
                eyebrow={translate('groups.men.eyebrow')}
                items={men}
                title={translate('groups.men.title')}
              />
            }
            women={
              <FragranceGroup
                count={translate('count', { count: women.length })}
                eyebrow={translate('groups.women.eyebrow')}
                items={women}
                title={translate('groups.women.title')}
              />
            }
          />
        </section>
      </main>
      <AppFooter />
    </>
  );
}
