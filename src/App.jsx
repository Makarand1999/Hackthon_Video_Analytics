import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Analyzer from "./pages/Analyzer";

export default function App() {
  return (
    <div className="h-screen p-4">
      <Header />
      <div className="flex mt-2">
        <div className="h-[88vh]">
          <Sidebar />
        </div>
        <div className="pl-4 w-full">
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
