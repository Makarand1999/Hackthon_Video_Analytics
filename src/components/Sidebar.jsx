import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "../assets/Dashboard.svg";
import DashboardInactivateIcon from "../assets/Dashboard_inactive.svg";
import Reel from "../assets/Reel.svg";
import ReelInactivateIcon from "../assets/Reel_inactive.svg";
import Analyzer from "../assets/Analyzer.svg";
import AnalyzerInactivate from "../assets/Analyzer_inactive.svg";
const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block rounded-lg transition w-full ${
      pathname === path ? "text-white" : "text-gray-700 hover:bg-blue-100"
    }`;
  return (
    <aside className="w-16 flex flex-col items-center gap-5  rounded-3xl py-6 shadow-md h-full">
      <nav className="flex-1 p-2 space-y-8 w-full flex flex-col items-center">
        <Link to="/" className={linkClass("/")}>
          <button className="rounded-xl bg-white w-full h-[50px] flex items-center justify-center">
            {pathname === "/" ? (
              <img src={DashboardIcon} alt="" />
            ) : (
              <img src={DashboardInactivateIcon} alt="" />
            )}
          </button>
        </Link>
        <Link to="/reports" className={linkClass("/reports")}>
          <button className="rounded-xl bg-white w-full h-[50px] flex items-center justify-center">
            {pathname === "/reports" ? (
              <img src={Reel} alt="" />
            ) : (
              <img src={ReelInactivateIcon} alt="" />
            )}
          </button>
        </Link>
        <Link to="/Analyzer" className={linkClass("/Analyzer")}>
          <button className=" rounded-xl bg-white w-full h-[50px] flex items-center justify-center">
            {pathname === "/Analyzer" ? (
              <img src={Analyzer} alt="" />
            ) : (
              <img src={AnalyzerInactivate} alt="" />
            )}
          </button>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
