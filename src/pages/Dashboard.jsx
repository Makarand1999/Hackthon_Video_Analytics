import React, { useRef } from "react";
import VideoUpload from "../assets/Upload_Video.svg";
import { apiClient } from "../API/apiservises";
import APIEndpoints from "../API/profile/APIEndpoints";

const Dashboard = () => {
  const fileInputRef = useRef(null);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      const formData = new FormData();
      formData.append("video", file);
      try {
        const response = await apiClient.post(APIEndpoints.upload_file, "", formData, true);
        console.log(response);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#f5f8ff] p-4 rounded-xl">
  {/* Upload Banner */}
  <div className="bg-gradient-to-r from-[#e9d5ff] via-[#fecdd3] to-[#fde68a] p-4 rounded-2xl shadow-md relative flex flex-col justify-between">
    <h2 className="text-xl font-bold mb-1">Upload & Analyze Creative Video</h2>
    <p className="text-gray-700 text-xs md:text-sm">
      Let AI analyze your video for emotional tone, brand moments, and narrative structure.
    </p>
    <div className="absolute bottom-3 right-3 flex items-center gap-1">
      <img src="https://i.pravatar.cc/30" alt="alex" className="rounded-full w-6 h-6 border" />
      <p className="text-xs font-medium">Hello, Alex! <br />Have a nice day!</p>
    </div>
  </div>

  {/* Upload Card */}
  <div className="bg-white rounded-2xl shadow-md flex flex-col justify-center items-center cursor-pointer p-3" onClick={handleCardClick}>
    <img src={VideoUpload} alt="Upload" className="w-full object-contain" />
    <input type="file" accept="video/*" ref={fileInputRef} onChange={handleVideoUpload} className="hidden" />
  </div>

  {/* Stats Cards */}
  <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
    <div className="bg-white rounded-2xl p-3 shadow-md">
      <p className="text-xs text-gray-500 mb-1">Time Saved</p>
      <h2 className="text-lg font-bold text-purple-600">42 hrs/week</h2>
    </div>
    <div className="bg-white rounded-2xl p-3 shadow-md">
      <p className="text-xs text-gray-500 mb-1">Videos Analyzed</p>
      <h2 className="text-lg font-bold">128</h2>
    </div>
    <div className="bg-white rounded-2xl p-3 shadow-md">
      <p className="text-xs text-gray-500 mb-1">Top Emotion</p>
      <h2 className="text-lg font-bold text-orange-500">Joy</h2>
    </div>
    <div className="bg-white rounded-2xl p-3 shadow-md">
      <p className="text-xs text-gray-500 mb-1">Brand Impact Score</p>
      <h2 className="text-lg font-bold text-green-500">+23%</h2>
    </div>
  </div>

  {/* Latest Video Section */}
  <div className="col-span-1 md:col-span-2 bg-white rounded-2xl p-3 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <img src="https://placehold.co/120x80" alt="thumbnail" className="rounded-lg object-cover w-24 h-16" />
      <div>
        <p className="text-xs text-gray-500">Video Title</p>
        <h3 className="text-sm font-semibold">Train _Vs_ Giant _Pit</h3>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4">
      <div className="text-xs">
        <p className="text-gray-500">Video Duration</p>
        <p className="font-medium">00:10:35</p>
      </div>
      <div className="text-xs">
        <p className="text-gray-500">Date Uploaded</p>
        <p className="font-medium">05/10/2025</p>
      </div>
      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-xs">
        Analyze ✨
      </button>
    </div>
  </div>
</section>

  );
};

export default Dashboard;
