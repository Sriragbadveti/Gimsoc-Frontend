"use client"

import { Menu, X, Bell, Search } from "lucide-react"

export default function Header({ sidebarOpen, setSidebarOpen, userData, activeTab }) {
  const getPageTitle = () => {
    switch (activeTab) {
      case "profile":
        return "My Profile"
      case "schedule":
        return "Conference Schedule"
      case "speakers":
        return "Speakers & Presenters"
      case "venue":
        return "Venue Information"
      case "resources":
        return "Resources & Downloads"
      case "booths":
        return "Exhibition Booths"
      case "contact":
        return "Contact & Support"
      case "notifications":
        return "Notifications"
      default:
        return "Dashboard"
    }
  }

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h1 className="ml-2 text-xl font-bold text-gray-800 hidden md:block">{getPageTitle()}</h1>
        <h1 className="ml-2 text-lg font-bold text-gray-800 md:hidden">MEDCON 25</h1>
      </div>

      <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-1.5 flex-1 max-w-md mx-4">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search speakers, sessions, resources..."
          className="bg-transparent border-none focus:outline-none text-sm flex-1 text-gray-700"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium shadow-sm">
            {userData.name.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">Dr. {userData.name.split(" ")[1]}</span>
        </div>
      </div>
    </header>
  )
}
