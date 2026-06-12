'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { mainNav } from '@/config/navigation';
import { products } from '@/data/products';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import type { MobileMenuProps } from './interfaces';

/** Panel de navegación mobile con focus trap básico y cierre con Esc. */
export function MobileMenu({ onClose, open }: MobileMenuProps) {
  const translateNav = useTranslations('nav');
  const translateA11y = useTranslations('a11y');
  const translateProducts = useTranslations('products');
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerReturnRef = useRef<Element | null>(null);
  const [fragrancesOpen, setFragrancesOpen] = useState(false);

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

  // Reinicia el acordeón cada vez que se cierra el panel.
  useEffect(() => {
    if (!open) setFragrancesOpen(false);
  }, [open]);

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

          <nav className="flex flex-1 flex-col items-center gap-8 overflow-y-auto px-6 pb-12 pt-4">
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {mainNav.map((item) => {
                if (item.labelKey === 'nav.fragrances') {
                  return (
                    <div className="flex flex-col items-center gap-5" key={item.labelKey}>
                      <button
                        aria-controls="mobile-fragrances"
                        aria-expanded={fragrancesOpen}
                        className="flex items-center gap-2 font-sans text-base uppercase tracking-nav text-text-primary transition-colors hover:text-[#f3e4b8]"
                        onClick={() => setFragrancesOpen((value) => !value)}
                        type="button"
                      >
                        {translateNav('fragrances')}
                        <span
                          aria-hidden="true"
                          className={`text-accent transition-transform duration-300 ${
                            fragrancesOpen ? 'rotate-180' : ''
                          }`}
                        >
                          ⌄
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {fragrancesOpen ? (
                          <motion.ul
                            animate={{ height: 'auto', opacity: 1 }}
                            className="flex flex-col items-start gap-4 overflow-hidden"
                            exit={{ height: 0, opacity: 0 }}
                            id="mobile-fragrances"
                            initial={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {products.map((product) => (
                              <li key={product.slug}>
                                <Link
                                  className="flex items-center gap-3 font-sans text-[13px] uppercase tracking-nav text-text-body transition-colors hover:text-gold-3"
                                  href={`/fragancias/${product.slug}`}
                                  onClick={onClose}
                                >
                                  <span className="w-4 text-center font-serif text-[16px] text-accent">
                                    {product.letter}
                                  </span>
                                  {translateProducts(`${product.slug}.name`)}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    className="font-sans text-base uppercase tracking-nav text-text-primary transition-colors hover:text-[#f3e4b8]"
                    href={item.hash ? `/#${item.hash}` : item.href}
                    key={item.labelKey}
                    onClick={onClose}
                  >
                    {translateNav(item.labelKey.replace('nav.', ''))}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-8 pt-2">
              <ThemeToggle label={translateA11y('themeToggle')} />
              <LanguageSwitcher label={translateA11y('languageSwitcher')} />
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
