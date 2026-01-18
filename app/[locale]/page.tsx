import { redirect } from '@/i18n/routing';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  redirect({
    href: '/recipes',
    locale: locale
  });
}