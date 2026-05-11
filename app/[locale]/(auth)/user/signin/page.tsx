"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import SigninForm from "./components/SignInForm";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"provider" | "client">("provider");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password, role });
  };

  const content: Record<"provider" | "client", { title: string; description: string; image: string }> = {
    provider: {
      title: "Provider Portal",
      description:
        "Manage your services, track performance, and handle client requests efficiently.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    },
    client: {
      title: "Client Portal",
      description:
        "Find services, book providers, and manage your requests with ease.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1E3C] p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-between bg-[#0F2A54] text-white p-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {content[role].title}
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              {content[role].description}
            </p>
          </div>

          <img
            src={content[role].image}
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
