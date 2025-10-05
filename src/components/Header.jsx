import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-6 py-3 rounded-b-3xl">
      <div className="flex items-center gap-6">
        <div className="text-xl font-semibold">Logo</div>
        <nav className="flex gap-4 text-gray-600 font-medium">
          <a href="#" className="text-black">
            Dashboard
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <img
          src="https://flagcdn.com/us.svg"
          alt="flag"
          className="w-6 h-6 rounded-full"
        />
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-9 h-9 rounded-full border border-gray-300"
        />
      </div>
    </header>
  );
};

export default Header;
