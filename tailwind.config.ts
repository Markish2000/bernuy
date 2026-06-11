import type { Config } from 'tailwindcss';

/**
 * Tokens semánticos mapeados a CSS variables (ver src/styles/tokens.css).
 * Dark es el tema nativo; light es la adaptación documentada.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-sunken': 'var(--bg-sunken)',
        'surface-card': 'var(--surface-card)',
        'text-primary': 'var(--text-primary)',
        'text-body': 'var(--text-body)',
        'text-muted': 'var(--text-muted)',
        'gold-label': 'var(--gold-label)',
        'gold-1': 'var(--gold-1)',
        'gold-2': 'var(--gold-2)',
        'gold-3': 'var(--gold-3)',
        'gold-4': 'var(--gold-4)',
        'gold-5': 'var(--gold-5)',
        accent: 'var(--accent)',
        hairline: 'var(--hairline)',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-jost)', 'Jost', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
        detail: '1200px',
        monogram: '1500px',
        showcase: '1100px',
      },
      borderRadius: {
        img: '3px',
        card: '4px',
        md: '6px',
        pill: '20px',
      },
      boxShadow: {
        img: '0 30px 80px rgba(0,0,0,.55)',
        card: '0 24px 60px rgba(0,0,0,.5)',
        'card-hover': '0 30px 70px rgba(0,0,0,.6)',
        'note-hover': '0 34px 80px rgba(0,0,0,.62)',
        'hero-img': '0 40px 95px rgba(0,0,0,.55)',
      },
      letterSpacing: {
        eyebrow: '.30em',
        'eyebrow-sm': '.24em',
        nav: '.28em',
        spec: '.32em',
        title: '.16em',
        h2: '.18em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(.16,1,.3,1)',
        sweep: 'cubic-bezier(.5,0,.2,1)',
        knob: 'cubic-bezier(.4,0,.2,1)',
      },
    },
  },
  plugins: [],
};

export default config;
