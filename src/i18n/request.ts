import { getRequestConfig } from 'next-intl/server';
import { isLocale, routing } from './routing';
import type { Messages } from './types';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)).default as Messages;

  return { locale, messages };
});
