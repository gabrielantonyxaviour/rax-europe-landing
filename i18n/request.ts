import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { defaultLocale, locales, type Locale } from './config';

export default getRequestConfig(async () => {
  // Priority: 1. Cookie, 2. Accept-Language header, 3. Default
  const cookieStore = await cookies();
  const headerList = await headers();

  let locale: Locale = defaultLocale;

  // Check cookie first
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    locale = cookieLocale as Locale;
  } else {
    // Check Accept-Language header
    const acceptLanguage = headerList.get('accept-language');
    if (acceptLanguage) {
      const browserLocales = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim().split('-')[0]);

      for (const browserLocale of browserLocales) {
        if (locales.includes(browserLocale as Locale)) {
          locale = browserLocale as Locale;
          break;
        }
      }
    }
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
