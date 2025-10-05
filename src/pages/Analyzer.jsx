// import React, { use } from "react";
// import { Copy, Send, Lightbulb } from "lucide-react"; // npm install lucide-react

// const Analyzer = () => {
//   const [promot, setPromot] = React.useState("");
//   const insights = [
//     "Generate hashtags and topics",
//     "What are highlighted moments of this video?",
//     "How do faces or music feel?",
//     "What’s this video about?",
//     "Where is this scene set?",
//     "Any logo or product shown?",
//   ];
//   const handleChat = async () => {
//     // Handle chat submission logic here
//     try {
//       const response = await apiClient.get(
//         APIEndpoints.Promot_Api.replace("{Video_Id}", "123").replace(
//           "{Prompt}",
//           promot
//         )
//       );
//       console.log("Chat response:", response);
//     } catch (error) {
//       console.error("Error in chat submission:", error);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-[#f5f8ff] p-8 rounded-2xl">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left section */}
//         <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-lg font-semibold text-gray-700">
//                 Uploaded Video
//               </h2>
//               <button className="flex items-center gap-2 border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition">
//                 Copy ID
//                 <Copy className="w-4 h-4" />
//               </button>
//             </div>

//             <p className="text-gray-600 mb-4">
//               What a beautiful nature of this place.
//             </p>

//             <img
//               src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
//               alt="Uploaded"
//               className="w-full rounded-xl mb-4 object-cover h-64"
//             />
//           </div>

//           <div className="border border-pink-200 bg-pink-50/40 rounded-xl p-3 flex items-center justify-between h-[180px]">
//             <input
//               type="text"
//               placeholder="Type prompt here..."
//               className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//               onChange={(e) => setPromot(e.target.value)}
//               value={promot}
//             />
//             <button className="text-pink-500 hover:text-pink-600 transition p-2">
//               <Send
//                 className="w-5 h-5"
//                 onClick={() => {
//                   handleChat();
//                 }}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Right section */}
//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <div className="flex flex-col gap-3">
//             {insights.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-3 bg-blue-50/40 hover:bg-blue-100/50 transition rounded-xl px-4 py-3 text-gray-700 cursor-pointer"
//               >
//                 <Lightbulb className="w-5 h-5 text-yellow-500" />
//                 <span className="font-medium">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analyzer;
import React from "react";
import { Copy, Send, Lightbulb } from "lucide-react"; // npm install lucide-react
import { apiClient } from "../API/apiservises";
import APIEndpoints from "../API/profile/APIEndpoints";

const Analyzer = () => {
  const [prompt, setPrompt] = React.useState("");
  const [messages, setMessages] = React.useState([
    { role: "system", text: "Hi 👋! I’m your AI video analyzer assistant." },
  ]);

  const insights = [
    "Generate hashtags and topics",
    "What are highlighted moments of this video?",
    "How do faces or music feel?",
    "What’s this video about?",
    "Where is this scene set?",
    "Any logo or product shown?",
  ];

  const handleChat = async () => {
    if (!prompt.trim()) return;

    const newMsg = { role: "user", text: prompt };
    setMessages((prev) => [...prev, newMsg]);
    setPrompt("");

    try {
      // Example API call (replace this with your own)
      const response = await apiClient.get(
        APIEndpoints.Promot_Api.replace(
          "{Video_Id}",
          "68e268da3a1b0bed6c136f2c"
        ).replace("{Prompt}", prompt)
      );
      console.log("Chat response:", response);

      // Simulated AI response (for demo)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `${response.result}`,
          },
        ]);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] p-8 rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left section */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-700">
              Uploaded Video
            </h2>
            <button className="flex items-center gap-2 border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition">
              Copy ID
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <p className="text-gray-600 mb-4">
            What a beautiful nature of this place.
          </p>

          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
            alt="Uploaded"
            className="w-full rounded-xl mb-4 object-cover h-64"
          />

          {/* 💬 Chat Display */}
          <div className="flex-1 overflow-y-auto border border-gray-200 bg-gray-50 rounded-xl p-4 mb-3 space-y-3 max-h-64">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="border border-pink-200 bg-pink-50/40 rounded-xl p-3 flex items-center justify-between">
            <input
              type="text"
              placeholder="Type prompt here..."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
            />
            <button
              className="text-pink-500 hover:text-pink-600 transition p-2"
              onClick={handleChat}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col gap-3">
            {insights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-blue-50/40 hover:bg-blue-100/50 transition rounded-xl px-4 py-3 text-gray-700 cursor-pointer"
                onClick={() => setPrompt(item)}
              >
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
