"use client";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "schedule", label: "Schedule", icon: "📅" },
    { id: "speakers", label: "Speakers", icon: "🎤" },
    { id: "live", label: "Live Sessions", icon: "🔴" },
    { id: "venue", label: "Venue Map", icon: "🗺️" },
    { id: "resources", label: "Resources", icon: "📚" },
    { id: "booths", label: "Exhibition", icon: "🏢" },
    { id: "contact", label: "Contact", icon: "📞" },
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.post("https://gimsoc-backend.onrender.com/api/auth/logout", {}, { withCredentials: true });

      if (res.status === 200) {
        console.log("✅ Logged out successfully");
        navigate("/dashboard-login");
      } else {
        console.error("Logout failed", res);
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out border-r border-gray-100
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="/medcon-logo.png" 
                  alt="MEDCON Logo" 
                  className="h-24 w-auto"
                />
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-blue-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 group
                      ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {activeSection === item.id && <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="space-y-3">
              {/* Conference Info */}
              <div className="text-center">
                <p className="text-xs text-gray-500">October 24th, 2025</p>
                <p className="text-xs text-gray-500">Ivane Javakhishvili Tbilisi State University</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Return to Home
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;