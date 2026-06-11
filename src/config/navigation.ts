/** Estructura de navegación. Sin copy hardcodeado: solo keys i18n + hrefs. */

export interface NavItem {
  hash: string; // ancla dentro del home
  href: string;
  labelKey: string;
}

export const mainNav: NavItem[] = [
  { hash: 'nosotros', href: '/', labelKey: 'nav.about' },
  { hash: 'fragancias', href: '/', labelKey: 'nav.fragrances' },
];

export const footerLinks: NavItem[] = mainNav;
