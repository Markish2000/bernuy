'use client';

import { useState } from 'react';

type CopyLinkButtonProps = {
  /** URL a copiar al portapapeles. */
  url: string;
  /** Texto en estado normal (p. ej. "Copiar enlace"). */
  label: string;
  /** Texto tras copiar (p. ej. "Copiado"). */
  copiedLabel: string;
};

/** Botón que copia la URL del sitio al portapapeles. Pensado para compartir en Instagram, donde no existe share-intent web. */
export function CopyLinkButton({ url, label, copiedLabel }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard bloqueado (contexto no seguro / permisos): no hacemos nada.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="font-sans text-xs tracking-[0.16em] text-text-muted transition-colors hover:text-gold-3"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
