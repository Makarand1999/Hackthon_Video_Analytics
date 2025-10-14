// import React, { useEffect, useRef, useState } from "react";
// import { Copy, Send, Lightbulb, User, Bot, Video } from "lucide-react";
// import { apiClient } from "../API/apiservises";
// import APIEndpoints from "../API/profile/APIEndpoints";
// import { useLocation } from "react-router-dom";

// const Analyzer = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const videoIdFromParams = params.get("video_id");
//   const videoIdState = location.state?.video_id;
//   const [videoId, setVideoId] = useState(videoIdState || videoIdFromParams || null);
//   const [videos, setVideos] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [prompt, setPrompt] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [isThinking, setIsThinking] = useState(false);
//   const chatEndRef = useRef(null);

//   const insights = [
//     "Generate hashtags and topics",
//     "What are highlighted moments of this video?",
//     "How do faces or music feel?",
//     "What’s this video about?",
//     "Where is this scene set?",
//     "Any logo or product shown?",
//   ];

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isThinking]);

//   const fetchVideos = async () => {
//     try {
//       const response = await apiClient.get(APIEndpoints.get_all_Video);
//       if (response?.status && response?.videos_list) {
//         setVideos(response.videos_list);
//       }
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     }
//   };

//   useEffect(() => {
//     if (!videoId) fetchVideos();
//   }, [videoId]);

//   const startTypewriter = (text, callback) => {
//     let i = 0;
//     const interval = setInterval(() => {
//       i++;
//       callback(text.slice(0, i));
//       if (i >= text.length) clearInterval(interval);
//     }, 25);
//   };

//   const handleChat = async (inputPrompt = prompt) => {
//     if (!inputPrompt.trim()) return;
//     if (!videoId) {
//       alert("Please select a video first!");
//       return;
//     }

//     const newUserMsg = { role: "user", text: inputPrompt };
//     setMessages((prev) => [...prev, newUserMsg]);
//     setPrompt("");
//     setIsThinking(true);

//     try {
//       const response = await apiClient.get(
//         APIEndpoints.Promot_Api.replace("{Video_Id}", videoId).replace(
//           "{Prompt}",
//           inputPrompt
//         )
//       );

//       const resultText = response?.result || "No insights available.";
//       setIsThinking(false);

//       setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

//       startTypewriter(resultText, (typed) => {
//         setMessages((prev) => {
//           const updated = [...prev];
//           updated[updated.length - 1].text = typed;
//           return updated;
//         });
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       setIsThinking(false);
//     }
//   };

//   const handleVideoSelect = (id) => {
//     setVideoId(id);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="h-full bg-[#f5f8ff] p-2 md:p-4 rounded-2xl relative">
//       {/* ✅ Modal for selecting videos */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white w-11/12 md:w-[450px] rounded-2xl shadow-xl p-5">
//             <h3 className="text-lg font-semibold text-gray-700 mb-3">
//               Select a Video
//             </h3>
//             <div className="max-h-[300px] overflow-y-auto space-y-2">
//               {videos.length === 0 ? (
//                 <p className="text-gray-500 text-sm text-center">
//                   No videos found.
//                 </p>
//               ) : (
//                 videos.map((v) => (
//                   <div
//                     key={v.video_id}
//                     onClick={() => handleVideoSelect(v.video_id)}
//                     className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition"
//                   >
//                     <Video className="text-blue-500 w-5 h-5" />
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">
//                         {v.title}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {new Date(v.date_uploaded).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-sm px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
//         {/* Left Section */}
//         <div className="bg-white rounded-2xl shadow p-2 md:p-3 flex flex-col justify-between h-full">
//           {!videoId ? (
//             <div className="flex flex-col items-center justify-center h-full">
//               <p className="text-gray-600 text-sm md:text-base mb-3">
//                 No video selected
//               </p>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
//               >
//                 Select a Video
//               </button>
//             </div>
//           ) : (
//             <>
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <h2 className="text-base md:text-lg font-semibold text-gray-700">
//                     Uploaded Video
//                   </h2>
//                   <button
//                     className="flex items-center gap-1 border border-gray-300 text-gray-600 px-2 py-1.5 rounded-lg hover:bg-blue-50 text-xs md:text-sm transition"
//                     onClick={() => navigator.clipboard.writeText(videoId)}
//                   >
//                     Copy ID
//                     <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
//                   </button>
//                 </div>

