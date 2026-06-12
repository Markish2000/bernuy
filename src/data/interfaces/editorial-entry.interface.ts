export interface EditorialEntry {
  bodyKey: string;
  image: { alt: string; height: number; src: string; width: number };
  index: number;
  key: 'elegancia' | 'personalidad' | 'sensualidad';
  reverse: boolean; // true → texto a la izquierda, imagen a la derecha
  titleKey: string;
}
