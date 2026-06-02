"use client";

import SignupForm from "../componentes/SignupForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1E3C] p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* LEFT SIDE - IMAGE + INFO */}
        <div className="hidden md:flex flex-col justify-between bg-[#0F2A54] text-white p-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Provider Portal</h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              Manage your services, track your performance, and connect with
              clients easily. This portal is designed to give providers full
              control over their workflow.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="provider"
            className="rounded-xl mt-6 object-cover h-48 w-full border-4 border-amber-400"
          />
        </div>
        <SignupForm role="provider" /> {/* RIGHT SIDE - LOGIN FORM */}
      </div>
    </div>
  );
}
