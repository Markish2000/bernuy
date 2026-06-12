'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { mainNav } from '@/config/navigation';
import { products } from '@/data/products';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';
import type { AppHeaderProps } from './interfaces';

/** Barra fija. `transparent` se solidifica al scrollear; `solid` nace sólida. */
export function AppHeader({ variant = 'transparent' }: AppHeaderProps) {
  const translateNav = useTranslations('nav');
  const translateA11y = useTranslations('a11y');
  const translateProducts = useTranslations('products');
  const [solid, setSolid] = useState(variant === 'solid');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (variant === 'solid') return;

    function handleScroll() {
      setSolid(window.scrollY > 40);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,padding,border-color] duration-500',
          solid
            ? 'border-accent/[0.16] bg-bg-sunken/[0.82] py-[15px] backdrop-blur-[14px]'
            : 'border-transparent py-[22px]',
        )}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 lg:px-12">
          <Logo href="/" label={translateA11y('logoLabel')} size={44} />

          <nav aria-label="Principal" className="hidden items-center gap-11 md:flex">
            {mainNav.map((item) => {
              const linkClass =
                'font-sans text-[12.5px] uppercase tracking-nav text-text-body transition-colors duration-[350ms] hover:text-gold-3';

              if (item.labelKey === 'nav.fragrances') {
                return (
                  <div className="group relative" key={item.labelKey}>
                    <Link className={linkClass} href="/fragancias">
                      {translateNav('fragrances')}
                    </Link>

                    <div className="pointer-events-none absolute left-1/2 top-full z-50 -translate-x-1/2 pt-8 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                      <ul className="min-w-[220px] rounded-md border border-accent/[0.16] bg-bg-sunken/[0.96] py-2 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-[14px]">
                        {products.map((product) => (
                          <li key={product.slug}>
                            <Link
                              className="flex items-center gap-3 px-5 py-2.5 font-sans text-[12.5px] uppercase tracking-nav text-text-body transition-colors duration-200 hover:text-gold-3"
                              href={`/fragancias/${product.slug}`}
                            >
                              <span className="font-serif text-[15px] text-accent">
                                {product.letter}
                              </span>
                              {translateProducts(`${product.slug}.name`)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  className={linkClass}
                  href={item.hash ? `/#${item.hash}` : item.href}
                  key={item.labelKey}
                >
                  {translateNav(item.labelKey.replace('nav.', ''))}
                </Link>
              );
            })}
            <ThemeToggle label={translateA11y('themeToggle')} />
            <LanguageSwitcher label={translateA11y('languageSwitcher')} />
          </nav>

          <button
            aria-expanded={menuOpen}
            aria-label={translateA11y('openMenu')}
            className="font-mono text-[26px] leading-none text-text-primary md:hidden"
            onClick={() => setMenuOpen(true)}
            type="button"
          >
            ☰
          </button>
        </div>
      </header>

      <MobileMenu onClose={() => setMenuOpen(false)} open={menuOpen} />
    </>
  );
}
