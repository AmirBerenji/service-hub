"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    // Remove the current locale prefix from the pathname
    const segments = pathname.split("/");
    segments[1] = nextLocale; // Replace locale segment

    const newPathname = segments.join("/") || "/";
    
    startTransition(() => {
      router.replace(newPathname);
    });
  };

  return (
    <label className="border-0 rounded p-0 text-[15px]">
      <p className="sr-only">Change language</p>
      <select
        defaultValue={locale}
        className="bg-transparent py-2"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="hy">Armenian</option>
        <option value="ru">Russian</option>
      </select>
    </label>
  );
}
