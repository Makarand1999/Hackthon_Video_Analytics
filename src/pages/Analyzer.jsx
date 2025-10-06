// import React, { useEffect, useRef, useState } from "react";
// import { Copy, Send, Lightbulb, User, Bot } from "lucide-react";
// import { apiClient } from "../API/apiservises";
// import APIEndpoints from "../API/profile/APIEndpoints";

// const Analyzer = () => {
//   const [prompt, setPrompt] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [isThinking, setIsThinking] = useState(false);
//   const [typewriterText, setTypewriterText] = useState("");
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
//   }, [messages, typewriterText, isThinking]);

//   const startTypewriter = (text) => {
//     let i = 0;
//     setTypewriterText("");
//     const interval = setInterval(() => {
//       setTypewriterText((prev) => prev + text.charAt(i));
//       i++;
//       if (i >= text.length) clearInterval(interval);
//     }, 25);
//   };

//   const handleChat = async (inputPrompt = prompt) => {
//     if (!inputPrompt.trim()) return;
//     const newUserMsg = { role: "user", text: inputPrompt };
//     setMessages((prev) => [...prev, newUserMsg]);
//     setPrompt("");
//     setIsThinking(true);

//     try {
//       const response = await apiClient.get(
//         APIEndpoints.Promot_Api.replace(
//           "{Video_Id}",
//           "68e3bd73f2e53b115e1b405a"
//         ).replace("{Prompt}", inputPrompt)
//       );

//       const resultText = response?.result || "No insights available.";
//       setIsThinking(false);
//       setMessages((prev) => [...prev, { role: "assistant", text: "" }]);
//       startTypewriter(resultText);
//     } catch (error) {
//       console.error("Error:", error);
//       setIsThinking(false);
//     }
//   };

//   useEffect(() => {
//     if (typewriterText && messages[messages.length - 1]?.role === "assistant") {
//       setMessages((prev) => {
//         const updated = [...prev];
//         updated[updated.length - 1].text = typewriterText;
//         return updated;
//       });
//     }
//   }, [typewriterText]);

//   return (
//     <div className="h-full bg-[#f5f8ff] p-2 md:p-4 rounded-2xl">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
//         {/* Left Section */}
//         <div className="bg-white rounded-2xl shadow p-2 md:p-3 flex flex-col justify-between h-full">
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-base md:text-lg font-semibold text-gray-700">
//                 Uploaded Video
//               </h2>
//               <button className="flex items-center gap-1 border border-gray-300 text-gray-600 px-2 py-1.5 rounded-lg hover:bg-blue-50 text-xs md:text-sm transition">
//                 Copy ID
//                 <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
//               </button>
//             </div>

//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               controls
//               className="w-full rounded-xl mb-4 object-cover h-40 md:h-48"
//             />
//           </div>

//           <div className="flex flex-col gap-2 overflow-y-auto h-[120px] md:h-[150px]">
//             {insights.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 bg-blue-50/40 hover:bg-blue-100/50 rounded-xl px-3 py-2 text-gray-700 cursor-pointer text-sm"
//                 onClick={() => handleChat(item)}
//               >
//                 <Lightbulb className="w-4 h-4 text-yellow-500" />
//                 <span>{item}</span>
//               </div>
//             ))}
//           </div>

//           <div className="border border-pink-200 bg-pink-50/40 rounded-xl p-2.5 flex items-center justify-between mt-3">
//             <input
//               type="text"
//               placeholder="Type prompt here..."
//               className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
//               onChange={(e) => setPrompt(e.target.value)}
//               value={prompt}
//               onKeyDown={(e) => e.key === "Enter" && handleChat()}
//             />
//             <button
//               className="text-pink-500 hover:text-pink-600 transition p-1.5"
//               onClick={() => handleChat()}
//             >
//               <Send className="w-4 h-4" />
//             </button>
//           </div>
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
import { Copy, Send, Lightbulb, User, Bot } from "lucide-react";
import { apiClient } from "../API/apiservises";
import APIEndpoints from "../API/profile/APIEndpoints";

const Analyzer = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

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

  // Typewriter logic (fixed)
  const startTypewriter = (text, callback) => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      callback(text.slice(0, i)); // ensures first char is included
      if (i >= text.length) clearInterval(interval);
    }, 25);
  };

  const handleChat = async (inputPrompt = prompt) => {
    if (!inputPrompt.trim()) return;
    const newUserMsg = { role: "user", text: inputPrompt };
    setMessages((prev) => [...prev, newUserMsg]);
    setPrompt("");
    setIsThinking(true);

    try {
      const response = await apiClient.get(
        APIEndpoints.Promot_Api.replace(
          "{Video_Id}",
          "68e3bd73f2e53b115e1b405a"
        ).replace("{Prompt}", inputPrompt)
      );

      const resultText = response?.result || "No insights available.";
      setIsThinking(false);

      // Push placeholder for assistant message
      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

      // Typewriter starts *after* assistant message is added
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

  return (
    <div className="h-full bg-[#f5f8ff] p-2 md:p-4 rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
        {/* Left Section */}
        <div className="bg-white rounded-2xl shadow p-2 md:p-3 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base md:text-lg font-semibold text-gray-700">
                Uploaded Video
              </h2>
              <button className="flex items-center gap-1 border border-gray-300 text-gray-600 px-2 py-1.5 rounded-lg hover:bg-blue-50 text-xs md:text-sm transition">
                Copy ID
                <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>

            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              className="w-full rounded-xl mb-4 object-cover h-40 md:h-48"
            />
          </div>

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
    </div>
  );
};

export default Analyzer;
