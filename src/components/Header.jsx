import React from "react";
import { Menu } from "lucide-react";

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
        <div className="text-lg font-semibold">Logo</div>

        {/* Navigation links - hidden on mobile */}
        <nav className="hidden lg:flex gap-3 text-gray-600 font-medium text-sm">
          <a href="#" className="text-black hover:text-blue-600">
            Dashboard
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Reports
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Analyzer
          </a>
        </nav>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <img
          src="https://flagcdn.com/us.svg"
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
