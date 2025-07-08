"use client"

import { useState, useEffect } from "react"
import {
  Upload,
  User,
  GraduationCap,
  Camera,
  Utensils,
  CreditCard,
  Star,
  Shield,
  Globe,
  Phone,
  Calendar,
  Users,
} from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Balloon Animation Component
const BalloonAnimation = ({ onComplete }) => {
  const balloons = [
    { id: 1, color: "bg-red-500", delay: 0, x: "10%", size: "w-10 h-12" },
    { id: 2, color: "bg-blue-500", delay: 0.1, x: "20%", size: "w-8 h-10" },
    { id: 3, color: "bg-green-500", delay: 0.2, x: "30%", size: "w-12 h-14" },
    { id: 4, color: "bg-yellow-500", delay: 0.3, x: "40%", size: "w-9 h-11" },
    { id: 5, color: "bg-purple-500", delay: 0.4, x: "50%", size: "w-11 h-13" },
    { id: 6, color: "bg-pink-500", delay: 0.5, x: "60%", size: "w-8 h-10" },
    { id: 7, color: "bg-indigo-500", delay: 0.6, x: "70%", size: "w-10 h-12" },
    { id: 8, color: "bg-orange-500", delay: 0.7, x: "80%", size: "w-9 h-11" },
    { id: 9, color: "bg-teal-500", delay: 0.8, x: "90%", size: "w-12 h-14" },
    { id: 10, color: "bg-rose-500", delay: 0.9, x: "95%", size: "w-8 h-10" },
  ]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-8 animate-bounce">
          🎉 Registration Submitted Successfully! 🎉
        </h2>
        <div className="relative h-96 w-full overflow-hidden">
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              className={`absolute ${balloon.color} ${balloon.size} rounded-full balloon-float-fast`}
              style={{
                left: balloon.x,
                bottom: "-40px",
                animationDelay: `${balloon.delay}s`,
              }}
            >
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-400"></div>
            </div>
          ))}
        </div>
        <p className="text-white text-xl mt-8 animate-pulse">Redirecting to success page...</p>
      </div>
    </div>
  )
}