//                 <video
//                   src={APIEndpoints.download_video.replace("{Video_Id}", videoId)}
//                   controls
//                   className="w-full rounded-xl mb-4 object-cover h-40 md:h-48"
//                 />
//               </div>

//               <div className="flex flex-col gap-2 overflow-y-auto h-[120px] md:h-[150px]">
//                 {insights.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-2 bg-blue-50/40 hover:bg-blue-100/50 rounded-xl px-3 py-2 text-gray-700 cursor-pointer text-sm"
//                     onClick={() => handleChat(item)}
//                   >
//                     <Lightbulb className="w-4 h-4 text-yellow-500" />
//                     <span>{item}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="border border-pink-200 bg-pink-50/40 rounded-xl p-2.5 flex items-center justify-between mt-3">
//                 <input
//                   type="text"
//                   placeholder="Type prompt here..."
//                   className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
//                   onChange={(e) => setPrompt(e.target.value)}
//                   value={prompt}
//                   onKeyDown={(e) => e.key === "Enter" && handleChat()}
//                 />
//                 <button
//                   className="text-pink-500 hover:text-pink-600 transition p-1.5"
//                   onClick={() => handleChat()}
//                 >
//                   <Send className="w-4 h-4" />
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Right Section */}
//         <div className="bg-white rounded-2xl shadow p-2 md:p-3 flex flex-col h-full lg:h-[480px]">
//           <div className="flex-1 min-h-[400px] overflow-y-auto border border-gray-200 bg-gray-50 rounded-xl p-3 md:p-4 space-y-3 text-sm">
//             {messages.length === 0 && (
//               <p className="text-gray-500 text-center mt-20 text-sm">
//                 Start a conversation or select an insight
//               </p>
//             )}

//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex items-end gap-2 ${
//                   msg.role === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 {msg.role === "assistant" && (
//                   <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300">
//                     <Bot className="w-3.5 h-3.5 text-gray-700" />
//                   </div>
//                 )}
//                 <div
//                   className={`px-3 py-2 rounded-2xl text-xs md:text-sm shadow-sm max-w-[75%] leading-relaxed ${
//                     msg.role === "user"
//                       ? "bg-blue-500 text-white rounded-br-none"
//                       : "bg-gray-200 text-gray-800 rounded-bl-none"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//                 {msg.role === "user" && (
//                   <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100">
//                     <User className="w-3.5 h-3.5 text-blue-600" />
//                   </div>
//                 )}
//               </div>
//             ))}

//             {isThinking && (
//               <div className="flex items-center gap-2">
//                 <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300">
//                   <Bot className="w-3.5 h-3.5 text-gray-700" />
//                 </div>
//                 <div className="px-3 py-2 rounded-2xl text-xs bg-gray-200 text-gray-800 flex items-center gap-1">
//                   <span className="flex gap-1 ml-1">
//                     <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]" />
//                     <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
//                     <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
//                   </span>
//                 </div>
//               </div>
//             )}
//             <div ref={chatEndRef} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analyzer;
import React, { useEffect, useRef, useState } from "react";
import { Copy, Send, Lightbulb, User, Bot, Search } from "lucide-react";
import { apiClient } from "../API/apiservises";
import APIEndpoints from "../API/profile/APIEndpoints";
import { useLocation } from "react-router-dom";

