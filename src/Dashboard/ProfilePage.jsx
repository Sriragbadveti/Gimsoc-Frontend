"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Edit, Download, Calendar, MapPin, Mail, Phone, Building, Globe, User } from "lucide-react"
import Card from "./Card"

const ProfilePage = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
  }

  if (!userData) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <div className="p-8 animate-pulse">
              <div className="md:flex">
                <div className="md:shrink-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gray-300 rounded-full"></div>
                </div>
                <div className="p-8 flex-1">
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-6 animate-pulse">
              <div className="space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Not Available</h3>
            <p className="text-gray-600 mb-4">Your profile information is not available.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <div className="md:flex">
            <div className="md:shrink-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
              <div className="text-center">
                {userData.headshotUrl ? (
                  <img
                    src={userData.headshotUrl || "/placeholder.svg"}
                    alt={userData.fullName}
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-4"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mx-auto mb-4">
                    {userData.fullName
                      ? userData.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </div>
                )}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Confirmed
                </div>
              </div>
            </div>
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{userData.fullName || "Unknown User"}</h2>
                  <p className="text-lg text-gray-600 mt-1">{userData.title || "Conference Attendee"}</p>
                  <p className="text-gray-500">{userData.university || "No Affiliation"}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? "Save" : "Edit Profile"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{userData.email || "No email provided"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{userData.whatsapp || "No phone provided"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{userData.university || "No affiliation"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{userData.countryOfResidence || userData.nationality || "No location provided"}</span>
                </div>
                <div className="flex items-center text-gray-600 sm:col-span-2">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Conference: June 15-17, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Ticket Information Card */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Ticket Information</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Ticket Type</h4>
                <p className="text-gray-900 font-semibold">{userData.ticketType || "Standard Pass"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Workshop Package</h4>
                <p className="text-gray-900 font-semibold">{userData.workshopPackage || "No workshop package"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Registration Status</h4>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Registration Confirmed
                </div>
              </div>
              {userData.registrationDate && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Registration Date</h4>
                  <p className="text-gray-900 font-semibold">
                    {new Date(userData.registrationDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* QR Code and Upcoming Sessions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Conference Badge QR Code</h3>
            <div className="flex flex-col items-center">
              {userData.qrCode ? (
                <img
                  src={userData.qrCode || "/placeholder.svg"}
                  alt="Conference QR Code"
                  className="w-48 h-48 border-2 border-gray-200 rounded-lg mb-4"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-black opacity-10 rounded mb-2 mx-auto"></div>
                    <p className="text-xs text-gray-500">QR Code</p>
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-600 mb-4 text-center max-w-xs">
                Scan this QR code for check-in and workshop access. Please keep it accessible on your phone or print it.
              </p>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
                <Download className="w-4 h-4" />
                Download QR Code
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Sessions</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-900">Opening Ceremony & Keynote</h4>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">Next</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">June 15, 09:00 - 10:30</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  Grand Auditorium
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">AI in Healthcare Workshop</h4>
                <p className="text-sm text-gray-600 mb-2">June 15, 11:00 - 12:30</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  Conference Room A
                </p>
              </div>
            </div>

            <button className="mt-6 w-full text-center text-sm text-blue-600 hover:text-blue-800 py-3 hover:bg-blue-50 rounded-lg transition-colors font-medium">
              View Full Schedule →
            </button>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
            <div className="text-sm text-gray-600">Sessions Registered</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">3</div>
            <div className="text-sm text-gray-600">Workshop Tracks</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">8</div>
            <div className="text-sm text-gray-600">Networking Events</div>
          </div>
        </Card>
        <Card>
          <div className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">25</div>
            <div className="text-sm text-gray-600">Resources Available</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
