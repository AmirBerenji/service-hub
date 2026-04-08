import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {messages} from '@/i18n';
import ContactTopSide from '@/app/components/nav/ContactTopSide';
import NavbarTopSide from '@/app/components/nav/NavbarTopSide';

export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
   <>
   <div >

<ContactTopSide/>
<NavbarTopSide/>
    
       {children}

   </div>
   </>
  );
}