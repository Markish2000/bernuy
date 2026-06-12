'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import type { ThemeToggleProps } from './interfaces';

/** Pista 46×24 con knob dorado que desliza. Persiste tema en localStorage. */
export function ThemeToggle({ label }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      aria-label={label}
      aria-pressed={isDark}
      className="relative h-6 w-[46px] flex-none rounded-pill border border-accent/45 bg-accent/10"
      onClick={toggleTheme}
      type="button"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#f6e6b4] to-[#c9a253] shadow-[0_0_8px_rgba(202,164,90,0.5)] transition-[left] duration-[400ms] ease-knob"
        style={{ left: isDark ? '3px' : '25px' }}
      />
    </button>
  );
}
