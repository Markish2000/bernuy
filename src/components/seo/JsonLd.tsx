import type { JsonLdProps } from './interfaces';

/** Inserta un bloque JSON-LD. El contenido es generado por nosotros (no input de usuario). */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
