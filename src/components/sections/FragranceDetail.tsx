import { getTranslations } from 'next-intl/server';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { ScrollProgressIndicator } from '@/components/animations/ScrollProgressIndicator';
import { FragranceHero } from '@/components/sections/FragranceHero';
import { ScrollCueBar } from '@/components/sections/ScrollCueBar';
import { ExclusiveShowcase } from '@/components/sections/ExclusiveShowcase';
import { LifestyleImage } from '@/components/sections/LifestyleImage';
import { OlfactoryNotes } from '@/components/sections/OlfactoryNotes';
import { FragranceCollection } from '@/components/sections/FragranceCollection';
import { FragrancePager } from '@/components/sections/FragrancePager';
import { getAllProducts } from '@/lib/products';
import type { FragranceDetailProps } from './interfaces';

/** Plantilla única data-driven de detalle (las 6 fragancias comparten layout). */
export async function FragranceDetail({ product }: FragranceDetailProps) {
  const translate = await getTranslations();
  const translateDetail = await getTranslations('detail');
  const lifestyle = product.images.find((image) => image.role === 'lifestyle');
  const allProducts = await getAllProducts();

  return (
    <>
      <ScrollProgressIndicator />
      <AppHeader variant="solid" />
      <main>
        <FragranceHero product={product} />
        <ScrollCueBar label={translateDetail('scrollCue')} targetId="exclusiva" />
        <ExclusiveShowcase product={product} />
        {lifestyle ? (
          <LifestyleImage
            alt={translate(lifestyle.altKey)}
            height={lifestyle.height}
            src={lifestyle.src}
            width={lifestyle.width}
          />
        ) : null}
        <OlfactoryNotes product={product} />
        <FragranceCollection activeSlug={product.slug} fragrances={allProducts} />
        <FragrancePager fragrances={allProducts} product={product} />
      </main>
      <AppFooter />
    </>
  );
}
