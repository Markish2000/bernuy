import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Usar SIEMPRE este Link (no el de next/link) para URLs localizadas.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
