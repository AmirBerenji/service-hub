import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { messages } from '@/i18n';
import '../globals.css';
import LocationSaver from './LocationSaver';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ✅ FIX

  const localeMessages = messages[locale as keyof typeof messages];

  if (!localeMessages) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={localeMessages}>
          <LocationSaver /> {/* 👈 runs on client */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}