const Analyzer = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const videoIdFromParams = params.get("video_id");
  const [videoId, setVideoId] = useState(location.state?.video_id || videoIdFromParams);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const insights = [
    "Generate hashtags and topics",
    "What are highlighted moments of this video?",
    "How do faces or music feel?",
    "What’s this video about?",
    "Where is this scene set?",
    "Any logo or product shown?",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

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

  // Typewriter logic
  const startTypewriter = (text, callback) => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      callback(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 25);
  };

  const handleChat = async (inputPrompt = prompt) => {
    if (!inputPrompt.trim() || !videoId) return;
    const newUserMsg = { role: "user", text: inputPrompt };
    setMessages((prev) => [...prev, newUserMsg]);
    setPrompt("");
    setIsThinking(true);

    try {
      const response = await apiClient.get(
        APIEndpoints.Promot_Api.replace("{Video_Id}", videoId).replace("{Prompt}", inputPrompt)
      );

      const resultText = response?.result || "No insights available.";
      setIsThinking(false);

      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);
      startTypewriter(resultText, (typed) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = typed;
          return updated;
        });
      });
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
    }
  };

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full bg-[#f5f8ff] p-2 md:p-4 rounded-2xl relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
        {/* Left Section */}
        <div className="bg-white rounded-2xl shadow p-2 md:p-3 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base md:text-lg font-semibold text-gray-700">
                Uploaded Video
              </h2>
              {videoId && (
                <button
                  className="flex items-center gap-1 border border-gray-300 text-gray-600 px-2 py-1.5 rounded-lg hover:bg-blue-50 text-xs md:text-sm transition"
                  onClick={() => navigator.clipboard.writeText(videoId)}
                >
                  Copy ID
                  <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              )}
            </div>

            {/* Show Video or Select Button */}
            {videoId ? (
              <video
                src={APIEndpoints.download_video.replace("{Video_Id}", videoId)}
                controls
                className="w-full rounded-xl mb-4 object-cover h-40 md:h-48"
              />
            ) : (
              <div className="flex items-center justify-center h-40 md:h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                <button
                  onClick={() => {
                    setShowPopup(true);
                    fetchVideos();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Select a Video
                </button>
              </div>
            )}
          </div>

          {/* Insights */}
          <div className="flex flex-col gap-2 overflow-y-auto h-[120px] md:h-[150px]">
            {insights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-50/40 hover:bg-blue-100/50 rounded-xl px-3 py-2 text-gray-700 cursor-pointer text-sm"
                onClick={() => handleChat(item)}
              >
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="border border-pink-200 bg-pink-50/40 rounded-xl p-2.5 flex items-center justify-between mt-3">
            <input
              type="text"
              placeholder="Type prompt here..."
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
            />
            <button
              className="text-pink-500 hover:text-pink-600 transition p-1.5"
              onClick={() => handleChat()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-2xl shadow p-2 md:p-3 flex flex-col h-full lg:h-[480px]">
          <div className="flex-1 min-h-[400px] overflow-y-auto border border-gray-200 bg-gray-50 rounded-xl p-3 md:p-4 space-y-3 text-sm">
            {messages.length === 0 && (
              <p className="text-gray-500 text-center mt-20 text-sm">
                Start a conversation or select an insight
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300">
                    <Bot className="w-3.5 h-3.5 text-gray-700" />
                  </div>
                )}
                <div
                  className={`px-3 py-2 rounded-2xl text-xs md:text-sm shadow-sm max-w-[75%] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300">
                  <Bot className="w-3.5 h-3.5 text-gray-700" />
                </div>
                <div className="px-3 py-2 rounded-2xl text-xs bg-gray-200 text-gray-800 flex items-center gap-1">
                  <span className="flex gap-1 ml-1">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      {/* Video Selection Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-4 md:p-6 w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-700">Select a Video</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border rounded-lg pl-8 pr-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {filteredVideos.map((video) => (
                <div
                  key={video.video_id}
                  className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => {
                    setVideoId(video.video_id);
                    setShowPopup(false);
                  }}
                >
                  <div className="relative group">
                    <video
                      src={APIEndpoints.download_video.replace("{Video_Id}", video.video_id)}
                      className="w-full h-32 object-cover"
                      muted
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs p-1 text-center">
                      {video.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <p className="text-center text-gray-500 text-sm mt-4">No videos found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
