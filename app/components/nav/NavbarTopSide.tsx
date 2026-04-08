"use client";

// import { getProfile } from "@/action/apiAction";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NavbarTopSide() {
  const t = useTranslations("MenuPage");
  const pathname = usePathname(); // e.g. /en/aboutus
  const locale = useLocale(); // e.g. en

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
    <header className="relative bg-slate-50 pt-6 pb-10 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center ">
          <img src="/assets/images/logo.png" className="w-9 mr-2 -mt-2" />
          <span className="font-bold text-2xl text-blue-400">Service</span>
          <span className="font-bold text-2xl text-[#2f3e4e] tracking-wide">
            Hub
          </span>
        </div>

        <nav className="mt-4 sm:mt-0 flex space-x-6 text-sm text-gray-600 font-semibold">
          {/* <Link
            href="/"
            className={`relative ${isActive("/") ? "text-[#ff9a5a] after:absolute after:-bottom-1 after:left-0 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#ff9a5a]" : "hover:text-[#ff9a5a]"}`}
          >
            {t("home")}
          </Link> */}

          <Link
            href={`/${locale}/`}
            className={`relative ${
              isActive("/") ? "text-blue-400" : "hover:text-blue-400"
            }`}
          >
            Home
          </Link>

          <Link
            href={`/${locale}/aboutus`}
            className={`relative ${
              isActive("/aboutus") ? "text-blue-400" : "hover:text-blue-400"
            }`}
          >
            About Us
          </Link>

          <Link
            href={`/${locale}/services`}
            className={`relative ${
              isActive("/services") ? "text-blue-400" : "hover:text-blue-400"
            }`}
          >
            Services
          </Link>

          <Link
            href={`/${locale}/contact`}
            className={`relative ${
              isActive("/contact") ? "text-blue-400" : "hover:text-blue-400"
            }`}
          >
            Contact
          </Link>
        </nav>

        {!isAuthenticated ? (
          <Link
            href={`/${locale}/user/signup`}
            className="mt-4 sm:mt-0 bg-blue-400 text-white text-sm font-semibold rounded-full px-5 py-2 hover:bg-blue-500 transition flex items-center space-x-1"
          >
            <span>Sign up</span>
            <i className="fas fa-chevron-down text-xs"></i>
          </Link>
        ):(
          <>
          <div>
            
          </div>
          </>
        )}
      </div>
    </header>
  );
}
