import FooterSide from '@/app/components/nav/FooterSide'
import NavbarTopSide from '@/app/components/nav/NavbarTopSide'
import React from 'react'

export default function Page() {
  return (
    <>
      {/* HERO / HEADER */}
      <section className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white flex flex-col">

        <NavbarTopSide/>
       
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

            <img
              src="/assets/images/service-hub.png"
              alt="services"
              className="absolute bottom-0 -right-16 w-[140%] max-w-none object-contain"
            />

          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-slate-100 py-16 px-6 md:px-16">

        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Popular Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {[
            "Plumbing",
            "Car Repair",
            "Cleaning",
            "Beauty",
            "Electrician",
            "Painting",
            "Moving",
            "IT Support"
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer text-center"
            >
              <div className="w-12 h-12 bg-amber-400 rounded-full mx-auto mb-4"></div>
              <p className="font-medium">{item}</p>
            </div>
          ))}

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="bg-slate-900 text-white py-16 px-6 md:px-16 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Are You a Service Provider?
        </h2>

        <p className="text-slate-300 mb-6">
          Join our platform and start getting customers near your location.
        </p>

        <button className="bg-amber-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition">
          Join Now
        </button>

      </section>

     <FooterSide/>
    </>
  )
}