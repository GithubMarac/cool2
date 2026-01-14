import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'hr'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/recepies': {
      en: '/recepies',
      hr: '/recepti'
    },
    '/recepies/new': {
      en: '/recepies/new',
      hr: '/recepti/novi'
    },
    '/recepies/[slug]': {
      en: '/recepies/[slug]',
      hr: '/recepti/[slug]'
    },
    '/recepies/[slug]/edit': {
      en: '/recepies/[slug]/edit',
      hr: '/recepti/[slug]/uredi'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);