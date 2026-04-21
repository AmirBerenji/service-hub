"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

export default function MiddlePart() {
  const t = useTranslations("MiddlePart");
  const { locale } = useParams();

  const services = [
    { name: "Cleaning", slug: "cleaning" },
    { name: "Beauty", slug: "beauty" },
    { name: "Plumbing", slug: "plumbing" },
    { name: "Car Repair", slug: "car-repair" },
    { name: "Electrician", slug: "electrician" },
    { name: "Painting", slug: "painting" },
    { name: "Moving", slug: "moving" },
    { name: "IT Support", slug: "it-support" },
  ];

  return (
    <section className="bg-slate-100 py-16 px-6 md:px-16">

      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
        {t("title") || "Popular Services"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {services.map((item, i) => (
          <Link
            key={i}
            href={`/${locale}/services/${item.slug}`}
            className="block"
          >
            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl hover:scale-[1.03] transition cursor-pointer text-center">

              <div className="w-12 h-12 bg-amber-400 rounded-full mx-auto mb-4"></div>

              <p className="font-medium">{item.name}</p>

            </div>
          </Link>
        ))}

      </div>

    </section>
  );
}