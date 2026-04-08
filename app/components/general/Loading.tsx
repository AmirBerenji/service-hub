import React from "react";

export default function LoadingPage() {
  return (
    <>
      <div className="fixed inset-0 bg-slate-400/80 flex items-center justify-center z-50">
        <div className="flex flex-col justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff9a5a] mb-4"></div>
          <h2 className="text-5xl font-extrabold text-[#2f3e4e]">
            <span className="text-[#ff9a5a]">Kidoo</span>Hub
          </h2>
        </div>
      </div>
    </>
  );
}
