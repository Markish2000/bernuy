import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

/**
 * 404 de marca (dentro del layout localizado).
 * Atmósfera: glow oro + monograma fantasma. Copy → messages.notFound.*
 */
export default async function NotFound() {
  const translate = await getTranslations('notFound');

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Atmósfera (decorativa): halo de oro + wordmark fantasma. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(var(--accent-rgb),0.16) 0%, rgba(var(--accent-rgb),0) 62%)',
          }}
        />
        <Image
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 w-[min(1080px,148vw)] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.05]"
          height={184}
          priority
          src="/assets/brand/logo-full.png"
          width={384}
        />
      </div>

      <div className="relative flex flex-col items-center">
        <span className="font-mono text-[11px] uppercase tracking-eyebrow text-gold-label">
          {translate('eyebrow')}
        </span>

        <p className="gold-text mt-[18px] font-display text-[clamp(96px,20vw,220px)] font-light leading-[0.82]">
          404
        </p>

        <span aria-hidden="true" className="mt-[30px] h-px w-[60px] bg-accent/55" />

        <h1 className="mt-[30px] max-w-[16ch] font-display text-[clamp(26px,4.4vw,44px)] font-normal tracking-title text-text-primary">
          {translate('title')}
        </h1>

        <p className="mt-[18px] max-w-[44ch] font-sans text-[14px] font-light leading-[2] tracking-[0.02em] text-text-body">
          {translate('body')}
        </p>

        <div className="mt-[44px] flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
          <Link
            className="inline-block rounded-[2px] border border-accent/60 bg-accent/90 px-[34px] py-[13px] font-sans text-[11.5px] uppercase tracking-eyebrow-sm text-[#000000] transition-[transform,box-shadow,background-color] duration-[400ms] ease-premium hover:-translate-y-[2px] hover:bg-accent hover:shadow-[0_18px_40px_rgba(var(--accent-rgb),0.32)]"
            href="/"
          >
            {translate('home')}
          </Link>
          <Link
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-eyebrow text-text-muted transition-colors duration-300 hover:text-accent"
            href="/#fragancias"
          >
            {translate('fragrances')}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
