"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarTopSide() {
  const t = useTranslations("MenuPage");
  const pathname = usePathname();
  const locale = useLocale();

  // Normalize path (remove locale prefix)
  const normalizedPath =
    pathname.replace(`/${locale}`, "").replace(/\/$/, "") || "/";

  const isActive = (path: string) => normalizedPath === path;

  return (
    <div className="h-16 flex items-center justify-between px-6 md:px-16 bg-white/5 backdrop-blur z-50">
      <h1 className="text-xl font-bold">ServiceHub</h1>

      <Link
        href={`/${locale}/user/signin`}
        className="bg-amber-300 text-black px-4 py-2 rounded-full font-medium  transition inline-block"
      >
        Sign In
      </Link>
    </div>
  );
}