'use client';

import { useEffect, useRef } from 'react';
import type { CartDrawerProps } from './interfaces';

/** STUB: panel lateral con estructura + focus trap básico. Sin store de carrito. */
export function CartDrawer({ children, onClose, open, title }: CartDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    panelRef.current?.querySelector<HTMLElement>('button, a')?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      aria-label={title}
      aria-modal="true"
      className="fixed right-0 top-0 z-[80] h-full w-[360px] max-w-[90vw] border-l border-hairline bg-bg-sunken p-6"
      ref={panelRef}
      role="dialog"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[22px] text-text-primary">{title}</h2>
        <button aria-label="✕" onClick={onClose} type="button">✕</button>
      </div>
      {children}
    </div>
  );
}
