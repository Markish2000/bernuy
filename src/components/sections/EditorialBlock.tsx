'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { AnimatedTextReveal } from '@/components/animations/AnimatedTextReveal';
import { cn } from '@/lib/utils';

interface EditorialBlockImage {
  readonly alt: string;
  readonly height: number;
  readonly src: string;
  readonly width: number;
}

interface EditorialBlockProps {
  readonly bodyKey: string;
  readonly image: EditorialBlockImage;
  readonly index: number;
  readonly reverse?: boolean;
  readonly titleKey: string;
}

/** Bloque editorial: número + título sweep + párrafo + imagen, lado alternable. */
export function EditorialBlock({
  bodyKey,
  image,
  index,
  reverse = false,
  titleKey,
}: EditorialBlockProps) {
  const translate = useTranslations();
  const number = String(index).padStart(2, '0');

  const imageColumn = (
    <div
      className={cn(
        'relative aspect-[4/5] overflow-hidden rounded-img border border-accent/[0.16] shadow-img',
        reverse ? 'md:order-2' : 'md:order-1',
      )}
    >
      <Image
        alt={translate(image.alt)}
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100vw, 560px"
        src={image.src}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_58%,rgba(0,0,0,0.4)_100%)]"
      />
    </div>
  );

  const textColumn = (
    <div className={cn(reverse ? 'md:order-1' : 'md:order-2')}>
      <span className="font-mono text-[11px] tracking-eyebrow text-accent">{number}</span>
      <div className="my-[14px] mb-[26px] overflow-hidden">
        <AnimatedTextReveal
          className="inline-block whitespace-nowrap font-display text-[46px] font-normal tracking-title text-text-primary"
          variant="sweep"
        >
          {translate(titleKey)}
        </AnimatedTextReveal>
      </div>
      <p className="font-sans text-[14px] font-light leading-[2] tracking-[0.02em] text-text-body">
        {translate(bodyKey)}
      </p>
    </div>
  );

  return (
    <ScrollReveal className="grid grid-cols-1 items-center gap-[72px] py-[70px] md:grid-cols-2">
      {imageColumn}
      {textColumn}
    </ScrollReveal>
  );
}
