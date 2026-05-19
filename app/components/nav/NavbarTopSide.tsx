"use client";

import { getProfile } from "@/action/apiAction";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NavbarTopSide() {
  const t = useTranslations("MenuPage");
  const pathname = usePathname();
  const locale = useLocale();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Normalize path (remove locale prefix)
  const normalizedPath =
    pathname.replace(`/${locale}`, "").replace(/\/$/, "") || "/";

  const isActive = (path: string) => normalizedPath === path;

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getProfile(); // Call the API
        console.log("Profile data:", profile);
        if (profile != null) {
          setIsAuthenticated(true); // user is logged in
        } else {
          setIsAuthenticated(false); // not logged in
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setIsAuthenticated(false);
      }
    }

    fetchProfile();
  }, []);

  return (
    <div className="h-16 flex items-center justify-between px-6 md:px-16 bg-white/5 backdrop-blur z-50">
      <h1 className="text-xl font-bold">ServiceHub</h1>

      <div>
        {!isAuthenticated ? (
          <>
            <Link
              href={`/${locale}/user/signup/client`}
              className="text-amber-500 mr-5  font-medium  transition inline-block"
            >
              Sign up
            </Link>

            <Link
              href={`/${locale}/user/signin`}
              className="bg-amber-300 text-black px-4 py-2 rounded-full font-medium  transition inline-block"
            >
              Sign In
            </Link>
          </>
        ) : (
          <>
            <div></div>
          </>
        )}
      </div>
    </div>
  );
}
