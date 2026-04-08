"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ChevronDown, IdCard, LogOut } from "lucide-react";
import { Profile } from "@/model/auth";
import { signOut } from "@/action/apiAction";
import { redirect } from "next/navigation";

interface Props {
  profile: Profile;
}

export default function UserDropdown(user: Props) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    redirect("/user/login");
  };

  return (
    <div className="relative">
      {/* Dropdown trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center mt-1.5 space-x-2 text-[#ff9a5a] text-sm font-semibold"
      >
        <User size={16} />
        <span>{user.profile.name}</span>
        <ChevronDown size={14} />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-1  w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-sm ">
          <Link
            href="/user/profile"
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <IdCard size={16} />
            <span>Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
