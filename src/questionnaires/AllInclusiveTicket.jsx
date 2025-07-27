"use client"

import { useState, useEffect } from "react"
import {
  Upload,
  User,
  GraduationCap,
  Camera,
  Utensils,
  CreditCard,
  CheckCircle,
  Users,
  Star,
  Crown,
  Shield,
  Award,
  Sparkles,
} from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { StatefulButton } from "../Components/StatefulButton"

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
        <h2 className="text-4xl font-bold text-white mb-8 animate-bounce">🎉 Ticket Submitted Successfully! 🎉</h2>
        {/* Balloons */}
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
              {/* Balloon string */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-400"></div>
            </div>
          ))}
        </div>
        <p className="text-white text-xl mt-8 animate-pulse">Redirecting to success page...</p>
      </div>
    </div>
  )
}

// Add custom CSS for balloon animations
const balloonStyles = `
  @keyframes float-up {
    0% {
      transform: translateY(100vh) scale(0.5);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) scale(1);
      opacity: 0;
    }
  }
  @keyframes balloon-bounce {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  .balloon-float {
    animation: float-up 4s ease-out forwards;
  }
  .balloon-bounce {
    animation: balloon-bounce 2s ease-in-out infinite;
  }
`

// Inject styles
if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = balloonStyles
  document.head.appendChild(style)
}

