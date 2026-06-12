import type { Theme } from '../types';

export interface ThemeContextValue {
  readonly setTheme: (theme: Theme) => void;
  readonly theme: Theme;
  readonly toggleTheme: () => void;
}
