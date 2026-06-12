import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { LogoProps } from './interfaces';

const NATURAL_WIDTH = 384;
const NATURAL_HEIGHT = 184;

/**
 * Logo BERNUY (imagen única). El contenedor lleva aria-label y el <img>
 * alt="" (decorativa) para no leer el nombre dos veces.
 */
export function Logo({ className, href = '/', label, onClick, size = 24 }: LogoProps) {
  const image = (
    <Image
      alt="Bernuy"
      aria-hidden="true"
      height={NATURAL_HEIGHT}
      priority
      src="/assets/brand/logo-full.png"
      style={{ height: `${size}px`, width: 'auto' }}
      width={NATURAL_WIDTH}
    />
  );

  const motion =
    'transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ' +
    'will-change-transform hover:scale-[1.05] active:scale-95 active:duration-150';

  if (href) {
    return (
      <Link
        aria-label={label}
        className={`inline-flex items-center ${motion} ${className ?? ''}`}
        href={href}
        onClick={onClick}
      >
        {image}
      </Link>
    );
  }

  return (
    <span aria-label={label} className={`inline-flex items-center ${motion} ${className ?? ''}`}>
      {image}
    </span>
  );
}
