import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {messages} from '@/i18n';


export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
   <>
   <div >
    
       {children}

   </div>
   </>
  );
}