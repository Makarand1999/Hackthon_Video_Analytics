import React from "react";
import { Menu } from "lucide-react";
import LogoImge from '../assets/Logo.png'

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-4 py-2 rounded-b-3xl">
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Hamburger menu - visible on small screens */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 transition"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        {/* Logo */}
        <div className="text-lg font-semibold flex gap-[5px] items-center justify-center"><img className="h-7" src={LogoImge} alt="" />Video Analyser</div>
      </div>
      {/* Right section */}
      <div className="flex items-center gap-3">
        <img
          src="https://flagcdn.com/in.svg"
          alt="flag"
          className="w-5 h-5 rounded-full"
        />
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-8 h-8 rounded-full border border-gray-300"
        />
      </div>
    </header>
  );
};

export default Header;