export default function AllInclusiveTicket() {
  const [memberType, setMemberType] = useState("")
  const [formData, setFormData] = useState({
    // Member Type
    memberType: "",
    // Personal Information
    fullName: "",
    email: "",
    whatsapp: "",
    dashboardPassword: "",
    // Academic Information
    universityName: "",
    semester: "",
    examPrep: "",
    examOther: "",
    // TSU/GEOMEDI Specific
    tsuEmail: "",
    geomediEmail: "",
    enrollmentProof: null,
    // GIMSOC Specific
    gimsocMembershipCode: "",
    gimsocPosition: "",
    // Uploads
    headshot: null,
    paymentProof: null,
    // Preferences
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    // Gala Dinner
    galaDinner: "",
    // Consent
    discountConfirmation: false,
    infoAccurate: false,
    mediaConsent: "",
    policies: false,
    emailConsent: false,
    whatsappConsent: false,
    // Payment
    paymentMethod: "",
    // Additional fields for backend compatibility
    workshopPackage: "Standard+2",
    medicalQualification: "",
    specialty: "",
    currentWorkplace: "",
    countryOfPractice: "",
    isTsuStudent: false,
    isGeomediStudent: false,
    nationality: "",
    countryOfResidence: "",
    passportNumber: "",
    needsVisaSupport: "",
    yearOfStudy: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [fadeIn, setFadeIn] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)
  const [errorBooking, setErrorBooking] = useState(false)
  const navigate = useNavigate()
  const [soldOut, setSoldOut] = useState(false)
  const [emailUsed, setEmailUsed] = useState(false)

  // Remove useEffect that checks for id_token/cookies and redirects to /login.

 

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

  const handleMemberTypeSelect = (type) => {
    // Map frontend types to backend subType values
    const typeMapping = {
      gimsoc: "GIMSOC",
      "non-gimsoc": "Non-GIMSOC",
      tsu: "TSU",
      exec: "Executive", // Executive & Subcommittee maps to Executive
      geomedi: "GEOMEDI", // GEOMEDI maps to GEOMEDI
    }

    const mappedType = typeMapping[type] || type
    setMemberType(mappedType)
    setFormData((prev) => ({
      ...prev,
      memberType: mappedType,
      isTsuStudent: mappedType === "TSU",
      isGeomediStudent: mappedType === "GEOMEDI",
    }))
    setCurrentStep(2)
  }

  // Calculate pricing based on member type
  const calculatePrice = () => {
    let basePrice = 0
    switch (memberType) {
      case "GIMSOC":
        basePrice = 65 // 75 - 10 discount
        break
      case "TSU":
        basePrice = 45 // 75 - 30 discount
        break
      case "GEOMEDI":
        basePrice = 50 // 75 - 25 discount
        break
      case "Executive":
        basePrice = 65 // 75 - 10 discount (same as GIMSOC)
        break
      case "Non-GIMSOC":
        basePrice = 75 // Regular price
        break
      default:
        basePrice = 75
    }

    const galaPrice = formData.galaDinner && formData.galaDinner.includes("Yes") ? 40 : 0
    return basePrice + galaPrice
  }

  const getMemberTypeDisplay = () => {
    switch (memberType) {
      case "GIMSOC":
        return "GIMSOC Member"
      case "Non-GIMSOC":
        return "Non-GIMSOC Member"
      case "TSU":
        return "TSU Student"
      case "GEOMEDI":
        return "GEOMEDI Student"
      case "Executive":
        return "Executive & Subcommittee"
      default:
        return ""
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    
    // Prevent double submission
    if (isSubmitting) {
      console.log("⚠️ Submission already in progress, ignoring duplicate click")
      return
    }
    
    setIsSubmitting(true)
    setSoldOut(false)
    setEmailUsed(false)

    // Validate required fields
    if (!formData.email || !formData.fullName || !formData.dashboardPassword) {
      alert("Please fill in all required fields (Email, Full Name, and Dashboard Password)")
      setIsSubmitting(false)
      return
    }

    const form = new FormData()

    // Set ticket classification - map to backend schema
    form.append("ticketCategory", "Standard")
    form.append("subType", memberType)
    form.append("ticketType", "Standard+2")

    // Convert form data according to schema
    console.log("🔍 Form data being processed:", formData)

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        console.log(`📝 Adding field: ${key} = ${value} (type: ${typeof value})`)

        // Boolean conversions
        if (
          [
            "infoAccurate",
            "policies",
            "emailConsent",
            "whatsappConsent",
            "discountConfirmation",
            "isTsuStudent",
            "isGeomediStudent",
          ].includes(key)
        ) {
          const boolValue = value === true || value === "true" || value === "Yes"
          form.append(key, boolValue.toString())
          console.log(`✅ Boolean field ${key}: ${boolValue}`)
        } else if (["mediaConsent"].includes(key)) {
          const boolValue = value === "Yes"
          form.append(key, boolValue.toString())
          console.log(`✅ Media consent ${key}: ${boolValue}`)
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
        // Regular fields
        else {
          form.append(key, value)
          console.log(`📄 Regular field ${key}: ${value}`)
        }
      }
    })

    // Add required fields that might be empty but are expected by backend
    form.append("isGimsocMember", (memberType === "GIMSOC").toString())

    // Add membership code for GIMSOC members
    if (memberType === "GIMSOC" && formData.gimsocMembershipCode) {
      form.append("membershipCode", formData.gimsocMembershipCode)
    }

    try {
      console.log("📤 Submitting form with data:", {
        ticketCategory: "Standard",
        subType: memberType,
        ticketType: "Standard+2",
        email: formData.email,
        fullName: formData.fullName,
        workshopPackage: formData.workshopPackage,
        isGimsocMember: memberType === "GIMSOC",
      })

      // Log all form data entries
      console.log("📋 FormData entries:")
      for (const [key, value] of form.entries()) {
        console.log(`${key}: ${value}`)
      }

      // Test backend connectivity
      console.log("🔍 Testing backend connectivity...")
      const response = await axios.post("https://gimsoc-backend.onrender.com/api/form/submit", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        timeout: 30000, // 30 second timeout
      })

      console.log("✅ Submitted successfully:", response.data)
      
      // Only show success animations and navigate on successful submission
      // Check if the response indicates a successful submission
      if (response.data.message === "Ticket submitted successfully") {
        setShowBalloons(true)
        
        // Navigate to success page after 3.5 seconds
        setTimeout(() => {
          navigate("/ticket-success")
        }, 3500)
      } else {
        // If there's an unexpected response, treat it as an error
        throw new Error("Unexpected response from server")
      }
    } catch (err) {
      setErrorBooking(true)
      if (err.response?.status === 409 && (
        err.response?.data?.message?.includes("sold out") ||
        err.response?.data?.message?.includes("Executive & Subcommittee tickets are sold out") ||
        err.response?.data?.message?.includes("TSU student tickets are sold out") ||
        err.response?.data?.message?.includes("GEOMEDI student tickets for Standard+2 are sold out")
      )) {
        setSoldOut(true)
      } else if (err.response?.status === 409 && err.response?.data?.message?.includes("already been used")) {
        setEmailUsed(true)
      }
      console.error("❌ Submission failed:", err.response?.data || err.message)
      console.error("❌ Full error response:", err.response)
      console.error("❌ Error status:", err.response?.status)
      console.error("❌ Error data:", err.response?.data)
      console.error("❌ Network error:", err.message)
      console.error("❌ Request config:", err.config)

      if (err.code === "ECONNABORTED") {
        alert("Request timed out. The server is not responding. Please try again later.")
      } else if (err.response) {
        // Server responded with error
        alert(`Form submission failed: ${err.response.data?.message || err.message}`)
      } else if (err.request) {
        // Network error
        alert("Network error: Unable to reach the server. Please check your connection.")
      } else {
        // Other error
        alert(`Error: ${err.message}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const universities = [
    "Tbilisi State Medical University (TSMU)",
    "David Tvildiani Medical University (DTMU)",
    "University of Georgia (UG)",
    "Caucasus International University (CIU)",
    "Georgian American University (GAU)",
    "East European University (EEU)",
    "New Vision University (NVU)",
    "Petre Shotadze Tbilisi Medical Academy (TMA)",
    "European University (EU)",
    "Alte University",
    "Ivane Javakhishvili Tbilisi State University (TSU – Faculty of Medicine)",
    "Gruni (David Agmashenebeli University of Georgia)",
    "Ken Walker International University (KWIU)",
    "University Geomedi",
    "Ilia State University (ISU)",
    "Akaki Tsereteli State University (ATSU – Faculty of Medicine)",
    "BAU International University, Batumi (BAU)",
    "Batumi Shota Rustaveli State University (BSU – Faculty of Medicine)",
    "Other",
  ]

  const semesters = Array.from({ length: 12 }, (_, i) => `${i + 1}`).concat(["Graduated"])
  const exams = ["USMLE", "AMC", "PLAB", "FMGE", "EMREE", "IFOM"]

  // Member Type Selection Step
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

        {/* Floating particles background - reduced for performance */}
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
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in gradient-text">
                  Standard+2 Ticket
                </h1>
                <p className="text-blue-100 text-xl mb-6 animate-fade-in-delay">
                  Choose your membership type to continue
                </p>
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 animate-glow">
                  <span className="text-white text-lg font-medium">Base Price: </span>
                  <span className="text-white text-3xl font-bold">75 GEL</span>
                  <div className="text-blue-100 text-sm mt-2">+ Workshop Selection (2 workshops)</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* GIMSOC Member */}
                <div
                  onClick={() => handleMemberTypeSelect("gimsoc")}
                  className="group cursor-pointer card-hover animate-fade-in"
                >
                  <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-2 border-blue-300/50 rounded-2xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">GIMSOC Member</h3>
                    <p className="text-white mb-4">Active GIMSOC membership required</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-green-400">65 GEL</span>
                      <div className="text-sm text-gray-400">10 GEL discount</div>
                    </div>
                  </div>
                </div>

                {/* Non-GIMSOC Member */}
                <div
                  onClick={() => handleMemberTypeSelect("non-gimsoc")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="bg-gradient-to-br from-gray-600/20 to-slate-600/20 border-2 border-gray-300/50 rounded-2xl p-6 hover:border-gray-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 group-hover:bg-gray-200 transition-colors">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Non-GIMSOC Member</h3>
                    <p className="text-white mb-4">Standard registration</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-gray-400">75 GEL</span>
                      <div className="text-sm text-gray-400">Regular price</div>
                    </div>
                  </div>
                </div>

                {/* TSU Student */}
                <div
                  onClick={() => handleMemberTypeSelect("tsu")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-300/50 rounded-2xl p-6 hover:border-green-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                      <GraduationCap className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">TSU Student</h3>
                    <p className="text-white mb-4">TSU Faculty of Medicine</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-green-400">45 GEL</span>
                      <div className="text-sm text-gray-400">30 GEL discount</div>
                    </div>
                  </div>
                </div>

                {/* Executive & Subcommittee */}
                <div
                  onClick={() => handleMemberTypeSelect("exec")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 border-2 border-purple-300/50 rounded-2xl p-6 hover:border-purple-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                      <Crown className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Executive & Subcommittee</h3>
                    <p className="text-white mb-4">GIMSOC leadership team</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-purple-400">50 GEL</span>
                      <div className="text-sm text-gray-400">25 GEL discount</div>
                    </div>
                  </div>
                </div>

                {/* GEOMEDI Student */}
                <div
                  onClick={() => handleMemberTypeSelect("geomedi")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="bg-gradient-to-br from-orange-600/20 to-amber-600/20 border-2 border-orange-300/50 rounded-2xl p-6 hover:border-orange-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors">
                      <Award className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">GEOMEDI Student</h3>
                    <p className="text-white mb-4">GEOMEDI Faculty of Medicine</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-orange-400">50 GEL</span>
                      <div className="text-sm text-gray-400">25 GEL discount</div>
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
      {soldOut && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="w-full text-center py-4 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700 text-white font-extrabold text-2xl shadow-2xl animate-fade-in rounded-b-2xl border-b-4 border-yellow-300">
            🎟️ Tickets for this category are <span className="text-yellow-300">SOLD OUT</span>!<br />
            <span className="text-lg font-medium">Thank you for your interest. Please check other ticket options or follow us for updates.</span>
          </div>
        </div>
      )}
      {emailUsed && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="w-full text-center py-4 bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 text-white font-extrabold text-xl shadow-2xl animate-fade-in rounded-b-2xl border-b-4 border-pink-300">
            🚫 This email has already been used to book a ticket.<br />
            <span className="text-lg font-medium">Each attendee can only book one ticket per email.</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-8 py-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 animate-pulse"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{getMemberTypeDisplay()} Registration</h1>
              <p className="text-blue-100 mb-4">Standard+2 Ticket - Complete your registration</p>

              {/* Dynamic Price Display */}
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <span className="text-white text-lg font-medium">Total Price: </span>
                <span className="text-white text-3xl font-bold">{calculatePrice()} GEL</span>
                {formData.galaDinner === "Yes, I would like to attend the Gala Dinner (+40 GEL)" && (
                  <div className="text-yellow-300 text-sm mt-1">✓ Gala Dinner Included (+40 GEL)</div>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Eligibility Check for TSU and GEOMEDI */}
            {(memberType === "TSU" || memberType === "GEOMEDI") && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Eligibility Confirmation</h2>
                </div>

                <div className="bg-yellow-50/10 border border-yellow-200/30 rounded-xl p-6">
                  <p className="text-white mb-4">
                    Are you a currently enrolled student at{" "}
                    {memberType === "TSU"
                      ? "Ivane Javakhishvili Tbilisi State University – Faculty of Medicine"
                      : "GEOMEDI – Faculty of Medicine"}
                    ?
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="eligibilityConfirmation"
                        value="Yes"
                        className="text-yellow-600 focus:ring-yellow-500"
                        required
                      />
                      <span className="text-white">Yes</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="eligibilityConfirmation"
                        value="No"
                        className="text-yellow-600 focus:ring-yellow-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            alert(
                              `This registration form is only for ${memberType} students eligible for the discounted ticket. Please return to the main registration page.`,
                            )
                            setCurrentStep(1)
                          }
                        }}
                      />
                      <span className="text-white">No</span>
                    </label>
                  </div>
                </div>
              </section>
            )}

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
                    placeholder="Please enter your full legal name"
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">
                    As you would like it to appear on your ID card and certificate
                  </p>
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
                  <label className="block text-sm font-medium text-white mb-2">Password for Dashboard *</label>
                  <input
                    type="password"
                    name="dashboardPassword"
                    value={formData.dashboardPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Create a password for dashboard access"
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">You'll use this password to access your dashboard after ticket approval</p>
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
                    placeholder="+995 XXX XXX XXX"
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">For important updates before and during the conference</p>
                </div>
              </div>
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
                  {memberType === "TSU" ? (
                    <input
                      type="text"
                      value="Ivane Javakhishvili Tbilisi State University – Faculty of Medicine"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-600"
                      readOnly
                    />
                  ) : memberType === "GEOMEDI" ? (
                    <input
                      type="text"
                      value="GEOMEDI – Faculty of Medicine"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-600"
                      readOnly
                    />
                  ) : (
                    <select
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      required
                    >
                      <option value="">Select your university</option>
                      {universities.map((uni, index) => (
                        <option key={index} value={uni}>
                          {uni}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Current Semester/Year of Study *</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    required
                  >
                    <option value="">Select semester</option>
                    {semesters.map((sem, index) => (
                      <option key={index} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-300">
                <label className="block text-sm font-medium text-white mb-3">Which exam are you preparing for?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {exams.map((exam) => (
                    <label
                      key={exam}
                      className="flex items-center space-x-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-white/50 transition-colors bg-white/20 backdrop-blur-sm"
                    >
                      <input
                        type="radio"
                        name="examPrep"
                        value={exam}
                        checked={formData.examPrep === exam}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-white font-medium">{exam}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    name="examOther"
                    value={formData.examOther}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Specify other exam"
                  />
                </div>
              </div>
            </section>

            {/* Member-Specific Sections */}
            {memberType === "GIMSOC" && (
              <section className="space-y-6 animate-fade-in-delay">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">GIMSOC Membership</h2>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">GIMSOC Membership Code *</label>
                  <input
                    type="text"
                    name="gimsocMembershipCode"
                    value={formData.gimsocMembershipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Enter your GIMSOC membership code"
                    required
                  />
                </div>
              </section>
            )}

            {memberType === "TSU" && (
              <section className="space-y-6 animate-fade-in-delay">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">TSU Student Verification</h2>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">TSU Email Address *</label>
                  <input
                    type="email"
                    name="tsuEmail"
                    value={formData.tsuEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Enter your TSU email ID (e.g., student@tsu.ge)"
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">
                    Please enter your official TSU email address for verification
                  </p>
                </div>
              </section>
            )}

            {memberType === "GEOMEDI" && (
              <section className="space-y-6 animate-fade-in-delay">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">GEOMEDI Student Verification</h2>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">GEOMEDI Email Address *</label>
                  <input
                    type="email"
                    name="geomediEmail"
                    value={formData.geomediEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Enter your GEOMEDI email ID"
                    required
                  />
                  <p className="text-xs text-gray-300 mt-1">
                    Please enter your official GEOMEDI email address for verification
                  </p>
                </div>
              </section>
            )}

            {memberType === "Executive" && (
              <section className="space-y-6 animate-fade-in-delay">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Executive & Subcommittee Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-medium text-white mb-2">Your Position in GIMSOC *</label>
                    <input
                      type="text"
                      name="gimsocPosition"
                      value={formData.gimsocPosition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      placeholder="E.g., Executive Team Member, Subcommittee Member"
                      required
                    />
                  </div>

                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-medium text-white mb-2">GIMSOC Membership Code *</label>
                    <input
                      type="text"
                      name="gimsocMembershipCode"
                      value={formData.gimsocMembershipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      placeholder="Enter your GIMSOC membership code"
                      required
                    />
                  </div>
                </div>
              </section>
            )}

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
                  <p className="text-gray-300 mb-4">
                    You will be able to select 2 workshops from our comprehensive workshop lineup.
                  </p>
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
                  Upload a Headshot for Your Conference ID Card
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
                  />
                  <label htmlFor="headshot-upload" className="cursor-pointer">
                    <span className="text-blue-400 hover:text-blue-300 font-medium text-lg">Click to upload</span>
                    <span className="text-gray-300"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-300 mt-2">Clear, front-facing photo with plain background</p>
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
                      placeholder="e.g., lactose intolerance, gluten-free, allergies"
                      rows="3"
                    />
                  </div>

                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-medium text-white mb-2">Accessibility Needs</label>
                    <textarea
                      name="accessibilityNeeds"
                      value={formData.accessibilityNeeds}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      placeholder="Any accessibility needs or health conditions we should be aware of"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Gala Dinner */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Gala Dinner Add-On</h2>
              </div>

              <div className="bg-gradient-to-r from-purple-50/10 to-pink-50/10 border border-purple-200/30 rounded-xl p-6">
                <div className="text-center mb-6">
                  <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Would you like to attend the Gala Dinner?</h3>
                  <p className="text-gray-300 mb-4">
                    The Gala is the grand finale of MEDCON, an elegant evening designed to celebrate the success of the
                    conference, reflect on inspiring moments shared, and strengthen the connections formed.
                  </p>
                  <div className="bg-purple-100/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-purple-300">
                      <strong>Note:</strong> Gala access is optional and costs an additional 40 GEL.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Yes, I would like to attend the Gala Dinner (+40 GEL)",
                    "No, I will not attend the Gala Dinner",
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-4 border border-gray-200/30 rounded-lg hover:bg-white/10 cursor-pointer transition-all bg-white/5 backdrop-blur-sm"
                    >
                      <input
                        type="radio"
                        name="galaDinner"
                        value={option}
                        checked={formData.galaDinner === option}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                        required
                      />
                      <span className="text-white font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Declaration and Consent */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Declaration and Consent</h2>
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
                  <label className="block text-sm font-medium text-white mb-3">Media Consent</label>
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
                          Do you consent to the use of photos and videos of you taken during the conference for
                          promotional purposes? {option}
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
                        I agree to receive emails from GIMSOC and MEDCON, including updates, resources, and
                        conference-related information.
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
                <h2 className="text-2xl font-semibold text-white">Payment Information</h2>
              </div>

              <div className="space-y-4">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-3">Payment Method *</label>
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
                  </div>
                </div>

                {formData.paymentMethod === "Bank Transfer" && (
                  <div className="space-y-6">
                    {/* Bank Details */}
                    <div className="bg-gradient-to-r from-green-50/10 to-emerald-50/10 border-2 border-green-200/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-green-400 mb-4">Bank Transfer Details</h3>

                      {/* TBC Bank Details */}
                      <div className="mb-6">
                        <h4 className="text-md font-semibold text-green-300 mb-3">FOR LARI TRANSFER</h4>
                        <div className="bg-white/10 rounded-lg p-4 space-y-2">
                          <p className="text-sm text-gray-300">
                            <strong>Beneficiary's Bank:</strong> JSC TBC Bank
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>Location:</strong> Tbilisi, Georgia
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>Swift:</strong> TBCBGE22
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>Beneficiary's IBAN:</strong> GE31TB7724245061200012
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>Name of Beneficiary:</strong> Mandrika Santosh Umanga Fernando
                          </p>
                        </div>
                      </div>

                      {/* Bank of Georgia Details */}
                      <div>
                        <h4 className="text-md font-semibold text-green-300 mb-3">
                          BANK DETAILS FOR TRANSFERS IN GEORGIAN LARI (GEL)
                        </h4>
                        <div className="bg-white/10 rounded-lg p-4 space-y-2">
                          <p className="text-sm text-gray-300">
                            <strong>Account with institution:</strong> Bank of Georgia
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>SWIFT:</strong> BAGAGE22
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>Beneficiary:</strong> FERNANDO MANDRIKA SANTOSH U.
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>Account:</strong> GE94BG0000000608342766
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>Phone:</strong> (+995 32) 2 444 444
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>E-mail:</strong> welcome@bog.ge
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Upload Section */}
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <label className="block text-sm font-medium text-white mb-2">Upload Proof of Payment *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors bg-white/20 backdrop-blur-sm">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <input
                          type="file"
                          onChange={handleFileChange}
                          name="paymentProof"
                          accept=".jpg,.jpeg,.png"
                          className="hidden"
                          id="payment-upload"
                        />
                        <label htmlFor="payment-upload" className="cursor-pointer">
                          <span className="text-green-400 hover:text-green-300 font-medium">Click to upload</span>
                          <span className="text-gray-300"> or drag and drop</span>
                        </label>
                        <p className="text-xs text-gray-300 mt-1">
                          Please upload a screenshot (JPEG/PNG) of your bank transfer confirmation
                        </p>
                        {formData.paymentProof && (
                          <p className="text-sm text-green-400 mt-2">✓ File selected: {formData.paymentProof.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Discount Confirmation for TSU and GEOMEDI */}
            {(memberType === "TSU" || memberType === "Non-GIMSOC") && (
              <section className="space-y-6 animate-fade-in-delay">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Payment and Pricing Acknowledgment</h2>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="discountConfirmation"
                      checked={formData.discountConfirmation}
                      onChange={handleInputChange}
                      className="text-yellow-600 focus:ring-yellow-500 rounded"
                      required
                    />
                    <span className="text-white">
                      I acknowledge that I am eligible for the discounted {memberType} student ticket and understand
                      that this rate applies only with valid proof of enrollment.
                    </span>
                  </label>
                </div>
              </section>
            )}

            {/* Submit Button */}
            <div className="pt-8">
              <StatefulButton
                type="submit"
                disabled={isSubmitting || soldOut || emailUsed}
                className="w-full py-4 px-8 rounded-xl font-semibold text-lg"
              >
                Complete Registration - {calculatePrice()} GEL
              </StatefulButton>
            </div>
          </form>
        </div>
      </div>

      {errorBooking && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="w-full text-center py-2 bg-red-600 text-white font-bold text-lg shadow-lg animate-fade-in">
            Error booking the ticket
          </div>
        </div>
      )}
    </div>
  )
}
