"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

export default function MiddlePart() {
  const t = useTranslations("Services");
  const { locale } = useParams();

  const services = [
    { name: "Cleaning", slug: "cleaning", image: "/assets/images/cleaning.jpeg" },
    { name: "Beauty", slug: "beauty", image: "/assets/images/beauty.avif" },

  ];

  return (
    <section className="bg-slate-100 py-16 px-6 md:px-16">

      <div className="text-3xl font-light mb-10 text-center">
        {t("title") || "Popular Services"}
      </div>

      {/* FLEX container (centered always) */}
      <div className="flex flex-wrap justify-center gap-6">

        {services.map((item, i) => (
          <Link
            key={i}
            href={`/${locale}/services/${item.slug}`}
            className="w-[45%] sm:w-[40%] md:w-[30%] lg:w-[22%] xl:w-[18%]"
          >
            <div className="relative h-40 bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:scale-[1.03] transition cursor-pointer">

              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white font-bold text-xl text-center px-2">
                  {item.name}
                </p>
              </div>

            </div>
          </Link>
        ))}

      </div>

    </section>
  );
}