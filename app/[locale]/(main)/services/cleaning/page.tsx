"use client"
import MapView, { MapLocation } from '@/app/components/general/MapView';
import FooterSide from '@/app/components/nav/FooterSide'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const places: MapLocation[] = [
  { id: 1, name: 'Aqua', lat: 40.4644311, lng: -3.6348635, description: 'Home & office cleaning',color: 'green' },
  { id: 2, name: 'Casalista 24 X 7', lat: 40.423354, lng: -3.7240178, description: 'Home cleaning service',color: 'red' },
  { id: 3, name: 'Limpiezas Unidas', lat: 40.4615847, lng: -3.6891715, description: 'Window, carpet & office cleaning',color: 'orange' },
  { id: 4, name: 'Grupo Limpex', lat: 40.4097431, lng: -3.636763, description: 'Home, carpet & office cleaning',color: 'gold' },
  { id: 5, name: 'Clockmatic', lat: 40.4189645, lng: -3.7117806, description: 'Handyman & home cleaning' },
  { id: 6, name: 'Maria Zugasti', lat: 40.4140931, lng: -3.6705102, description: 'Home cleaning, nanny & hospice services' },
  { id: 7, name: 'El Patito Limpiador', lat: 40.2776102, lng: -3.8085592, description: 'Home & office cleaning' },
  { id: 8, name: 'Darsa', lat: 40.378739, lng: -3.7358924, description: 'Office cleaning, gardening & waterproofing' },
  { id: 9, name: 'Bi2t', lat: 40.4278768, lng: -3.6432556, description: 'Retirement homes & home cleaning' },
  { id: 10, name: 'Servinice', lat: 40.4193778, lng: -3.6979686, description: 'Home & office cleaning' },
  { id: 11, name: 'Manila', lat: 40.4103514, lng: -3.7082718, description: 'Cosmetics, beauty supply & home cleaning' },
  { id: 12, name: 'Q-Sec', lat: 40.43410332, lng: -3.70013964, description: 'Dry cleaning & carpet cleaning' },
  { id: 13, name: 'Droguería Perfumería Cosmética', lat: 40.42687, lng: -3.718128, description: 'Cosmetics & home cleaning' },
  { id: 14, name: 'Abad Limpiezas', lat: 40.4075622, lng: -3.6765457, description: 'Office cleaning' },
  { id: 15, name: 'Ideal Servicios', lat: 40.4244911, lng: -3.5679131, description: 'Office, pest control & home cleaning' },
  { id: 16, name: 'Limpiezas Profresh', lat: 40.3848083, lng: -3.7054373, description: 'Office & home cleaning' },
  { id: 17, name: 'Exttel', lat: 40.4315085, lng: -3.7094912, description: 'Pool, home & office cleaning' },
  { id: 18, name: 'Clarel', lat: 40.4117965, lng: -3.70599492, description: 'Cosmetics, health & home cleaning' },
  { id: 19, name: 'Abad Limpiezas (2)', lat: 40.430967, lng: -3.6686011, description: 'Office cleaning' },
  { id: 20, name: 'Ng Servicios y Personal Doméstico', lat: 40.4189645, lng: -3.7117806, description: 'Home, office cleaning & childcare services' },

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

          <p className="text-slate-600 text-xsm md:text-lg">
            Browse and choose from verified cleaning professionals for your home, office, or deep cleaning needs, simple, fast, and transparent.
          </p>

          {/* SEARCH */}
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow w-full md:w-11/12">
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
            src="/assets/images/cleaning.jpeg"
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

        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6">

          {[1, 2, 3,4].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow p-4">

              <div className="h-40 bg-slate-200 rounded-xl mb-4">

              </div>

              <h3 className="font-semibold">Cleaning Specialist</h3>
              <p className="text-sm text-slate-500">4.7 ⭐ · 90 reviews</p>

              <button className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
                Detailes
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