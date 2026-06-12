/** Contenido de los 3 bloques editoriales. Copy → messages.editorial.* (i18n). */

import type { EditorialEntry } from './interfaces';

export type { EditorialEntry } from './interfaces';

export const editorial: EditorialEntry[] = [
  {
    bodyKey: 'editorial.elegancia.body',
    image: {
      alt: 'editorial.elegancia.alt',
      height: 350,
      src: '/assets/editorial/editorial-elegancia.png',
      width: 450,
    },
    index: 1,
    key: 'elegancia',
    reverse: false,
    titleKey: 'editorial.elegancia.title',
  },
  {
    bodyKey: 'editorial.personalidad.body',
    image: {
      alt: 'editorial.personalidad.alt',
      height: 350,
      src: '/assets/editorial/editorial-personalidad.png',
      width: 450,
    },
    index: 2,
    key: 'personalidad',
    reverse: true,
    titleKey: 'editorial.personalidad.title',
  },
  {
    bodyKey: 'editorial.sensualidad.body',
    image: {
      alt: 'editorial.sensualidad.alt',
      height: 350,
      src: '/assets/editorial/editorial-sensualidad.png',
      width: 450,
    },
    index: 3,
    key: 'sensualidad',
    reverse: false,
    titleKey: 'editorial.sensualidad.title',
  },
];
