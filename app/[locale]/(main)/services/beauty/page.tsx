import React from 'react'

export default function BeautyPage() {
  return (
    <div className="bg-white text-slate-800">

      {/* NAVBAR */}
      <div className="h-16 flex items-center justify-between px-6 md:px-16 border-b">
        <h1 className="text-xl font-bold text-rose-500">Beauty Services</h1>
        <button className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition">
          Book Now
        </button>
      </div>

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
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="beauty"
            className="w-[120%] max-w-none object-contain rounded-bl-4xl rounded-tl-4xl  "
          />
        </div>

      </section>

      {/* CATEGORIES */}
      <section className="py-16 px-6 md:px-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Beauty Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {[
            "Hair Styling",
            "Makeup",
            "Nail Care",
            "Facial & Skincare",
            "Massage",
            "Waxing",
            "Eyebrows",
            "Spa Treatments"
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl p-6 text-center hover:shadow-lg transition cursor-pointer"
            >
              <div className="w-14 h-14 bg-rose-100 rounded-full mx-auto mb-4"></div>
              <p className="font-medium">{item}</p>
            </div>
          ))}

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

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm">
        © 2026 ServiceHub — Beauty
      </footer>

    </div>
  )
}