export default function InternationalTicket() {
  const [packageType, setPackageType] = useState("")
  const [formData, setFormData] = useState({
    // Package Type
    packageType: "",
    // Personal Information
    fullName: "",
    email: "",
    whatsapp: "",
    nationality: "",
    countryOfResidence: "",
    passportNumber: "",
    needsVisaSupport: "",
    // Friends Information (7-day only)
    friend1Name: "",
    friend2Name: "",
    // Academic Information
    universityName: "",
    semester: "",
    enrollmentProof: null,
    // Uploads
    headshot: null,
    paymentProof: null,
    // Preferences
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    // Emergency Contact
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    // Consent
    infoAccurate: false,
    mediaConsent: "",
    policies: false,
    emailConsent: false,
    whatsappConsent: false,
    // Payment
    paymentMethod: "",
    // Additional fields for backend compatibility
    ticketType: "",
    workshopPackage: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [fadeIn, setFadeIn] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)
  const [errorBooking, setErrorBooking] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setFadeIn(true)
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }))
  }

  const handlePackageSelect = (type) => {
    setPackageType(type)
    setFormData((prev) => ({
      ...prev,
      packageType: type,
      ticketType: `International-${type}`,
      workshopPackage: `International-${type}`,
    }))
    setCurrentStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.email || !formData.fullName) {
      alert("Please fill in all required fields (Email and Full Name)")
      setIsSubmitting(false)
      return
    }

    const form = new FormData()
    form.append("ticketCategory", "International")
    form.append("ticketType", `International-${packageType}`)

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        if (["infoAccurate", "policies", "emailConsent", "whatsappConsent"].includes(key)) {
          const boolValue = value === true || value === "true" || value === "Yes"
          form.append(key, boolValue.toString())
        } else if (["mediaConsent"].includes(key)) {
          const boolValue = value === "Yes"
          form.append(key, boolValue.toString())
        }
        // File fields
        else if (key === "headshot" || key === "paymentProof" || key === "enrollmentProof") {
          if (typeof value === "string" && value.startsWith("http")) {
            // Direct Cloudinary URL
            form.append(key + "Url", value)
            console.log(`🌐 Cloudinary URL field ${key + "Url"}: ${value}`)
          } else if (value instanceof File) {
            // Legacy/manual file upload
          form.append(key, value)
            console.log(`📁 File field ${key}: ${value.name}`)
          }
        }
        else {
          form.append(key, value)
        }
      }
    })

    try {
      const response = await axios.post("https://gimsoc-backend.onrender.com/api/form/submit", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        timeout: 30000,
      })

      console.log("✅ Submitted successfully:", response.data)
      setShowBalloons(true)

      setTimeout(() => {
        navigate("/ticket-success")
      }, 3500)
    } catch (err) {
      setErrorBooking(true)
      console.error("❌ Submission failed:", err)
      if (err.code === "ECONNABORTED") {
        alert("Request timed out. Please try again later.")
      } else if (err.response) {
        alert(`Form submission failed: ${err.response.data?.message || err.message}`)
      } else if (err.request) {
        alert("Network error: Unable to reach the server.")
      } else {
        alert(`Error: ${err.message}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const semesters = Array.from({ length: 12 }, (_, i) => `${i + 1}`).concat(["Graduated"])

  // Package Selection Step
  if (currentStep === 1) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {showBalloons && <BalloonAnimation />}
        {isSubmitting && (
          <div className="fixed top-0 left-0 w-full z-50">
            <div className="h-2 w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 animate-loading-bar"></div>
            <div className="w-full text-center py-2 bg-black/80 text-white font-bold text-lg shadow-lg">
              Booking your ticket
            </div>
            <style>{`
              @keyframes loading-bar {
                0% { background-position: 0% 50%; }
                100% { background-position: 100% 50%; }
              }
              .animate-loading-bar {
                background-size: 200% 100%;
                animation: loading-bar 1.5s linear infinite;
              }
            `}</style>
          </div>
        )}

        {/* Floating particles background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass rounded-3xl shadow-2xl overflow-hidden animate-bounce-in">
            {/* Animated Header */}
            <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-8 py-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 animate-pulse"></div>
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  <Globe className="w-8 h-8 text-yellow-300 animate-bounce" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in gradient-text">
                  International Package
                </h1>
                <p className="text-blue-100 text-xl mb-6 animate-fade-in-delay">Choose your package duration</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* 3 Days Package */}
                <div
                  onClick={() => handlePackageSelect("3Days")}
                  className="group cursor-pointer card-hover animate-fade-in"
                >
                  <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-2 border-blue-300/50 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                      <Calendar className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">3 Days Package</h3>
                    <p className="text-white mb-6">Perfect for conference attendance</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-green-300">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        Conference Access
                      </div>
                      <div className="flex items-center text-green-300">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        Workshop Selection
                      </div>
                      <div className="flex items-center text-green-300">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        Student ID Required
                      </div>
                    </div>

                    <div className="text-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                        Select 3 Days
                      </button>
                    </div>
                  </div>
                </div>

                {/* 7 Days Package */}
                <div
                  onClick={() => handlePackageSelect("7Days")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-300/50 rounded-2xl p-8 hover:border-purple-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 group-hover:bg-purple-200 transition-colors">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">7 Days Package</h3>
                    <p className="text-white mb-6">Extended experience with accommodation</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-green-300">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        Full Conference + Stay
                      </div>
                      <div className="flex items-center text-green-300">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        Friend Accommodation
                      </div>
                      <div className="flex items-center text-green-300">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        Extended Workshops
                      </div>
                    </div>

                    <div className="text-center">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                        Select 7 Days
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Form Step
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {showBalloons && <BalloonAnimation />}
      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-2 w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 animate-loading-bar"></div>
          <div className="w-full text-center py-2 bg-black/80 text-white font-bold text-lg shadow-lg">
            Booking your ticket
          </div>
          <style>{`
            @keyframes loading-bar {
              0% { background-position: 0% 50%; }
              100% { background-position: 100% 50%; }
            }
            .animate-loading-bar {
              background-size: 200% 100%;
              animation: loading-bar 1.5s linear infinite;
            }
          `}</style>
        </div>
      )}

      {errorBooking && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="w-full text-center py-2 bg-red-600 text-white font-bold text-lg shadow-lg animate-fade-in">
            Error booking the ticket
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-8 py-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 animate-pulse"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                International {packageType} Package Registration
              </h1>
              <p className="text-blue-100 mb-4">Complete your international registration</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Information */}
            <section className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Personal Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Enter your full legal name as it appears on your passport"
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">For ID card and certificate</p>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Enter a valid email address"
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">For all official conference communication</p>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">
                    WhatsApp Number (with country code) *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="+1 XXX XXX XXXX"
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">Used for urgent updates and conference reminders</p>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Nationality *</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Select your nationality (as in your passport)"
                    required
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Country of Residence *</label>
                  <input
                    type="text"
                    name="countryOfResidence"
                    value={formData.countryOfResidence}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Where are you currently living or studying?"
                    required
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Passport Number *</label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Required for international ID verification"
                    required
                  />
                </div>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <label className="block text-sm font-medium text-white mb-3">
                  Do you need a visa support/invitation letter? *
                </label>
                <div className="space-y-3">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="needsVisaSupport"
                        value={option}
                        checked={formData.needsVisaSupport === option}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <span className="text-white">{option}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-300 mt-1">If yes, we will contact you for additional information</p>
              </div>

              {/* Friends Section - Only for 7 Days */}
              {packageType === "7Days" && (
                <div className="bg-blue-50/10 border border-blue-200/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Are you coming with a friend or two?</h3>
                  <p className="text-gray-300 mb-4">
                    If yes, please list their full names below so we can try to accommodate you together for the stay
                    and workshop sessions.
                  </p>

                  <div className="space-y-4">
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <label className="block text-sm font-medium text-white mb-2">Friend 1 Name</label>
                      <input
                        type="text"
                        name="friend1Name"
                        value={formData.friend1Name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                        placeholder="Enter friend's full name (optional)"
                      />
                    </div>

                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <label className="block text-sm font-medium text-white mb-2">Friend 2 Name (optional)</label>
                      <input
                        type="text"
                        name="friend2Name"
                        value={formData.friend2Name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                        placeholder="Enter second friend's full name (optional)"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Academic Information */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Academic Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">University Name *</label>
                  <input
                    type="text"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Enter the full name of your university or medical school"
                    required
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Current Year/Semester of Study *</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    required
                  >
                    <option value="">Select your current academic year or semester</option>
                    {semesters.map((sem, index) => (
                      <option key={index} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <label className="block text-sm font-medium text-white mb-2">
                  Upload a Valid Student ID or Enrollment Proof *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors bg-white/20 backdrop-blur-sm">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="enrollmentProof"
                    accept="image/*,.pdf"
                    className="hidden"
                    id="enrollment-upload"
                    required
                  />
                  <label htmlFor="enrollment-upload" className="cursor-pointer">
                    <span className="text-green-400 hover:text-green-300 font-medium text-lg">Click to upload</span>
                    <span className="text-gray-300"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-300 mt-2">Required for student registration validation</p>
                  {formData.enrollmentProof && (
                    <p className="text-sm text-green-400 mt-2">✓ File selected: {formData.enrollmentProof.name}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Workshop Selection */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Workshop Selection</h2>
              </div>

              <div className="bg-yellow-50/10 border border-yellow-200/30 rounded-xl p-6">
                <div className="text-center">
                  <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Workshop Selection Coming Soon!</h3>
                  <p className="text-gray-300 mb-4">Workshop selection will be available soon.</p>
                  <div className="bg-yellow-100/20 rounded-lg p-4">
                    <p className="text-sm text-yellow-300">
                      <strong>Note:</strong> Workshop spots are limited and will be confirmed based on availability.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Identification */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Identification</h2>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <label className="block text-sm font-medium text-white mb-2">
                  Upload a Headshot for Conference ID Card *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-white/20 backdrop-blur-sm">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="headshot"
                    accept="image/*"
                    className="hidden"
                    id="headshot-upload"
                    required
                  />
                  <label htmlFor="headshot-upload" className="cursor-pointer">
                    <span className="text-blue-400 hover:text-blue-300 font-medium text-lg">Click to upload</span>
                    <span className="text-gray-300"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-300 mt-2">
                    A clear, front-facing photo (passport-style) with a plain background
                  </p>
                  {formData.headshot && (
                    <p className="text-sm text-green-400 mt-2">✓ File selected: {formData.headshot.name}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Food Preferences */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Utensils className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Food Preferences and Health Needs</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-3">Preferred Food Option *</label>
                  <div className="space-y-3">
                    {["Vegetarian", "Vegan", "Non-Vegetarian", "Non-Vegetarian (Halal)"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white/50 cursor-pointer transition-all bg-white/20 backdrop-blur-sm"
                      >
                        <input
                          type="radio"
                          name="foodPreference"
                          value={option}
                          checked={formData.foodPreference === option}
                          onChange={handleInputChange}
                          className="text-green-600 focus:ring-green-500"
                          required
                        />
                        <span className="text-white font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-medium text-white mb-2">Dietary Restrictions</label>
                    <textarea
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      placeholder="e.g., gluten-free, halal, nut allergies"
                      rows="3"
                    />
                  </div>

                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-medium text-white mb-2">Accessibility or Health Needs</label>
                    <textarea
                      name="accessibilityNeeds"
                      value={formData.accessibilityNeeds}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      placeholder="Any accessibility or health needs we should be aware of"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Emergency Contact */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Emergency Contact</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">
                    Emergency Contact Name and Relationship *
                  </label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="e.g., John Doe (Father)"
                    required
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">
                    Emergency Contact Phone Number (with country code) *
                  </label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="+1 XXX XXX XXXX"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Declarations */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Declarations</h2>
              </div>

              <div className="space-y-4">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="infoAccurate"
                      checked={formData.infoAccurate}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                      required
                    />
                    <span className="text-white">
                      I confirm that all the information provided is accurate to the best of my knowledge.
                    </span>
                  </label>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-3">Media Consent *</label>
                  <div className="space-y-3">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="mediaConsent"
                          value={option}
                          checked={formData.mediaConsent === option}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className="text-white">
                          Do you consent to the use of photos/videos taken of you during the event for promotional
                          purposes? {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="policies"
                        checked={formData.policies}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500 rounded"
                        required
                      />
                      <span className="text-white">
                        I agree to comply with all conference policies, rules, and guidelines.
                      </span>
                    </label>
                  </div>

                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailConsent"
                        checked={formData.emailConsent}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span className="text-white">
                        I agree to receive emails from GIMSOC, including updates, resources, and conference-related
                        information.
                      </span>
                    </label>
                  </div>

                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="whatsappConsent"
                        checked={formData.whatsappConsent}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span className="text-white">
                        I consent to be added to our WhatsApp group for updates, discussions, and announcements related
                        to MEDCON.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Confirmation */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Payment Confirmation</h2>
              </div>

              <div className="space-y-4">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-3">
                    How will you be making the payment? *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white/50 cursor-pointer transition-all bg-white/20 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Credit/Debit Card"
                        checked={formData.paymentMethod === "Credit/Debit Card"}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500"
                        required
                      />
                      <span className="text-white font-medium">Credit/Debit Card</span>
                    </label>

                    <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white/50 cursor-pointer transition-all bg-white/20 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Bank Transfer"
                        checked={formData.paymentMethod === "Bank Transfer"}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500"
                        required
                      />
                      <span className="text-white font-medium">Bank Transfer</span>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === "Bank Transfer" && (
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-medium text-white mb-2">Upload Proof of Payment *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors bg-white/20 backdrop-blur-sm">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        onChange={handleFileChange}
                        name="paymentProof"
                        accept=".pdf"
                        className="hidden"
                        id="payment-upload"
                        required
                      />
                      <label htmlFor="payment-upload" className="cursor-pointer">
                        <span className="text-green-400 hover:text-green-300 font-medium">Click to upload</span>
                        <span className="text-gray-300"> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-300 mt-1">Screenshot or document of your payment (PDF only)</p>
                      {formData.paymentProof && (
                        <p className="text-sm text-green-400 mt-2">✓ File selected: {formData.paymentProof.name}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-button-pulse"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
