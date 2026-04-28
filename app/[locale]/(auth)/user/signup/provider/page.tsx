"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const { locale } = useParams();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1E3C] p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE - IMAGE + INFO */}
        <div className="hidden md:flex flex-col justify-between bg-[#0F2A54] text-white p-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Provider Portal
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              Manage your services, track your performance, and connect with clients easily.
              This portal is designed to give providers full control over their workflow.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="provider"
            className="rounded-xl mt-6 object-cover h-48 w-full border-4 border-amber-400"
          />
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-10 flex flex-col justify-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Provider Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 text-[#0B1E3C] font-semibold py-2 rounded-lg hover:bg-amber-500 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Need access? <span className="text-amber-500 cursor-pointer">Contact admin</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
