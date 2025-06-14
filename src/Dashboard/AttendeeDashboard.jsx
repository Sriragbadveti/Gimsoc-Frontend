"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import UserProfile from "./ProfilePage"
import PersonalizedSchedule from "./SchedulePage"
import SpeakerInfo from "./SpeakersPage"
import LiveFeatures from "./LiveFeatures"
import VenueMap from "./VenuePage"
import Resources from "./ResourcesPage"
import Booths from "./BoothsPage"
import ContactUs from "./ContactPage"

// Mock data
const userData = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@university.edu",
  affiliation: "Stanford University",
  photo: "/placeholder.svg?height=100&width=100&text=SJ",
  qrCode: "/placeholder.svg?height=150&width=150&text=QR",
  ticketId: "CONF2024-001234",
  ticketType: "Premium Access",
}

const scheduleData = [
  {
    day: "Day 1 - March 15",
    sessions: [
      { time: "09:00", title: "Opening Keynote", speaker: "Dr. Michael Chen", location: "Main Hall", type: "keynote" },
      {
        time: "10:30",
        title: "AI in Healthcare Workshop",
        speaker: "Dr. Sarah Johnson",
        location: "Room A",
        type: "workshop",
      },
      {
        time: "14:00",
        title: "Panel Discussion: Future of Medicine",
        speaker: "Multiple Speakers",
        location: "Main Hall",
        type: "panel",
      },
      { time: "16:00", title: "Networking Session", speaker: "", location: "Lobby", type: "networking" },
    ],
  },
  {
    day: "Day 2 - March 16",
    sessions: [
      { time: "09:00", title: "Research Presentations", speaker: "Various", location: "Room B", type: "presentation" },
      {
        time: "11:00",
        title: "Innovation Showcase",
        speaker: "Tech Companies",
        location: "Exhibition Hall",
        type: "showcase",
      },
      {
        time: "15:00",
        title: "Closing Ceremony",
        speaker: "Conference Committee",
        location: "Main Hall",
        type: "ceremony",
      },
    ],
  },
]

const speakersData = [
  {
    id: 1,
    name: "Dr. Michael Chen",
    title: "Chief Medical Officer",
    company: "MedTech Innovations",
    bio: "Leading expert in medical technology with 15+ years of experience in healthcare innovation.",
    photo: "/placeholder.svg?height=80&width=80&text=MC",
    sessions: ["Opening Keynote", "Future of Digital Health"],
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    title: "Research Director",
    company: "Stanford University",
    bio: "Pioneering researcher in AI applications for healthcare diagnostics and treatment.",
    photo: "/placeholder.svg?height=80&width=80&text=SJ",
    sessions: ["AI in Healthcare Workshop", "Machine Learning Panel"],
  },
]

const boothsData = [
  {
    id: 1,
    name: "MedTech Solutions",
    type: "sponsor",
    description: "Leading provider of medical technology solutions",
    logo: "/placeholder.svg?height=60&width=60&text=MTS",
    resources: ["Product Catalog", "Demo Videos", "White Papers"],
  },
  {
    id: 2,
    name: "University Research Lab",
    type: "academic",
    description: "Cutting-edge research in biomedical engineering",
    logo: "/placeholder.svg?height=60&width=60&text=URL",
    resources: ["Research Papers", "Lab Tour Video", "Contact Info"],
  },
]

// Navigation items
const navItems = [
  { id: "profile", label: "Profile", icon: "User" },
  { id: "schedule", label: "Schedule", icon: "Calendar" },
  { id: "speakers", label: "Speakers", icon: "Users" },
  { id: "live", label: "Live Sessions", icon: "Video" },
  { id: "venue", label: "Venue Map", icon: "Map" },
  { id: "resources", label: "Resources", icon: "Download" },
  { id: "booths", label: "Booths", icon: "Store" },
  { id: "contact", label: "Contact", icon: "Mail" },
]

function AttendeeDashboard() {
  const [activeSection, setActiveSection] = useState("profile")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <UserProfile userData={userData} />
      case "schedule":
        return <PersonalizedSchedule scheduleData={scheduleData} />
      case "speakers":
        return <SpeakerInfo speakersData={speakersData} />
      case "live":
        return <LiveFeatures />
      case "venue":
        return <VenueMap />
      case "resources":
        return <Resources />
      case "booths":
        return <Booths boothsData={boothsData} />
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
