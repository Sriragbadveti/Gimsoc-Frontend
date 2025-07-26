"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Sidebar from "./Sidebar"
import UserProfile from "./ProfilePage"
import PersonalizedSchedule from "./SchedulePage"
import SpeakerInfo from "./SpeakersPage"
import LiveFeatures from "./LiveFeatures"
import VenueMap from "./VenuePage"
import Resources from "./ResourcesPage"
import Booths from "./BoothsPage"
import ContactUs from "./ContactPage"

// Navigation items
const navItems = [
  { id: "profile", label: "Profile", icon: "User" },
  { id: "schedule", label: "Schedule", icon: "Calendar" },
  { id: "speakers", label: "Speakers", icon: "Users" },
  { id: "live", label: "Live Features", icon: "Radio" },
  { id: "venue", label: "Venue", icon: "MapPin" },
  { id: "resources", label: "Resources", icon: "FileText" },
  { id: "booths", label: "Exhibition", icon: "Building" },
  { id: "contact", label: "Contact", icon: "Mail" },
]

function AttendeeDashboard() {
  const [activeSection, setActiveSection] = useState("profile")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Checking dashboard authentication...")
        
        // Get user data from localStorage (set during login)
        const storedUserData = localStorage.getItem('dashboardUserData');
        const userEmail = localStorage.getItem('dashboardUserEmail');
        
        if (!storedUserData || !userEmail) {
          console.log("❌ No user data found, redirecting to login");
          navigate("/dashboard-login");
          return;
        }
        
        // Parse the stored user data
        const userData = JSON.parse(storedUserData);
        
        console.log("✅ Dashboard authentication successful with stored data")
        setIsAuthenticated(true)
        setUserData(userData)
      } catch (error) {
        console.error("❌ Dashboard authentication failed:", error)
        console.error("❌ Error response:", error.response?.data)
        console.error("❌ Error status:", error.response?.status)
        navigate("/dashboard-login")
        return
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const handleLogout = async () => {
    try {
      await axios.post("https://gimsoc-backend.onrender.com/api/dashboard/logout", {}, {
        withCredentials: true,
      })
      navigate("/dashboard-login")
    } catch (error) {
      console.error("❌ Logout failed:", error)
      navigate("/dashboard-login")
    }
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <UserProfile userData={userData} />
      case "schedule":
        return <PersonalizedSchedule scheduleData={[]} />
      case "speakers":
        return <SpeakerInfo speakersData={[]} />
      case "live":
        return <LiveFeatures />
      case "venue":
        return <VenueMap />
      case "resources":
        return <Resources />
      case "booths":
        return <Booths boothsData={[]} />
      case "contact":
        return <ContactUs />
      default:
        return <UserProfile userData={userData} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navItems={navItems}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderActiveSection()}</div>
        </main>
      </div>
    </div>
  )
}

export default AttendeeDashboard
