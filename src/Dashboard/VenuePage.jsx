"use client"

import { useState } from "react"
import { Navigation, Clock, Users } from "lucide-react"
import Card from "./Card"


const VenuePage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [mapView, setMapView] = useState("interactive") // interactive or floor

  const locations = [
    {
      id: 1,
      name: "Grand Auditorium",
      type: "auditorium",
      x: 30,
      y: 20,
      capacity: 500,
      description: "Main keynote presentations and opening ceremonies",
      currentEvent: "Opening Keynote",
      nextEvent: "Closing Ceremony - 2:00 PM",
    },
    {
      id: 2,
      name: "Conference Room A",
      type: "conference",
      x: 15,
      y: 40,
      capacity: 80,
      description: "Workshop sessions and technical presentations",
      currentEvent: "AI Healthcare Workshop",
      nextEvent: "Data Science Workshop - 2:00 PM",
    },
    {
      id: 3,
      name: "Conference Room B",
      type: "conference",
      x: 45,
      y: 40,
      capacity: 80,
      description: "Panel discussions and breakout sessions",
      currentEvent: "Available",
      nextEvent: "ML Panel Discussion - 2:00 PM",
    },
    {
      id: 4,
      name: "Conference Room C",
      type: "conference",
      x: 65,
      y: 40,
      capacity: 60,
      description: "Technical sessions and workshops",
      currentEvent: "Python Workshop",
      nextEvent: "Ethics in AI - 3:30 PM",
    },
    {
      id: 5,
      name: "Main Dining Hall",
      type: "dining",
      x: 30,
      y: 60,
      capacity: 400,
      description: "Meals, refreshments, and networking",
      currentEvent: "Coffee Break",
      nextEvent: "Lunch Service - 12:30 PM",
    },
    {
      id: 6,
      name: "Exhibition Hall",
      type: "exhibition",
      x: 75,
      y: 20,
      capacity: 200,
      description: "Poster sessions, sponsor booths, and exhibitions",
      currentEvent: "Sponsor Exhibition",
      nextEvent: "Poster Session - 3:00 PM",
    },
    {
      id: 7,
      name: "Innovation Hub",
      type: "common",
      x: 30,
      y: 80,
      capacity: 100,
      description: "Startup showcase and networking area",
      currentEvent: "Networking",
      nextEvent: "Startup Pitches - 4:00 PM",
    },
    {
      id: 8,
      name: "Registration Lobby",
      type: "facilities",
      x: 10,
      y: 70,
      capacity: 50,
      description: "Check-in, information desk, and help center",
      currentEvent: "Registration Open",
      nextEvent: "Always Available",
    },
  ]

  const getLocationColor = (type) => {
    const colors = {
      auditorium: "bg-blue-500 border-blue-600",
      conference: "bg-green-500 border-green-600",
      dining: "bg-orange-500 border-orange-600",
      exhibition: "bg-purple-500 border-purple-600",
      common: "bg-indigo-500 border-indigo-600",
      facilities: "bg-gray-500 border-gray-600",
    }
    return colors[type] || "bg-gray-500 border-gray-600"
  }

  const getTypeIcon = (type) => {
    const icons = {
      auditorium: "🎭",
      conference: "🏢",
      dining: "🍽️",
      exhibition: "🖼️",
      common: "👥",
      facilities: "ℹ️",
    }
    return icons[type] || "📍"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Venue Map</h1>
          <p className="text-gray-600 mt-2">Navigate the conference venue with our interactive map</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMapView("interactive")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mapView === "interactive" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              Interactive
            </button>
            <button
              onClick={() => setMapView("floor")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mapView === "floor" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              Floor Plan
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <Card>
            <div className="p-6">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg h-96 border-2 border-gray-200 overflow-hidden">
                {/* Map background */}
                <div className="absolute inset-0 p-4">
                  <div className="w-full h-full relative">
                    {locations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => setSelectedLocation(location)}
                        className={`absolute w-6 h-6 rounded-full border-2 ${getLocationColor(location.type)} 
                          hover:scale-125 transition-all duration-200 cursor-pointer shadow-lg z-10
                          ${selectedLocation?.id === location.id ? "scale-125 ring-4 ring-blue-300" : ""}`}
                        style={{
                          left: `${location.x}%`,
                          top: `${location.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        title={location.name}
                      >
                        <span className="sr-only">{location.name}</span>
                      </button>
                    ))}

                    {/* Map labels */}
                    {locations.map((location) => (
                      <div
                        key={`label-${location.id}`}
                        className="absolute text-xs font-medium text-gray-700 pointer-events-none bg-white px-2 py-1 rounded shadow-sm"
                        style={{
                          left: `${location.x}%`,
                          top: `${location.y + 8}%`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        {location.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Building structure */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-4 border-2 border-gray-400 rounded-lg bg-white bg-opacity-20"></div>
                  <div className="absolute top-1/2 left-4 right-4 h-3 bg-gray-300 bg-opacity-50 transform -translate-y-1/2 rounded"></div>
                  <div className="absolute left-1/2 top-4 bottom-4 w-3 bg-gray-300 bg-opacity-50 transform -translate-x-1/2 rounded"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Legend */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
              <div className="space-y-3">
                {[
                  { type: "auditorium", label: "Auditorium" },
                  { type: "conference", label: "Conference Rooms" },
                  { type: "dining", label: "Dining Areas" },
                  { type: "exhibition", label: "Exhibition Spaces" },
                  { type: "common", label: "Common Areas" },
                  { type: "facilities", label: "Facilities" },
                ].map((item) => (
                  <div key={item.type} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${getLocationColor(item.type)}`}></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Selected Location Details */}
          {selectedLocation && (
            <Card>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">{getTypeIcon(selectedLocation.type)}</span>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedLocation.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">{selectedLocation.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Capacity: {selectedLocation.capacity} people</span>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center text-sm text-blue-800 mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">Current Event</span>
                    </div>
                    <p className="text-blue-900">{selectedLocation.currentEvent}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Navigation className="w-4 h-4 mr-2" />
                      <span className="font-medium">Next Event</span>
                    </div>
                    <p className="text-gray-700">{selectedLocation.nextEvent}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedLocation(null)}
                  className="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-800 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Close Details
                </button>
              </div>
            </Card>
          )}

          {/* Quick Navigation */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full text-left p-3 text-sm rounded-lg transition-colors flex items-center space-x-3 ${
                      selectedLocation?.id === location.id
                        ? "bg-blue-50 text-blue-900 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{getTypeIcon(location.type)}</span>
                    <div className="flex-1">
                      <div className="font-medium">{location.name}</div>
                      <div className="text-xs text-gray-500">{location.currentEvent}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default VenuePage
