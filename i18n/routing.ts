import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'hr'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/recipes': {
      en: '/recipes',
      hr: '/recepti'
    },
    '/recipes/new': {
      en: '/recipes/new',
      hr: '/recepti/novi'
    },
    '/recipes/[slug]': {
      en: '/recipes/[slug]',
      hr: '/recepti/[slug]'
    },
    '/recipes/[slug]/edit': {
      en: '/recipes/[slug]/edit',
      hr: '/recepti/[slug]/uredi'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);