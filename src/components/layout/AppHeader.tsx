'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { mainNav } from '@/config/navigation';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  readonly variant?: 'solid' | 'transparent';
}

/** Barra fija. `transparent` se solidifica al scrollear; `solid` nace sólida. */
export function AppHeader({ variant = 'transparent' }: AppHeaderProps) {
  const translateNav = useTranslations('nav');
  const translateA11y = useTranslations('a11y');
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
          <Logo href="/" label={translateA11y('logoLabel')} size={24} />

          <nav aria-label="Principal" className="hidden items-center gap-11 md:flex">
            {mainNav.map((item) => (
              <Link
                key={item.labelKey}
                className="font-sans text-[12.5px] uppercase tracking-nav text-text-body transition-colors duration-[350ms] hover:text-[#f3e4b8]"
                href={`/#${item.hash}`}
              >
                {item.labelKey === 'nav.about' ? translateNav('about') : translateNav('fragrances')}
              </Link>
            ))}
            <ThemeToggle label={translateA11y('themeToggle')} />
            <LanguageSwitcher label={translateA11y('languageSwitcher')} />
          </nav>

          <button
            aria-expanded={menuOpen}
            aria-label={translateA11y('openMenu')}
            className="font-mono text-[18px] text-text-primary md:hidden"
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
