"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Card from "./Card"

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState(1)
  const [viewMode, setViewMode] = useState("agenda") 

  const scheduleData = {
    1: [
      {
        time: "09:00",
        title: "Opening Ceremony & Keynote Address",
        speaker: "Dr. Jane Smith",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "90 min",
        attendees: 500,
      },
      {
        time: "10:30",
        title: "Coffee Break & Networking",
        speaker: "",
        location: "Exhibition Hall",
        type: "break",
        duration: "30 min",
        attendees: 500,
      },
      {
        time: "11:00",
        title: "AI in Healthcare: Current Applications",
        speaker: "Prof. John Doe",
        location: "Conference Room A",
        type: "workshop",
        duration: "90 min",
        attendees: 80,
      },
      {
        time: "12:30",
        title: "Lunch & Poster Session",
        speaker: "",
        location: "Main Dining Hall",
        type: "break",
        duration: "90 min",
        attendees: 500,
      },
      {
        time: "14:00",
        title: "Machine Learning Panel Discussion",
        speaker: "Multiple Experts",
        location: "Grand Auditorium",
        type: "panel",
        duration: "75 min",
        attendees: 300,
      },
      {
        time: "15:15",
        title: "Afternoon Coffee Break",
        speaker: "",
        location: "Exhibition Hall",
        type: "break",
        duration: "30 min",
        attendees: 500,
      },
      {
        time: "15:45",
        title: "Innovation Showcase",
        speaker: "Startup Founders",
        location: "Innovation Hub",
        type: "showcase",
        duration: "90 min",
        attendees: 150,
      },
    ],
    2: [
      {
        time: "09:00",
        title: "Data Science Trends & Future Directions",
        speaker: "Dr. Alice Brown",
        location: "Grand Auditorium",
        type: "keynote",
        duration: "60 min",
        attendees: 500,
      },
      {
        time: "10:00",
        title: "Python for Research Workshop",
        speaker: "Prof. Bob Wilson",
        location: "Computer Lab C",
        type: "workshop",
        duration: "120 min",
        attendees: 40,
      },
      {
        time: "12:00",
        title: "Lunch Break",
        speaker: "",
        location: "Main Dining Hall",
        type: "break",
        duration: "90 min",
        attendees: 500,
      },
      {
        time: "13:30",
        title: "Ethics in AI Development",
        speaker: "Dr. Carol Davis",
        location: "Conference Room B",
        type: "session",
        duration: "60 min",
        attendees: 120,
      },
      {
        time: "15:00",
        title: "Interactive Poster Session",
        speaker: "",
        location: "Exhibition Hall",
        type: "poster",
        duration: "120 min",
        attendees: 200,
      },
      {
        time: "17:00",
        title: "Closing Ceremony & Awards",
        speaker: "Conference Organizers",
        location: "Grand Auditorium",
        type: "ceremony",
        duration: "90 min",
        attendees: 500,
      },
    ],
  }

  const getTypeConfig = (type) => {
    const configs = {
      keynote: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: "🎤" },
      workshop: { color: "bg-green-100 text-green-800 border-green-200", icon: "🛠️" },
      panel: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: "👥" },
      session: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: "📋" },
      break: { color: "bg-gray-100 text-gray-600 border-gray-200", icon: "☕" },
      networking: { color: "bg-pink-100 text-pink-800 border-pink-200", icon: "🤝" },
      poster: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "📊" },
      showcase: { color: "bg-indigo-100 text-indigo-800 border-indigo-200", icon: "🚀" },
      ceremony: { color: "bg-red-100 text-red-800 border-red-200", icon: "🏆" },
    }
    return configs[type] || configs.session
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conference Schedule</h1>
          <p className="text-gray-600 mt-2">Your personalized 2-day conference itinerary</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("agenda")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "agenda" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              Agenda View
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "calendar" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <Card>
        <div className="p-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
            {[
              { day: 1, date: "June 15", label: "Day 1" },
              { day: 2, date: "June 16", label: "Day 2" },
            ].map((dayInfo) => (
              <button
                key={dayInfo.day}
                onClick={() => setSelectedDay(dayInfo.day)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  selectedDay === dayInfo.day ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{dayInfo.label}</div>
                  <div className="text-xs opacity-75">{dayInfo.date}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Schedule Content */}
      <Card>
        <div className="p-6">
          <div className="space-y-4">
            {scheduleData[selectedDay].map((session, index) => {
              const typeConfig = getTypeConfig(session.type)
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg border-l-4 bg-white border-l-gray-200 border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-mono text-gray-600">{session.time}</span>
                            <span className="text-sm text-gray-500">({session.duration})</span>
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${typeConfig.color}`}
                          >
                            <span className="mr-1">{typeConfig.icon}</span>
                            {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{session.title}</h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        {session.speaker && (
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{session.speaker}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{session.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{session.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {scheduleData[selectedDay].filter((s) => s.type !== "break").length}
            </div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {scheduleData[selectedDay].filter((s) => s.type === "workshop").length}
            </div>
            <div className="text-sm text-gray-600">Workshops Available</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {scheduleData[selectedDay].filter((s) => s.type === "keynote").length}
            </div>
            <div className="text-sm text-gray-600">Keynote Sessions</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SchedulePage
