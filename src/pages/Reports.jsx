import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { apiClient } from "../API/apiservises";
import APIEndpoints from "../API/profile/APIEndpoints";

const Reports = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      const response = await apiClient.get(APIEndpoints.get_all_Video);
      if (response?.status && response?.videos_list) {
        setVideos(response.videos_list);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAnalyze = (video_id) => {
    navigate(`/Analyzer?video_id=${video_id}`, { state: { video_id } });
  };

  return (
    <div className="bg-[#f5f8ff] min-h-[98%] p-4 md:p-4 rounded-xl shadow-inner">
      <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-gray-700">
        Video Reports
      </h1>

      <div className="bg-white shadow-sm rounded-2xl p-3 md:p-4">
        <div className="max-h-[65vh] overflow-y-auto overflow-x-auto rounded-xl">
          <table className="min-w-full border-separate border-spacing-y-2 md:border-spacing-y-3">
            <thead className="sticky top-0 bg-white z-10 shadow-sm">
              <tr className="text-left text-gray-500 text-xs md:text-sm">
                <th className="px-3 md:px-6 py-2 md:py-3">Thumbnail</th>
                <th className="px-3 md:px-6 py-2 md:py-3">Video Title</th>
                <th className="px-3 md:px-6 py-2 md:py-3">Date uploaded</th>
                <th className="px-3 md:px-6 py-2 md:py-3">Status</th>
                <th className="px-3 md:px-6 py-2 md:py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => {
                const videoSrc = APIEndpoints.download_video.replace(
                  "{Video_Id}",
                  video.video_id
                );

                return (
                  <VideoRow
                    key={video.video_id}
                    video={video}
                    videoSrc={videoSrc}
                    handleAnalyze={handleAnalyze}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const VideoRow = ({ video, videoSrc, handleAnalyze }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // rewind to start
    }
  };

  return (
    <tr className="bg-gray-50 hover:bg-blue-50 transition rounded-lg md:rounded-xl shadow-sm">
      <td
        className="px-3 md:px-6 py-2 md:py-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
            isHovered ? "scale-105 shadow-md" : "scale-100"
          }`}
          style={{ width: "200px", height: "100px" }}
        >
          {
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline={isHovered}
              className="w-full h-full object-cover rounded-lg"
            />
          }
        </div>
      </td>

      <td className="px-3 md:px-6 py-2 md:py-3 font-medium text-gray-800 text-xs md:text-sm">
        {video.title}
      </td>

      <td className="px-3 md:px-6 py-2 md:py-3 text-gray-700 text-xs md:text-sm">
        {new Date(video.date_uploaded).toLocaleString()}
      </td>

      <td className="px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm">
        {video.status === "ready" ? (
          <span className="text-green-600 font-medium">Ready</span>
        ) : video.status === "uploading" ? (
          <span className="text-orange-500 font-medium animate-pulse">
            Uploading...
          </span>
        ) : (
          <span className="text-purple-600 font-medium animate-pulse">
            Pending
          </span>
        )}
      </td>

      <td className="px-3 md:px-6 py-2 md:py-3">
        <button
          disabled={video.status !== "ready"}
          onClick={() => handleAnalyze(video.video_id)}
          className={`flex items-center gap-1 md:gap-2 border rounded-full px-2 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium transition ${
            video.status === "ready"
              ? "text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white"
              : "text-gray-400 border-gray-200 cursor-not-allowed"
          }`}
        >
          Analyze
          <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </td>
    </tr>
  );
};

export default Reports;
