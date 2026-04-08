import React from "react";

export default function FooterSide() {
  return (
    <>
      <footer className="bg-slate-50 py-8 px-6 sm:px-12 md:px-20 lg:px-32 text-[#2f3e4e] text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>© 2025 KidooHub. All rights reserved.</p>
          <div className="flex" >
            <a href="/en/terms" className="hover:text-[#ff9a5a] transition mr-4">Terms of Service</a>
            <a href="/en/terms" className="hover:text-[#ff9a5a] transition">Privacy Policy</a>
            <a href="/en/terms" className="hover:text-[#ff9a5a] transition ml-4">FAQ</a>  
          </div>
          <div className="flex space-x-6">
            <a
              aria-label="Facebook"
              className="hover:text-[#ff9a5a] transition"
              href="#"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              aria-label="Twitter"
              className="hover:text-[#ff9a5a] transition"
              href="#"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              target="_blank"
              aria-label="Instagram"
              className="hover:text-[#ff9a5a] transition"
              href="https://www.instagram.com/kidoohub?igsh=eW1tMmJvOGZtdmJ6"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              aria-label="LinkedIn"
              className="hover:text-[#ff9a5a] transition"
              href="#"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
