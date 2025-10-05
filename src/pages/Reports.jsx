import React, { useEffect } from "react";
import { Sparkles } from "lucide-react"; // install: npm install lucide-react
import { apiClient } from "../API/apiservises";

const videoData = [
  {
    title: "City of dreams",
    thumbnail:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400",
    duration: "00:10:35",
    date: "05/10/2025",
  },
  {
    title: "Amazing sky view",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
    duration: "00:10:35",
    date: "05/10/2025",
  },
  {
    title: "Rainy Season",
    thumbnail:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
    duration: "00:10:35",
    date: "05/10/2025",
  },
  {
    title: "Beautiful waterfall",
    thumbnail:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?w=400",
    duration: "00:10:35",
    date: "05/10/2025",
  },
  {
    title: "Evening blessing",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400",
    duration: "00:10:35",
    date: "05/10/2025",
  },
  {
    title: "Flowers season",
    thumbnail:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400",
    duration: "00:10:35",
    date: "05/10/2025",
  },
];

const Reports = () => {
  useEffect(() => {
    const getAllData = async () => {
      const Response = await apiClient.get("/all-reports");
      console.log(Response);
    };
  }, []);
  return (
    <div className="bg-[#f5f8ff] min-h-screen p-8 rounded-2xl shadow-inner">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Video Reports</h1>

      <div className="overflow-x-auto bg-white shadow-sm rounded-3xl p-4">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-6 py-3">Thumbnail</th>
              <th className="px-6 py-3">Video Title</th>
              <th className="px-6 py-3">Video duration</th>
              <th className="px-6 py-3">Date uploaded</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {videoData.map((video, index) => (
              <tr
                key={index}
                className="bg-gray-50 hover:bg-blue-50 transition rounded-xl shadow-sm"
              >
                <td className="px-6 py-3">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-20 h-14 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-3 font-medium text-gray-800">
                  {video.title}
                </td>
                <td className="px-6 py-3 text-gray-700">{video.duration}</td>
                <td className="px-6 py-3 text-gray-700">{video.date}</td>
                <td className="px-6 py-3">
                  <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-blue-500 hover:text-white transition">
                    Analyze
                    <Sparkles className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
