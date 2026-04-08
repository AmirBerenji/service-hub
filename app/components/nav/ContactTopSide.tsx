import React from "react";
import LocalSwitcher from "../LocalSwitcher";
import Link from "next/link";
// import { getProfile, signOut } from "@/action/apiAction";
// import { User, LogOut, IdCard, ChevronDown, Search } from "lucide-react";
import UserDropdown from "./UserDropDown";

// async function getDataFromBarrer() {
//   const req = await getProfile();
//   return req;
// }

export default async function ContactTopSide() {
  //const userData = await getDataFromBarrer();
  return (
    <>
      <div className="bg-slate-50 text-xs text-gray-400 flex justify-center sm:justify-between items-center px-4 sm:px-10 py-1 font-semibold">
        <div className="hidden sm:flex space-x-6">
          <div className="flex items-center space-x-1">
            <i className="fas fa-envelope"></i>
            <a
              href="mailto:kidoohubarmenia@gmail.com"
              className="hover:underline"
            >
              kidoohubarmenia@gmail.com
            </a>
          </div>

          {/* <div className="flex items-center space-x-1">
            <i className="fas fa-map-marker-alt"></i>
            <span>Address</span>
          </div> */}

          <div className="flex items-center space-x-1">
            <i className="fas fa-phone-alt"></i>
            <div className="">
              <a href="tel:+37496882655" className="hover:underline">
                +374 96 882655
              </a>
              <span className="mx-1 ">|</span>
              <a href="tel:+37455882658" className="hover:underline">
                +374 55 882658
              </a>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 text-gray-400 text-lg">
          <LocalSwitcher />
          <button aria-label="Search" className="hover:text-[#ff9a5a]">
            <i className="fas fa-search"></i>
          </button>

          {/* {userData == undefined ? (
            <>
              <Link href={"/user/login"}>
                <button
                  aria-label="User Account"
                  className="hover:text-[#ff9a5a]"
                >
                  <i className="fas fa-user"></i>
                </button>
              </Link>
            </>
          ) : (
            <>
              <UserDropdown profile={userData} />
            </>
          )} */}

          {/* <button aria-label="Shopping Cart" className="hover:text-orange-400 relative">
            <i className="fas fa-shopping-cart">
            </i>
            
                
            <span className="absolute top-0 -right-2 bg-orange-400 text-white text-[10px] font-bold rounded-full px-[5px]">
              0
            </span>
          </button> */}
        </div>
      </div>
    </>
  );
}
