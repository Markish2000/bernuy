import { setRequestLocale } from 'next-intl/server';
import { getAllProducts } from '@/lib/products';
import { editorial } from '@/data/editorial';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { HeroSection } from '@/components/sections/HeroSection';
import { EditorialBlock } from '@/components/sections/EditorialBlock';
import { FragranceCollection } from '@/components/sections/FragranceCollection';
import { ScrollProgressIndicator } from '@/components/animations/ScrollProgressIndicator';

interface LandingPageProps {
  readonly params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = await getAllProducts();
  const monogram = products.map((product) => ({ letter: product.letter, slug: product.slug }));

  return (
    <>
      <ScrollProgressIndicator />
      <AppHeader variant="transparent" />
      <main>
        <HeroSection fragrances={monogram} />

        <section
          aria-label="Nosotros"
          className="mx-auto max-w-content px-5 pb-[30px] pt-10 sm:px-6 lg:px-12"
          id="nosotros"
        >
          {editorial.map((entry) => (
            <EditorialBlock
              key={entry.key}
              bodyKey={entry.bodyKey}
              image={entry.image}
              index={entry.index}
              reverse={entry.reverse}
              titleKey={entry.titleKey}
            />
          ))}
        </section>

        <FragranceCollection fragrances={products} />
      </main>
      <AppFooter />
    </>
  );
}
