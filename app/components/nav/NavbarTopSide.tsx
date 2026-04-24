"use client";

// import { getProfile } from "@/action/apiAction";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NavbarTopSide() {
  const t = useTranslations("MenuPage");
  const pathname = usePathname(); // e.g. /en/aboutus
  const locale = useLocale(); // e.g. en
  const { locales } = useParams();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Remove locale prefix and trailing slash
  const normalizedPath =
    pathname
      .replace(`/${locale}`, "") // remove locale
      .replace(/\/$/, "") || "/"; // remove trailing slash (except root)

  const isActive = (path: string) => normalizedPath === path;

  // useEffect(() => {
  //   async function fetchProfile() {
  //     try {
  //       const profile = await getProfile(); // Call the API
  //       console.log("Profile data:", profile);
  //       if (profile != null) {
  //         setIsAuthenticated(true); // user is logged in
  //       } else {
  //         setIsAuthenticated(false); // not logged in
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch profile:", error);
  //       setIsAuthenticated(false);
  //     }
  //   }

  //   fetchProfile();
  // }, []);

  return (
    <>
      {/* NAVBAR */}
      
      <div className="h-16 flex items-center justify-between px-6 md:px-16 bg-white/5 backdrop-blur">
        <h1 className="text-xl font-bold">ServiceHub</h1>
        <Link href={`${locale}/user/signup/provider`} >
          <button className="bg-amber-400 text-black px-4 py-2 rounded-full font-medium hover:bg-amber-500 transition">
            Sign In
          </button>
        </Link>
      </div>

    </>
  );
}
