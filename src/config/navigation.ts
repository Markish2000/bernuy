/** Estructura de navegación. Sin copy hardcodeado: solo keys i18n + hrefs. */

import type { NavItem } from './interfaces';

export type { NavItem } from './interfaces';

export const mainNav: NavItem[] = [
  { href: '/', labelKey: 'nav.home' },
  { hash: 'fragancias', href: '/', labelKey: 'nav.fragrances' },
];

export const footerLinks: NavItem[] = mainNav;
