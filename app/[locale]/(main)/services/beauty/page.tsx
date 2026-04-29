"use client"
import MapView, { MapLocation } from '@/app/components/general/MapView';
import FooterSide from '@/app/components/nav/FooterSide'
import { ArrowLeft} from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const places: MapLocation[] = [
  { id: 1, name: 'Corto y Cambio', lat: 40.4272623, lng: -3.7035643, description: 'Hair salon location' },
  { id: 2, name: 'El Kinze de Cuchilleros', lat: 40.414266, lng: -3.7078754, description: 'Barber & hair salon' },
  { id: 3, name: 'Blow Dry Bar', lat: 40.4249933, lng: -3.6966894, description: 'Hair salon & lounge' },
  { id: 4, name: 'Bearbero', lat: 40.4102029, lng: -3.7066464, description: 'Barber shop' },
  { id: 5, name: 'Urbano Peluqueros', lat: 40.4238619, lng: -3.7012551, description: 'Barber shop' },
  { id: 6, name: 'Peluquería Luís', lat: 40.4157256, lng: -3.7028407, description: 'Hair salon' },
  { id: 7, name: 'Carlos Conde', lat: 40.4117592, lng: -3.7073651, description: 'Men’s barber shop' },
  { id: 8, name: "The Barber's Shop", lat: 40.4377753, lng: -3.6763434, description: 'Barber shop' },
  { id: 9, name: 'La Raya A Un Lado', lat: 40.40845632, lng: -3.70766868, description: 'Hair salon' },
  { id: 10, name: 'Peluquería Tay Yang Feng', lat: 40.4222409, lng: -3.7106903, description: 'Hair salon' },
  { id: 11, name: 'Are You Ready?', lat: 40.419497, lng: -3.709536, description: 'Hair, nails & skincare salon' },
  { id: 12, name: 'Compadre', lat: 40.4207447, lng: -3.7003208, description: 'Barber & cocktail bar' },
  { id: 13, name: 'Carlos Conde', lat: 40.436551, lng: -3.6924806, description: 'Men’s barber shop' },
  { id: 14, name: "Aire's - Salon de Belleza", lat: 40.4295991, lng: -3.7086485, description: 'Hair salon & waxing' },
  { id: 15, name: 'Black&White Peluqueros', lat: 40.426175, lng: -3.685144, description: 'Hair salon' },
  { id: 16, name: 'Shave', lat: 40.4322419, lng: -3.7235376, description: 'Barber & skincare' },
  { id: 17, name: 'Paco Cabello', lat: 40.4291937, lng: -3.7045295, description: 'Hair salon' },
  { id: 18, name: 'Val Souza Estilistas', lat: 40.4109226, lng: -3.7028315, description: 'Hair salon' },
  { id: 19, name: 'Carmen Peralta', lat: 40.4274558, lng: -3.6854929, description: 'Hair & makeup artist' },
  { id: 20, name: 'Malayerba', lat: 40.4270758, lng: -3.7045362, description: 'Barber & hair salon' },
];


export default function BeautyPage() {
  return (
    <div className="bg-white text-slate-800">

      
      <Link href="/" className="bg-rose-500 mt-3 ml-3 text-white px-2 py-2 absolute rounded-full hover:bg-rose-600 transition">
          <ArrowLeft size={16} />
          
        </Link>

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center   bg-gradient-to-br from-rose-50 to-pink-100">

        {/* LEFT */}
        <div className="space-y-6 max-w-xl px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover Top Beauty Experts <br />
            <span className="text-rose-500">Near You</span>
          </h1>

          <p className="text-slate-600 text-lg">
            Book trusted professionals for hair, nails, skincare and more — all in one place.
          </p>

          {/* SEARCH */}
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow w-full md:w-[420px]">
            <input
              type="text"
              placeholder="Search beauty services..."
              className="flex-1 px-5 py-3 outline-none"
            />
            <button className="bg-rose-500 text-white px-6 py-3 font-semibold hover:bg-rose-600 transition">
              Search
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex items-end justify-end h-full relative">
          <img
            src="/assets/images/beauty.avif"
            alt="beauty"
            className="w-[120%] max-w-none object-contain rounded-bl-4xl rounded-tl-4xl  "
          />
        </div>

      </section>

      {/* FEATURED */}
      <section className="bg-rose-50 py-16 px-6 md:px-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Professionals
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[1,2,3].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow p-4">

              <div className="h-40 bg-slate-200 rounded-xl mb-4"></div>

              <h3 className="font-semibold">Beauty Specialist</h3>
              <p className="text-sm text-slate-500">4.8 ⭐ · 120 reviews</p>

              <button className="mt-4 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition">
                Book Appointment
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
          Want to Offer Beauty Services?
        </h2>

        <p className="text-slate-600 mb-6">
          Join our platform and connect with customers in your area.
        </p>

        <button className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition">
          Join as Professional
        </button>

      </section>

      <FooterSide />

    </div>
  )
}