// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-blue-700 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Autism Support</h1>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          className={`${
            location.pathname === "/" ? "bg-blue-600" : ""
          } p-2 rounded hover:bg-blue-600`}
        >
          Test
        </Link>
        <Link
          to="/chat"
          className={`${
            location.pathname === "/chat" ? "bg-blue-600" : ""
          } p-2 rounded hover:bg-blue-600`}
        >
          Chat with AI
        </Link>
        <Link
          to="/therapy"
          className={`${
            location.pathname === "/therapy" ? "bg-blue-600" : ""
          } p-2 rounded hover:bg-blue-600`}
        >
          Therapy Suggestions
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
