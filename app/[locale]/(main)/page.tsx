"use client"
import BannerMainPage from '@/app/components/banner/BannerMainPage'
import MiddlePart from '@/app/components/firstPage/middlePart'
import AddressAutocomplete from '@/app/components/general/AddressAutocomplete'
import MapView, { MapLocation }  from '@/app/components/general/MapView'
import MapViewLocation, { SelectedLocation } from '@/app/components/general/MapViewLocation'
import FooterSide from '@/app/components/nav/FooterSide'
import NavbarTopSide from '@/app/components/nav/NavbarTopSide'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'


const places: MapLocation[] = [
  { id: 1, name: 'Yerevan',  lat: 40.1792, lng: 44.4991, description: 'Capital of Armenia', color: 'blue' },
  { id: 2, name: 'Tbilisi',  lat: 41.6938, lng: 44.8015, description: 'Capital of Georgia', color: 'green' },
  { id: 3, name: 'Baku',     lat: 40.4093, lng: 49.8671, description: 'Capital of Azerbaijan', color: 'red' },
  { id: 4, name: 'Tehran',   lat: 35.6892, lng: 51.3890, description: 'Capital of Iran', color: 'orange' },
];


export default function Page() {
  const { locale } = useParams();
   const [picked, setPicked] = useState<SelectedLocation | null>(null);

    const handleSelect = ({ lat, lng, address }: { lat: number; lng: number; address: string }) => {
    console.log("Latitude:", lat);
    console.log("Longitude:", lng);
    console.log("Address:", address);
  };

  return (
    <>
      {/* HERO / HEADER */}
      <section className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white flex flex-col">

        <NavbarTopSide />

        <BannerMainPage />
      </section>

      <MiddlePart />


   <MapView
        locations={places}
        height="480px"
        zoom={60}
      />




 <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Pick a Location</h1>

      <MapViewLocation
        height="520px"
        locations = {[
  { id: 1, name: 'Yerevan',  lat: 40.1792, lng: 44.4991, description: 'Capital of Armenia', color: 'blue' },
  { id: 2, name: 'Tbilisi',  lat: 41.6938, lng: 44.8015, description: 'Capital of Georgia', color: 'green' },
  { id: 3, name: 'Baku',     lat: 40.4093, lng: 49.8671, description: 'Capital of Azerbaijan', color: 'red' },
  { id: 4, name: 'Tehran',   lat: 35.6892, lng: 51.3890, description: 'Capital of Iran', color: 'red' },
]}
        onLocationSelect={(loc) => {
          setPicked(loc);
          console.log('Selected:', loc);
          // loc.address → full address string
          // loc.lat     → latitude
          // loc.lng     → longitude
        }}
      />

      {picked && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f4ff', borderRadius: '8px' }}>
          <h3>You selected:</h3>
          <p><strong>Address:</strong> {picked.address}</p>
          <p><strong>Lat:</strong> {picked.lat}</p>
          <p><strong>Lng:</strong> {picked.lng}</p>
        </div>
      )}
    </div>






 <div className="p-8">
      <AddressAutocomplete onSelect={handleSelect} />
    </div>






      {/* CTA SECTION */}
      <section className="bg-slate-900 text-white py-16 px-6 md:px-16 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Are You a Service Provider?
        </h2>

        <p className="text-slate-300 mb-6">
          Join our platform and start getting customers near your location.
        </p>

        <Link href={`${locale}/user/signup/provider`} className="inline-block mb-4">
          <button className="bg-amber-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition">
            Join Now
          </button>
        </Link>
      </section>

      <FooterSide />
    </>
  )
}