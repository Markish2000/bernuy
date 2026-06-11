import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const LETTERS = [
  { char: 'b', width: 97 },
  { char: 'e', width: 96 },
  { char: 'r', width: 93 },
  { char: 'n', width: 101 },
  { char: 'u', width: 106 },
  { char: 'y', width: 104 },
] as const;

const NATURAL_HEIGHT = 318;

interface LogoProps {
  readonly className?: string;
  readonly href?: string;
  readonly label: string;
  readonly size?: number;
}

/**
 * Monograma BERNUY con las 6 letras-imagen. El contenedor lleva aria-label
 * único y cada <img> alt="" (decorativas) para no leerlas letra por letra.
 */
export function Logo({ className, href = '/', label, size = 24 }: LogoProps) {
  const letters = LETTERS.map(({ char, width }) => (
    <Image
      key={char}
      alt=""
      aria-hidden="true"
      height={NATURAL_HEIGHT}
      src={`/assets/brand/logo-letter-${char}.png`}
      style={{ height: `${size}px`, width: 'auto' }}
      width={width}
    />
  ));

  const gap = size <= 24 ? 'gap-[5px]' : 'gap-[7px]';

  if (href) {
    return (
      <Link
        aria-label={label}
        className={`inline-flex items-end ${gap} ${className ?? ''}`}
        href={href}
      >
        {letters}
      </Link>
    );
  }

  return (
    <span aria-label={label} className={`inline-flex items-end ${gap} ${className ?? ''}`}>
      {letters}
    </span>
  );
}
