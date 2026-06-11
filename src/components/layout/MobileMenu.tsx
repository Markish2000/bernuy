'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { mainNav } from '@/config/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface MobileMenuProps {
  readonly onClose: () => void;
  readonly open: boolean;
}

/** Panel de navegación mobile con focus trap básico y cierre con Esc. */
export function MobileMenu({ onClose, open }: MobileMenuProps) {
  const translateNav = useTranslations('nav');
  const translateA11y = useTranslations('a11y');
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerReturnRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;

    triggerReturnRef.current = document.activeElement;
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (triggerReturnRef.current instanceof HTMLElement) {
        triggerReturnRef.current.focus();
      }
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label={translateA11y('openMenu')}
          aria-modal="true"
          className="fixed inset-0 z-[70] flex flex-col bg-bg-sunken/95 backdrop-blur-xl md:hidden"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          ref={panelRef}
          role="dialog"
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-end px-5 py-6">
            <button
              aria-label={translateA11y('closeMenu')}
              className="font-mono text-[11px] uppercase tracking-eyebrow text-text-body hover:text-accent"
              onClick={onClose}
              type="button"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-10">
            {mainNav.map((item) => (
              <Link
                key={item.labelKey}
                className="font-sans text-base uppercase tracking-nav text-text-primary transition-colors hover:text-[#f3e4b8]"
                href={`/#${item.hash}`}
                onClick={onClose}
              >
                {item.labelKey === 'nav.about' ? translateNav('about') : translateNav('fragrances')}
              </Link>
            ))}
            <div className="mt-6 flex items-center gap-8">
              <ThemeToggle label={translateA11y('themeToggle')} />
              <LanguageSwitcher label={translateA11y('languageSwitcher')} />
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
