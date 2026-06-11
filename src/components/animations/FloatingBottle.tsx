'use client';

import Image from 'next/image';

interface FloatingBottleProps {
  readonly alt: string;
  readonly height: number;
  readonly maxWidth?: number;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly src: string;
  readonly width: number;
}

/**
 * Botella PNG flotante (hero de detalle): float loop + drop-shadow.
 * El loop se congela en reduced-motion vía la clase global `animate-float-bottle`.
 */
export function FloatingBottle({
  alt,
  height,
  maxWidth = 420,
  priority = false,
  sizes = '(max-width: 1024px) 80vw, 420px',
  src,
  width,
}: FloatingBottleProps) {
  return (
    <Image
      alt={alt}
      className="animate-float-bottle h-auto w-full drop-shadow-[0_44px_70px_rgba(0,0,0,0.7)]"
      height={height}
      priority={priority}
      sizes={sizes}
      src={src}
      style={{ maxWidth: `${maxWidth}px` }}
      width={width}
    />
  );
}
