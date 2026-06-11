import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

/** 404 dentro del layout localizado. */
export default async function NotFound() {
  const translateNav = await getTranslations('nav');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="gold-text font-display text-[clamp(64px,12vw,140px)] leading-none">404</p>
      <Link
        className="font-mono text-[11px] uppercase tracking-eyebrow text-text-body transition-colors hover:text-accent"
        href="/"
      >
        ← {translateNav('about')}
      </Link>
    </main>
  );
}
