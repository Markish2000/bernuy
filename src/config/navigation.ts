/** Estructura de navegación. Sin copy hardcodeado: solo keys i18n + hrefs. */

import type { NavItem } from './interfaces';

export type { NavItem } from './interfaces';

export const mainNav: NavItem[] = [
  { hash: 'nosotros', href: '/', labelKey: 'nav.about' },
  { hash: 'fragancias', href: '/', labelKey: 'nav.fragrances' },
];

export const footerLinks: NavItem[] = mainNav;
