"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import SigninForm from "./components/SignInForm";


export default function LoginPage() {


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1E3C] p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-between bg-[#0F2A54] text-white p-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Sign in to Your Account
            </h2>
            
          </div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="visual"
            className="rounded-xl mt-6 object-cover h-48 w-full border-4 border-amber-400"
          />
        </div>

        {/* RIGHT SIDE */}
        <SigninForm />
      </div>
    </div>
  );
}
