import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "../assets/Dashboard.svg";
import DashboardInactivateIcon from "../assets/Dashboard_inactive.svg";
import Reel from "../assets/Reel.svg";
import ReelInactivateIcon from "../assets/Reel_inactive.svg";
import Analyzer from "../assets/Analyzer.svg";
import AnalyzerInactivate from "../assets/Analyzer_inactive.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block rounded-lg transition w-full ${
      pathname === path ? "text-white" : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`lg:rounded-3xl fixed lg:static left-0 top-0 z-30 h-full w-14 lg:w-14 flex flex-col items-center py-5 shadow-md bg-white transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <nav className="flex-1 p-1 space-y-6 w-full flex flex-col items-center">
          <Link to="/dashboard" className={linkClass("/")}>
            <button className="rounded-xl bg-white w-full h-[44px] flex items-center justify-center">
              {pathname === "/dashboard" ? (
                <img src={DashboardIcon} alt="" className="w-5 h-5" />
              ) : (
                <img src={DashboardInactivateIcon} alt="" className="w-5 h-5" />
              )}
            </button>
          </Link>
          <Link to="/reports" className={linkClass("/reports")}>
            <button className="rounded-xl bg-white w-full h-[44px] flex items-center justify-center">
              {pathname === "/reports" ? (
                <img src={Reel} alt="" className="w-5 h-5" />
              ) : (
                <img src={ReelInactivateIcon} alt="" className="w-5 h-5" />
              )}
            </button>
          </Link>
          <Link to="/Analyzer" className={linkClass("/Analyzer")}>
            <button className="rounded-xl bg-white w-full h-[44px] flex items-center justify-center">
              {pathname === "/Analyzer" ? (
                <img src={Analyzer} alt="" className="w-5 h-5" />
              ) : (
                <img src={AnalyzerInactivate} alt="" className="w-5 h-5" />
              )}
            </button>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
