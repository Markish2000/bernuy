import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const NATURAL_WIDTH = 384;
const NATURAL_HEIGHT = 184;

interface LogoProps {
  readonly className?: string;
  readonly href?: string;
  readonly label: string;
  readonly size?: number;
}

/**
 * Logo BERNUY (imagen única). El contenedor lleva aria-label y el <img>
 * alt="" (decorativa) para no leer el nombre dos veces.
 */
export function Logo({ className, href = '/', label, size = 24 }: LogoProps) {
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

  if (href) {
    return (
      <Link
        aria-label={label}
        className={`inline-flex items-center ${className ?? ''}`}
        href={href}
      >
        {image}
      </Link>
    );
  }

  return (
    <span aria-label={label} className={`inline-flex items-center ${className ?? ''}`}>
      {image}
    </span>
  );
}
