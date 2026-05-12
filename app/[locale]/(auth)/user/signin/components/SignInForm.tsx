import { login } from "@/action/apiAction";
import { motion } from "framer-motion";
import React from "react";


export default function SigninForm() {
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Add role from props
    formData.append("role", "client");

    const response = await login(formData);

    if (response.error) {
      alert("Login failed: " + response.message);
    } else {
      alert("Registration failed: " + response.message);
    }

    console.log("Form submitted for role:", "client");
  };
  return (
    <>
      {/* RIGHT SIDE - LOGIN FORM */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 md:p-10 flex flex-col justify-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              //value={email}
              //onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your email"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              //value={password}
              //onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your password"
              id="password"
              name="password"
              required
            />
          </div>

       
          <button
            type="submit"
            className="w-full bg-amber-400 text-[#0B1E3C] font-semibold py-2 rounded-lg hover:bg-amber-500 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Need access?{" "}
          <span className="text-amber-500 cursor-pointer">Contact admin</span>
        </p>
      </motion.div>
    </>
  );
}
