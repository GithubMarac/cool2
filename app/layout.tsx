import "./globals.css";
import { routing } from "@/i18n/routing";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = routing.defaultLocale;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}