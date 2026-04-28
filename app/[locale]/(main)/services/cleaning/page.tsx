"use client"
import MapView, { MapLocation } from '@/app/components/general/MapView';
import FooterSide from '@/app/components/nav/FooterSide'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const places: MapLocation[] = [
  { id: 1, name: 'Yerevan',  lat: 40.1792, lng: 44.4991, description: 'Capital of Armenia' },
  { id: 2, name: 'Tbilisi',  lat: 41.6938, lng: 44.8015, description: 'Capital of Georgia'  },
  { id: 3, name: 'Baku',     lat: 40.4093, lng: 49.8671, description: 'Capital of Azerbaijan' },
  { id: 4, name: 'Tehran',   lat: 35.6892, lng: 51.3890, description: 'Capital of Iran'     },
];

export default function CleaningPage() {
  return (
    <div className="bg-white text-slate-800">

        <Link href="/" className="bg-teal-600 mt-3 ml-3 text-white px-2 py-2 absolute rounded-full hover:bg-teal-700 transition">
          <ArrowLeft size={16} />
          
        </Link>

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center  bg-gradient-to-br from-teal-50 to-blue-100">

        {/* LEFT */}
        <div className="space-y-6 max-w-xl px-6 py-12">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Professional Cleaning <br />
            <span className="text-teal-600">At Your Doorstep</span>
          </h1>

          <p className="text-slate-600 text-lg">
            Book trusted cleaners for your home, office, or deep cleaning needs — fast and easy.
          </p>

          {/* SEARCH */}
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow w-full md:w-[420px]">
            <input
              type="text"
              placeholder="Search cleaning services..."
              className="flex-1 px-5 py-3 outline-none"
            />
            <button className="bg-teal-600 text-white px-6 py-3 font-semibold hover:bg-teal-700 transition">
              Search
            </button>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex items-end justify-end h-full relative">
          <img
            src="https://images.pexels.com/photos/6195118/pexels-photo-6195118.jpeg?_gl=1*145b3hg*_ga*OTQ0MjU0MTM5LjE3NzY3Njg0ODQ.*_ga_8JE65Q40S6*czE3NzY3Njg0ODMkbzEkZzEkdDE3NzY3Njg1MTQkajI5JGwwJGgw"
            alt="cleaning"
            className="w-[120%] max-w-none object-contain rounded-bl-4xl rounded-tl-4xl "
          />
        </div>

      </section>

      {/* CATEGORIES */}
      {/* <section className="py-16 px-6 md:px-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Cleaning Services We Offer
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {[
            "Home Cleaning",
            "Office Cleaning",
            "Deep Cleaning",
            "Carpet Cleaning",
            "Window Cleaning",
            "Move-in / Move-out",
            "Post Construction",
            "Disinfection"
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl p-6 text-center hover:shadow-lg transition cursor-pointer"
            >
              <div className="w-14 h-14 bg-teal-100 rounded-full mx-auto mb-4"></div>
              <p className="font-medium">{item}</p>
            </div>
          ))}

        </div>

      </section> */}

      {/* FEATURED CLEANERS */}
      <section className="bg-teal-50 py-16 px-6 md:px-16">

        <div className="grid md:grid-cols-3 gap-6">

          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow p-4">

              <div className="h-40 bg-slate-200 rounded-xl mb-4"></div>

              <h3 className="font-semibold">Cleaning Specialist</h3>
              <p className="text-sm text-slate-500">4.7 ⭐ · 90 reviews</p>

              <button className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
                Book Service
              </button>

            </div>
          ))}

        </div>

      </section>


 <MapView
        locations={places}
        height="480px"
        zoom={60}
      />



      {/* CTA */}
      <section className="py-16 text-center px-6 md:px-16">

        <h2 className="text-3xl font-bold mb-4">
          Are You a Cleaning Professional?
        </h2>

        <p className="text-slate-600 mb-6">
          Join our platform and get cleaning jobs near your location.
        </p>

        <button className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition">
          Join Now
        </button>

      </section>

       
     
     <FooterSide />
    </div>
  )
}