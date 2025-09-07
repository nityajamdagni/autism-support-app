/*import React, { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🎤 Voice Input (Speech-to-Text)
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("❌ Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setUserInput(speechText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  // 🔊 Voice Output (Text-to-Speech)
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3",
          messages: updatedMessages,
          stream: false,
        }),
      });

      const data = await response.json();
      console.log("AI Response:", data); // Debug log

      const aiContent =
        data?.message?.content?.trim() || "⚠️ AI returned empty response.";
      const aiMessage = {
        role: "assistant",
        content: aiContent,
      };

      setMessages([...updatedMessages, aiMessage]);

      // 🔊 Speak the AI response
      speak(aiContent);
    } catch (err) {
      console.error("Error talking to Ollama:", err);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "❌ Error talking to AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow h-[80vh] flex flex-col">
      <h2 className="text-xl font-bold mb-4">Ask Autism Support AI</h2>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2 border rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            <p className="font-semibold mb-1">
              {msg.role === "user" ? "You:" : "AI:"}
            </p>
            <pre className="text-sm">{msg.content}</pre>
          </div>
        ))}
        {loading && <p className="text-gray-500 italic">AI is typing...</p>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about autism, therapies, support..."
        />
        {/* 🎤 Voice button *//*
        <button
          onClick={startListening}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          🎤
        </button>
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChatPage;*/
// src/components/ChatPage.jsx
import React, { useState, useEffect, useRef } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);

  // Auto-scroll when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🎤 Voice Input (Speech-to-Text)
  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("❌ Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setUserInput(speechText);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
    recognition.start();
  };

  // 🔊 Voice Output (Text-to-Speech)
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    // Clean simple markdown symbols so TTS sounds nicer
    const clean = text.replace(/[*_#`>]/g, "");
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = "en-US";
    // cancel any ongoing speech so replies don't overlap
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  // Send message
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput.trim() };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3",
          messages: updated,
          stream: false,
        }),
      });

      const data = await res.json();
      const aiContent =
        (data && data.message && data.message.content
          ? data.message.content
          : ""
        ).trim() || "⚠️ No response.";

      const aiMessage = { role: "assistant", content: aiContent };
      setMessages([...updated, aiMessage]);
      speak(aiContent);
    } catch (err) {
      console.error("Error talking to Ollama:", err);
      setMessages([
        ...updated,
        { role: "assistant", content: "❌ Error talking to AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow h-[80vh] flex flex-col">
      <h2 className="text-xl font-bold mb-4">Ask Autism Support AI</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2 border rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            <p className="font-semibold mb-1">
              {msg.role === "user" ? "You:" : "AI:"}
            </p>
            <p className="text-sm whitespace-pre-wrap break-words">
              {msg.content}
            </p>
          </div>
        ))}
        {loading && <p className="text-gray-500 italic">AI is typing...</p>}
        <div ref={endRef} />
      </div>

      {/* Input + Controls */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about autism, therapies, support..."
        />
        <button
          onClick={startListening}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          aria-label="Start voice input"
          title="Start voice input"
        >
          {"\uD83C\uDFA4"}
        </button>
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
