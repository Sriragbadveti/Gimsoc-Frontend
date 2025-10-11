"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Edit, Calendar, MapPin, Mail, Phone, Building, Globe, User, Sparkles, Utensils, Wine, Music } from "lucide-react"
import Card from "./Card"

const ProfilePage = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get email from the userData passed from login
        const userEmail = userData?.email
        
        if (!userEmail) {
          console.error("❌ No user email found in userData")
          setLoading(false)
          return
        }

        console.log("🔍 Fetching profile for email:", userEmail)
        
        const response = await axios.get(`https://gimsoc-backend.onrender.com/api/dashboard/profile?email=${userEmail}`, {
          withCredentials: true,
        })
        
        console.log("✅ Profile data fetched:", response.data)
        setUserProfile(response.data.user)
      } catch (error) {
        console.error("❌ Error fetching user profile:", error)
        // Fallback to basic userData if API fails
        setUserProfile(userData)
      } finally {
        setLoading(false)
      }
    }

    if (userData) {
      fetchUserProfile()
    } else {
      setLoading(false)
    }
  }, [userData])

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
  }

  if (loading) {
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

  if (!userProfile) {
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

  // Check if user has Gala Dinner access
  const hasGalaDinnerAccess = 
    userProfile?.ticketType === "Gala Add-On" || 
    userProfile?.galaDinner === "Yes, I would like to attend the Gala Dinner (+40 GEL)" ||
    userProfile?.galaDinner === "Yes"

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <div className="md:flex">
            <div className="md:shrink-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
              <div className="text-center">
                {userProfile.headshotUrl ? (
                  <img
                    src={userProfile.headshotUrl || "/placeholder.svg"}
                    alt={userProfile.fullName}
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-4"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mx-auto mb-4">
                    {userProfile.fullName
                      ? userProfile.fullName
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
                  <h2 className="text-3xl font-bold text-gray-900">{userProfile.fullName || "Unknown User"}</h2>
                  <p className="text-lg text-gray-600 mt-1">{userProfile.medicalQualification || "Conference Attendee"}</p>
                  <p className="text-gray-500">{userProfile.universityName || "No Affiliation"}</p>
                </div>
               
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{userProfile.email || "No email provided"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{userProfile.whatsapp || "No phone provided"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{userProfile.universityName || "No affiliation"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{userProfile.countryOfResidence || userProfile.nationality || "No location provided"}</span>
                </div>
                <div className="flex items-center text-gray-600 sm:col-span-2">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                  <span>Conference: October 24th , 25th, 2025</span>
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
                <p className="text-gray-900 font-semibold">{userProfile.ticketType || "Standard Pass"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Ticket Category</h4>
                <p className="text-gray-900 font-semibold">{userProfile.ticketCategory || "Individual"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Sub Type</h4>
                <p className="text-gray-900 font-semibold">{userProfile.subType || "Regular"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Registration Status</h4>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Registration Confirmed
                </div>
              </div>
              {userProfile.createdAt && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Registration Date</h4>
                  <p className="text-gray-900 font-semibold">
                    {new Date(userProfile.createdAt).toLocaleDateString("en-US", {
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

      {/* Gala Dinner Access Card - Only show if user has access */}
      {hasGalaDinnerAccess && (
        <Card className="overflow-hidden">
          <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-200/30 to-amber-200/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Header with sparkle icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                    <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Gala Dinner Access</h3>
                    <p className="text-sm text-gray-600">You're invited to our exclusive evening event</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
                    ✨ VIP Access
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Date & Time</p>
                      <p className="text-sm font-semibold text-gray-900">October 26th, 2025</p>
                      <p className="text-xs text-gray-600">7:00 PM - 11:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Venue</p>
                      <p className="text-sm font-semibold text-gray-900">Hotels & Preferences</p>
                      <p className="text-xs text-gray-600">Hualing Tbilisi</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Utensils className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Dress Code</p>
                      <p className="text-sm font-semibold text-gray-900">Formal Attire</p>
                      <p className="text-xs text-gray-600">Business / Evening Wear</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Wine className="w-5 h-5 text-amber-600" />
                  What to Expect
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Gourmet Dining</p>
                      
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Live Entertainment</p>
                      <p className="text-xs text-gray-600">Music and performances throughout the evening</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Networking</p>
                      <p className="text-xs text-gray-600">Connect with speakers and attendees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Special Recognition</p>
                      <p className="text-xs text-gray-600">Awards ceremony and acknowledgments</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Food Preference Note */}
              {userProfile.foodPreference && (
                <div className="mt-6 bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-500 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-amber-700" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900">Your Food Preference</p>
                      <p className="text-sm text-amber-700">{userProfile.foodPreference}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Note */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <Music className="w-4 h-4 text-amber-600" />
                  We look forward to seeing you at this special evening!
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      
    </div>
  )
}

export default ProfilePage
