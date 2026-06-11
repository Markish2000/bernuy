'use client';

import { useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

interface LanguageSwitcherProps {
  readonly label: string;
}

function localeDisplayName(locale: string, displayIn: string): string {
  const [language, region] = locale.split('-');
  try {
    if (region) {
      const regionNames = new Intl.DisplayNames([displayIn], { type: 'region' });
      const languageNames = new Intl.DisplayNames([displayIn], { type: 'language' });
      const regionLabel = regionNames.of(region);
      if (language === 'es') return regionLabel ?? locale;
      return `${languageNames.of(language) ?? language} (${regionLabel})`;
    }
    const languageNames = new Intl.DisplayNames([displayIn], { type: 'language' });
    return languageNames.of(language) ?? locale;
  } catch {
    return locale;
  }
}

/** Cambia el locale (router push localizado). Lista navegable con dropdown. */
export function LanguageSwitcher({ label }: LanguageSwitcherProps) {
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function selectLocale(next: Locale) {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-eyebrow-sm text-text-body transition-colors duration-[350ms] hover:text-[#f3e4b8]"
        disabled={isPending}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {current}
        <svg aria-hidden="true" className="h-3 w-3" fill="none" viewBox="0 0 12 12">
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 z-50 mt-5 max-h-72 w-56 overflow-y-auto rounded-card border border-hairline bg-bg-sunken p-2 backdrop-blur-md"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -8 }}
            role="listbox"
            transition={{ duration: 0.18 }}
          >
            {locales.map((locale) => (
              <li key={locale}>
                <button
                  aria-selected={locale === current}
                  className="flex w-full items-center justify-between rounded-[3px] px-3 py-2 text-left font-sans text-[12.5px] tracking-[0.04em] text-text-body transition-colors hover:bg-accent/10 hover:text-text-primary aria-selected:text-accent"
                  onClick={() => selectLocale(locale)}
                  role="option"
                  type="button"
                >
                  <span>{localeDisplayName(locale, current)}</span>
                  <span className="font-mono text-[10px] text-text-muted">{locale}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
