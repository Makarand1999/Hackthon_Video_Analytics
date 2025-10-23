import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Analyzer from "./pages/Analyzer";
import Landing from "./pages/LandingPage";
import Login from "./pages/Login";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // paths that should NOT show header/sidebar
  const hideLayoutRoutes = ["/", "/login"];

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const showLayout = !hideLayoutRoutes.includes(location.pathname);

  return (
    <div className={`${showLayout ? "h-screen lg:p-3 p-2 scroll-hidden" : ""}`}>
      {showLayout && <Header toggleSidebar={toggleSidebar} />}
      <div className={`flex mt-2 ${showLayout ? "" : "justify-center items-center h-full"}`}>
        {showLayout && (
          <div className="h-[88vh]">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
        )}
        <div className={`${showLayout ? "lg:pl-4 w-full" : "w-full"}`}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/Analyzer" element={<Analyzer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
