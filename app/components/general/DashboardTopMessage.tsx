import { useState } from "react";

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <span className="">
        {/* Enhanced Banner with Progress */}
        <div className="bg-gradient-to-br   from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden  ">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="container mx-auto px-4 py-6 relative z-10">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                {/* Icon with animated ring */}
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-white/30 rounded-2xl animate-ping"></div>
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">
                      Enhance Your Professional Profile.
                    </h3>
                    {/* <span className="px-3 py-1 bg-amber-400 text-amber-900 text-xs font-semibold rounded-full shadow-lg">
                    60% Complete
                  </span> */}
                  </div>
                  <p className="text-white/90 text-sm mb-3 leading-relaxed ">
                    Add your information and experience to complete your profile. A full profile helps you stand out and connect more effectively.
                  </p>

                  {/* Progress Bar */}
                  {/* <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-lg transition-all duration-500"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                  <span className="text-white/90 text-xs font-medium whitespace-nowrap">
                    3 of 5 steps
                  </span>
                </div> */}

                  {/* Action Button */}
                  {/* <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-600 font-semibold text-sm rounded-xl hover:bg-amber-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
                  <span>Complete Now</span>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </button> */}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 rounded-xl backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg group"
                aria-label="Close banner"
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </span>
    </>
  );
}
