import React, { useRef } from "react";
import VideoUpload from "../assets/Upload_Video.svg";
import { apiClient } from "../API/apiservises";
import APIEndpoints from "../API/profile/APIEndpoints";
const Dashboard = () => {
  const fileInputRef = useRef(null);

  // Called after file selection
  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // 🧠 You can now call your upload API or process here
      // uploadVideo(file);
      const formData = new FormData();
    formData.append("video", file);
      try{
        const response = await apiClient.post(APIEndpoints.upload_file, "", formData, true)
        console.log(response)
        
      }
      catch(error) {
      console.error("Error uploading file:", error);
    }
    }
  };

  const handleCardClick = () => {
    fileInputRef.current?.click(); // trigger hidden input
  };

  return (
    <section className="flex-1 grid grid-cols-2 grid-rows-[auto_1fr] gap-4 bg-[#f5f8ff] p-8 rounded-2xl">
      {/* Upload Banner */}
      <div className=" bg-gradient-to-r from-[#e9d5ff] via-[#fecdd3] to-[#fde68a] p-6 rounded-3xl shadow-md relative">
        <h2 className="text-2xl font-bold mb-2">
          Upload & Analyze Creative Video
        </h2>
        <p className="text-gray-700 max-w-xl">
          Let AI analyze your video for emotional tone, brand moments, and
          narrative structure. Save hours of manual tagging and get instant
          creative insights.
        </p>
        <div className="absolute bottom-6 right-6 flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/30"
            alt="alex"
            className="rounded-full w-8 h-8 border"
          />
          <p className="text-sm font-medium">
            Hello, Alex! <br />
            Have a nice day!
          </p>
        </div>
      </div>

      {/* Upload Card */}
      <div
        className="bg-white rounded-3xl shadow-md flex flex-col justify-center items-center cursor-pointer shadow-md"
        onClick={handleCardClick}
      >
        <img src={VideoUpload} alt="Upload" className="w-full object-contain" />

        {/* Hidden File Input */}
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          onChange={handleVideoUpload}
          className="hidden"
        />
      </div>

      {/* Stats Cards */}
      <div className="col-span-3 grid grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-4 shadow-md">
          <p className="text-sm text-gray-500 mb-2">Time Saved</p>
          <h2 className="text-2xl font-bold text-purple-600">42 hrs/week</h2>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-md">
          <p className="text-sm text-gray-500 mb-2">Videos Analyzed</p>
          <h2 className="text-2xl font-bold">128</h2>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-md">
          <p className="text-sm text-gray-500 mb-2">Top Emotion</p>
          <h2 className="text-2xl font-bold text-orange-500">Joy</h2>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-md">
          <p className="text-sm text-gray-500 mb-2">Brand Impact Score</p>
          <h2 className="text-2xl font-bold text-green-500">+23%</h2>
        </div>
      </div>

      {/* Latest Video Section */}
      <div className="col-span-3 bg-white rounded-3xl p-5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://placehold.co/120x80"
            alt="thumbnail"
            className="rounded-lg object-cover"
          />
          <div>
            <p className="text-sm text-gray-500">Video Title</p>
            <h3 className="text-lg font-semibold">Train _Vs_ Giant _Pit</h3>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="text-sm">
            <p className="text-gray-500">Video Duration</p>
            <p className="font-medium">00:10:35</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">Date Uploaded</p>
            <p className="font-medium">05/10/2025</p>
          </div>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Analyze ✨
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
