import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { mainNav } from '@/config/navigation';
import { site } from '@/config/site';
import { Logo } from '@/components/layout/Logo';

/** Footer de 3 columnas (Links · Logo · Contacto) + barra legal. Estático. */
export async function AppFooter() {
  const translateNav = await getTranslations('nav');
  const translateFooter = await getTranslations('footer');
  const translateCommon = await getTranslations('common');
  const translateA11y = await getTranslations('a11y');

  return (
    <footer className="border-t border-accent/[0.14] bg-bg-sunken px-5 pb-8 pt-[72px] sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-content grid-cols-1 items-start gap-12 text-center md:grid-cols-3 md:text-left">
        <div className="md:order-1">
          <h2 className="mb-6 font-mono text-[11px] uppercase tracking-spec text-gold-label">
            {translateFooter('links')}
          </h2>
          <div className="flex flex-col items-center gap-[14px] md:items-start">
            {mainNav.map((item) => (
              <Link
                key={item.labelKey}
                className="font-sans text-[13px] tracking-[0.1em] text-text-body transition-colors duration-[350ms] hover:text-[#f3e4b8]"
                href={`/#${item.hash}`}
              >
                {item.labelKey === 'nav.about' ? translateNav('about') : translateNav('fragrances')}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:order-2">
          <Logo href="/" label={translateA11y('logoLabel')} size={34} />
          <p className="mt-[14px] font-display text-[13px] italic tracking-[0.18em] text-text-muted">
            {translateCommon('tagline')}
          </p>
        </div>

        <div className="md:order-3 md:text-right">
          <h2 className="mb-6 font-mono text-[11px] uppercase tracking-spec text-gold-label">
            {translateFooter('contact')}
          </h2>
          <a
            className="block font-sans text-[13px] tracking-[0.08em] text-text-body transition-colors duration-[350ms] hover:text-[#f3e4b8]"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          <div className="mt-[18px] flex justify-center gap-[18px] md:justify-end">
            <a
              className="font-sans text-xs tracking-[0.16em] text-text-muted transition-colors hover:text-[#f3e4b8]"
              href={site.social.instagram}
              rel="noopener noreferrer"
              target="_blank"
            >
              {translateFooter('instagram')}
            </a>
            <a
              className="font-sans text-xs tracking-[0.16em] text-text-muted transition-colors hover:text-[#f3e4b8]"
              href={site.social.tiktok}
              rel="noopener noreferrer"
              target="_blank"
            >
              {translateFooter('tiktok')}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[54px] max-w-content border-t border-white/5 pt-[22px] text-center">
        <p className="font-sans text-[11px] leading-[1.7] tracking-[0.08em] text-text-muted">
          {translateFooter('legal')}
        </p>
      </div>
    </footer>
  );
}
