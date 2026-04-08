"use client";
import React, { useState, useEffect } from "react";
import { Clock, Rocket } from "lucide-react";

export default function ComingSoonPage() {

  const targetDate = new Date(2025, 11, 21); // month is 0-based (9 = October)

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse bottom-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-6 transform hover:scale-110 transition-transform duration-300">
            <Rocket className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-2xl mx-auto">
          We&apos;re working on something amazing. Stay tuned for the big reveal!
        </p>
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-12">
          <Clock className="w-5 h-5" />
          <span className="text-lg">Launching soon</span>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-6 mb-12 max-w-2xl mx-auto">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200"
            >
              <div className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-[10px] md:text-base text-gray-600 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
