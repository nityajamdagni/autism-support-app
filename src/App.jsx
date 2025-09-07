import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// These are in src/components
import ChatPage from "./components/ChatPage";
import TestPage from "./components/TestPage";
import Awareness from "./components/Awareness"; // ✅ New Awareness page

// This is directly in src
import Therapy from "./therapy";

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white h-screen p-4">
          <h1 className="text-2xl font-bold mb-6">Autism Support</h1>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="hover:underline">
                Awareness
              </Link>
            </li>
            <li>
              <Link to="/test" className="hover:underline">
                Test
              </Link>
            </li>
            <li>
              <Link to="/chat" className="hover:underline">
                Chat with AI
              </Link>
            </li>
            <li>
              <Link to="/therapy" className="hover:underline">
                Therapy Suggestions
              </Link>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Awareness />} /> {/* ✅ Default page */}
            <Route path="/test" element={<TestPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/therapy" element={<Therapy />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
