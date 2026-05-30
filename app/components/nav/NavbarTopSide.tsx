"use client";

import { getProfile } from "@/action/apiAction";
import { Profile } from "@/model/auth";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function NavbarTopSide() {
  const locale = useLocale();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await getProfile();
        setProfile(profileData ?? null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setProfile(null);
      }
    }

    fetchProfile();
  }, []);

  return (
    <div className="h-16 flex items-center justify-between px-6 md:px-16 bg-white/5 backdrop-blur z-50">
      <h1 className="text-xl font-bold">ServiceHub</h1>

      <div>
        {profile ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">Welcome</span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-slate-900">
              {profile.name || profile.email}
            </span>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
