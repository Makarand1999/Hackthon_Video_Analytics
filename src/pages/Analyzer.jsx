import React, { useEffect, useRef, useState } from "react";
import { Copy, Send, Lightbulb, User, Bot } from "lucide-react";
import { apiClient } from "../API/apiservises";
import APIEndpoints from "../API/profile/APIEndpoints";

const Analyzer = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const chatEndRef = useRef(null);

  const insights = [
    "Generate hashtags and topics",
    "What are highlighted moments of this video?",
    "How do faces or music feel?",
    "What’s this video about?",
    "Where is this scene set?",
    "Any logo or product shown?",
  ];

  // Auto scroll when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typewriterText, isThinking]);

  // Typewriter effect
  const startTypewriter = (text) => {
    let i = 0;
    setTypewriterText("");
    const interval = setInterval(() => {
      setTypewriterText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 25);
  };

  // Send chat or insight
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
          "68e268da3a1b0bed6c136f2c"
        ).replace("{Prompt}", inputPrompt)
      );

      const resultText = response?.result || "No insights available.";
      setIsThinking(false);
      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);
      startTypewriter(resultText);
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
    }
  };

  // Update assistant message with typewriter text
  useEffect(() => {
    if (typewriterText && messages[messages.length - 1]?.role === "assistant") {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = typewriterText;
        return updated;
      });
    }
  }, [typewriterText]);

  return (
    <div className="h-[100%] bg-[#f5f8ff] p-8 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* ⬅️ Left Section - Video + Prompt (Fixed, full height) */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-full">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Uploaded Video
              </h2>
              <button className="flex items-center gap-2 border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition">
                Copy ID
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {/* Video */}
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              className="w-full rounded-xl mb-6 object-cover h-64"
            />
          </div>
          <div className="flex flex-col gap-3 overflow-auto h-[150px]">
            {insights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-blue-50/40 hover:bg-blue-100/50 transition rounded-xl px-4 py-3 text-gray-700 cursor-pointer"
                onClick={() => handleChat(item)}
              >
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
          {/* Prompt Input (Fixed at bottom of left panel) */}
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
              onClick={() => handleChat()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ➡️ Right Section - Chat + Insights */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col overflow-hidden h-[630px]">
          {/* Chat Section */}
          <div className="flex-1 min-h-[400px] overflow-y-auto border border-gray-200 bg-gray-50 rounded-xl p-4 mb-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-gray-500 text-center mt-20">
                Start a conversation or select an insight
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Bot Avatar */}
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 shadow">
                    <Bot className="w-4 h-4 text-gray-700" />
                  </div>
                )}

                {/* Chat Bubble */}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>

                {/* User Avatar */}
                {msg.role === "user" && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 shadow">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))}

            {/* Thinking dots */}
            {isThinking && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 shadow">
                  <Bot className="w-4 h-4 text-gray-700" />
                </div>
                <div className="px-4 py-2 rounded-2xl text-sm bg-gray-200 text-gray-800 flex items-center gap-1">
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

          {/* Insights Section (Fixed below chat) */}
          
        </div>
      </div>
    </div>
  );
};

export default Analyzer;