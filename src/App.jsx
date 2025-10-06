import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Analyzer from "./pages/Analyzer";
import { useState } from "react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  return (
    <div className="h-screen lg:p-3 p-2 scroll-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex mt-2">
        <div className="h-[88vh]">
         <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="lg:pl-4 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/Analyzer" element={<Analyzer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
