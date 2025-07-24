"use client"

import { useState, useEffect } from "react"
import {
  Upload,
  User,
  Briefcase,
  Camera,
  Utensils,
  CreditCard,
  CheckCircle,
  Shield,
  Stethoscope,
  Crown,
  Star,
} from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import CreditCardAnimation from "../Components/CreditCardAnimation"

// Success Animation Component
const SuccessAnimation = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center bg-white rounded-2xl p-8 shadow-2xl max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🎉 Payment Successful! 🎉</h2>
        <CreditCardAnimation className="mb-6" />
        <p className="text-gray-600 text-lg mb-4">Your ticket has been confirmed</p>
        <p className="text-gray-500 animate-pulse">Redirecting to success page...</p>
      </div>
    </div>
  )
}

export default function DoctorTicket() {
  const [passType, setPassType] = useState("")
  const [formData, setFormData] = useState({
    // Pass Type
    passType: "",
    // Personal Information
    fullName: "",
    email: "",
    whatsapp: "",
    dashboardPassword: "",
    // Professional Information
    medicalQualification: "",
    specialty: "",
    currentWorkplace: "",
    countryOfPractice: "",
    // Uploads
    headshot: null,
    paymentProof: null,
    // Preferences
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    // Consent
    infoAccurate: false,
    mediaConsent: false,
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
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
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

  const handlePassSelect = (type) => {
    setPassType(type)
    setFormData((prev) => ({
      ...prev,
      passType: type,
      ticketType: `Doctor-${type}`,
      workshopPackage: `Doctor-${type}`,
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
    // Only append these once, not in the loop
    form.append("ticketCategory", "Doctor")
    form.append("ticketType", `Doctor-${passType}`)
    form.append("workshopPackage", `Doctor-${passType}`)

    Object.entries(formData).forEach(([key, value]) => {
      // Skip ticketType and workshopPackage to avoid duplicates
      if (["ticketType", "workshopPackage"].includes(key)) return;
      if (value !== null && value !== undefined && value !== "") {
        if (["infoAccurate", "policies", "emailConsent", "whatsappConsent", "mediaConsent"].includes(key)) {
          const boolValue = value === true || value === "true" || value === "Yes"
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
              setShowSuccessAnimation(true)

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

  // Pass Selection Step
  if (currentStep === 1) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {showSuccessAnimation && <SuccessAnimation />}
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
                  <Stethoscope className="w-8 h-8 text-yellow-300 animate-bounce" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in gradient-text">
                  Doctor Ticket
                </h1>
                <p className="text-blue-100 text-xl mb-6 animate-fade-in-delay">Choose your pass type</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Pass */}
                <div
                  onClick={() => handlePassSelect("Basic")}
                  className="group cursor-pointer card-hover animate-fade-in"
                >
                  <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-2 border-blue-300/50 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">BASIC PASS</h3>
                    <p className="text-white mb-6">Essential conference access</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-green-300">
                        <CheckCircle className="w-4 h-4 mr-3" />
                        <span className="text-sm">All Speaker Sessions</span>
                      </div>
                      <div className="flex items-center text-green-300">
                        <CheckCircle className="w-4 h-4 mr-3" />
                        <span className="text-sm">Medical Fairs & Booths</span>
                      </div>
                      <div className="flex items-center text-green-300">
                        <CheckCircle className="w-4 h-4 mr-3" />
                        <span className="text-sm">Poster & Oral Presentations</span>
                      </div>
                      <div className="flex items-center text-red-300">
                        <span className="w-4 h-4 mr-3 text-red-400">❌</span>
                        <span className="text-sm">Workshops</span>
                      </div>
                      <div className="flex items-center text-red-300">
                        <span className="w-4 h-4 mr-3 text-red-400">❌</span>
                        <span className="text-sm">Gala Night</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                        Select Basic Pass
                      </button>
                    </div>
                  </div>
                </div>

                {/* All-Inclusive Pass */}
                <div
                  onClick={() => handlePassSelect("AllInclusive")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-300/50 rounded-2xl p-8 hover:border-purple-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 group-hover:bg-purple-200 transition-colors">
                      <Crown className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">ALL-INCLUSIVE PASS</h3>
                    <p className="text-white mb-6">Complete conference experience</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-green-300">
                        <CheckCircle className="w-4 h-4 mr-3" />
                        <span className="text-sm">Full 3-Day Conference</span>
                      </div>
                      <div className="flex items-center text-green-300">
                        <CheckCircle className="w-4 h-4 mr-3" />
                        <span className="text-sm">All Speaker Sessions</span>
                      </div>
                      <div className="flex items-center text-green-300">
                        <CheckCircle className="w-4 h-4 mr-3" />
                        <span className="text-sm">Medical Fairs & Booths</span>
                      </div>
                      <div className="flex items-center text-green-300">
                        <CheckCircle className="w-4 h-4 mr-3" />
                        <span className="text-sm">All Workshops</span>
                      </div>
                      <div className="flex items-center text-green-300">
                        <CheckCircle className="w-4 h-4 mr-3" />
                        <span className="text-sm">GALA NIGHT</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                        Select All-Inclusive
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
      {showSuccessAnimation && <SuccessAnimation />}
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
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Doctor {passType} Pass Registration</h1>
              <p className="text-blue-100 mb-4">Complete your professional registration</p>

              {/* Access Information */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 mb-4">
                <h3 className="text-white text-lg font-semibold mb-2">🎟️ Includes Access To:</h3>
                {passType === "Basic" ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="text-green-300">✅ All Speaker Sessions</div>
                    <div className="text-green-300">✅ Medical Fairs & Booths</div>
                    <div className="text-green-300">✅ Poster & Oral Presentations</div>
                    <div className="text-red-300 md:col-span-3 mt-2">❌ Does NOT include workshops or Gala Night</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-300">
                    <div>✅ Full 3-Day Conference</div>
                    <div>✅ All Speaker Sessions</div>
                    <div>✅ Medical Fairs & Booths</div>
                    <div>✅ Poster & Oral Presentations</div>
                    <div>✅ All Workshops</div>
                    <div>✅ GALA NIGHT</div>
                  </div>
                )}
              </div>
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

              <div className="grid md:grid-cols-1 gap-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="As you would like it to appear on ID & certificate"
                    required
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="For all official communication"
                    required
                  />
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
                    placeholder="For urgent updates"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Professional Information */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Professional Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Medical Qualification *</label>
                  <input
                    type="text"
                    name="medicalQualification"
                    value={formData.medicalQualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="E.g., MBBS, MD, MS, DM, MRCP"
                    required
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Specialty/Area of Practice *</label>
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="E.g., General Medicine, Dermatology, Surgery, etc."
                    required
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Current Workplace / Affiliation *</label>
                  <input
                    type="text"
                    name="currentWorkplace"
                    value={formData.currentWorkplace}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Hospital/Clinic/Institution name"
                    required
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Country of Practice *</label>
                  <input
                    type="text"
                    name="countryOfPractice"
                    value={formData.countryOfPractice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Country where you practice"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Workshop Package Selection - Only for All-Inclusive */}
            {passType === "AllInclusive" && (
              <section className="space-y-6 animate-fade-in-delay">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Workshop Package Selection</h2>
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
            )}

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
                  Upload a Recent Headshot for ID Badge *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-white/20 backdrop-blur-sm">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="headshot"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    id="headshot-upload"
                    required
                  />
                  <label htmlFor="headshot-upload" className="cursor-pointer">
                    <span className="text-blue-400 hover:text-blue-300 font-medium text-lg">Click to upload</span>
                    <span className="text-gray-300"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-300 mt-2">Image formats only</p>
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
                <h2 className="text-2xl font-semibold text-white">Food Preferences & Health Needs</h2>
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
                    <label className="block text-sm font-medium text-white mb-2">
                      Dietary Restrictions or Allergies
                    </label>
                    <textarea
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      placeholder="Optional - Short answer"
                      rows="3"
                    />
                  </div>

                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-medium text-white mb-2">
                      Accessibility Needs or Medical Conditions
                    </label>
                    <textarea
                      name="accessibilityNeeds"
                      value={formData.accessibilityNeeds}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      placeholder="Optional - Short answer"
                      rows="3"
                    />
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
                  <label className="block text-sm font-medium text-white mb-3">Choose Your Payment Method *</label>
                  <div className="space-y-3">
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
                  </div>
                </div>

                {formData.paymentMethod === "Bank Transfer" && (
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-medium text-white mb-2">Upload Payment Proof *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors bg-white/20 backdrop-blur-sm">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        onChange={handleFileChange}
                        name="paymentProof"
                                                  accept=".jpg,.jpeg,.png"
                        className="hidden"
                        id="payment-upload"
                        required
                      />
                      <label htmlFor="payment-upload" className="cursor-pointer">
                        <span className="text-green-400 hover:text-green-300 font-medium">Click to upload</span>
                        <span className="text-gray-300"> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-300 mt-1">PDF only</p>
                      {formData.paymentProof && (
                        <p className="text-sm text-green-400 mt-2">✓ File selected: {formData.paymentProof.name}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Declaration & Consent */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Declaration & Consent</h2>
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
                      I confirm that all the information provided above is true and correct to the best of my knowledge.
                    </span>
                  </label>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="mediaConsent"
                      checked={formData.mediaConsent}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                      required
                    />
                    <span className="text-white">
                      I consent to the use of photos or videos taken of me during the event for promotional purposes.
                    </span>
                  </label>
                </div>

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
                      I agree to abide by all rules, guidelines, and policies set by the conference organizing team.
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
                      I consent to be added to our WhatsApp group for updates, discussions, and announcements related to
                      MEDCON.
                    </span>
                  </label>
                </div>
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
