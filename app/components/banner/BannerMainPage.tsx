import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function BannerMainPage() {
  const t = useTranslations("BannerMainPage");
  return (
    <>
       {/* HERO CONTENT */}
        <div className="grid md:grid-cols-2 flex-1 px-6 md:px-16 pt-10">

          {/* LEFT */}
          <div className="flex flex-col justify-center space-y-6 max-w-xl">

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Find Trusted Services <br />
              <span className="text-amber-400">Near You</span>
            </h1>

            <div className="text-slate-300 text-lg -mt-7">
              Discover the best local professionals in seconds.
            </div>

            {/* SEARCH */}
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg w-full ">

              <input
                type="text"
                placeholder="Search for services..."
                className="flex-1 px-5 py-3 text-black outline-none"
              />

              <button className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 font-semibold transition">
                Search
              </button>

            </div>

          </div>

          {/* RIGHT (IMAGE STICKS TO BOTTOM) */}
          <div className="hidden md:flex items-end justify-end h-full relative">

            <Image
              src="/assets/images/service-hub.png"
              alt="services"
              width={2000}
              height={2000}
              className="absolute bottom-0 -right-16 w-[140%] max-w-none object-contain"
            />

          </div>

        </div>
    </>
  );
}
