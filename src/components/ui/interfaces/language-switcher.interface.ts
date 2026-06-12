export interface LanguageSwitcherProps {
  readonly label: string;
  /** Dirección de apertura del dropdown. `up` evita scroll cuando el botón está abajo. */
  readonly placement?: 'down' | 'up';
}
