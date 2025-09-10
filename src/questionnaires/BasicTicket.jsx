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
import CreditCardAnimation from "../Components/CreditCardAnimation"
import { StatefulButton } from "../Components/StatefulButton"
import ErrorAnimation from "../Components/ErrorAnimation"
import LoadingAnimation from "../Components/LoadingAnimation"

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

export default function BasicTicket() {
  const [memberType, setMemberType] = useState("")
  const [formData, setFormData] = useState({
    // Member Type
    memberType: "",
    // Personal Information
    fullName: "",
    email: "",
    whatsapp: "",
    dashboardPassword: "",
    // GIMSOC Specific
    gimsocMembershipCode: "",
    // Academic Information
    universityName: "",
    semester: "",
    examPrep: [],
    examOther: "",
    // Uploads
    headshot: null,
    paymentProof: null,
    // Preferences
    foodPreference: "",
    dietaryRestrictions: "",
    accessibilityNeeds: "",
    // Consent
    infoAccurate: false,
    mediaConsent: "",
    policies: false,
    emailConsent: false,
    whatsappConsent: false,
    // Payment
    paymentMethod: "",
    // Additional fields for backend compatibility
    ticketType: "Basic",
    ticketCategory: "Basic",
    subType: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [fadeIn, setFadeIn] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [errorBooking, setErrorBooking] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [emailUsed, setEmailUsed] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [bankTransferKey, setBankTransferKey] = useState(0)
  const [errorType, setErrorType] = useState("general")
  const navigate = useNavigate()

  useEffect(() => {
    setFadeIn(true)
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    // Handle multiple selections for examPrep
    if (name === "examPrep") {
      setFormData((prev) => ({
        ...prev,
        examPrep: checked 
          ? [...prev.examPrep, value]
          : prev.examPrep.filter(exam => exam !== value)
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
      
      // Force re-render when switching TO Bank Transfer
      if (name === "paymentMethod" && value === "Bank Transfer") {
        setBankTransferKey(prev => prev + 1)
      }
    }
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    const file = files[0]
    
    if (!file) return
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert(`File ${file.name} is too large. Maximum size is 5MB.`)
      e.target.value = '' // Clear the input
      return
    }
    
    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      alert(`File ${file.name} has invalid type. Allowed types: JPEG, PNG, WebP, PDF, DOC, DOCX`)
      e.target.value = '' // Clear the input
      return
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }))
  }

  const handleMemberTypeSelect = (type) => {
    const typeMapping = {
      gimsoc: "GIMSOC",
      "non-gimsoc": "Non-GIMSOC",
    }

    const mappedType = typeMapping[type] || type
    setMemberType(mappedType)
    setFormData((prev) => ({
      ...prev,
      memberType: mappedType,
      subType: mappedType,
    }))
    setCurrentStep(2)
  }

  // Calculate pricing based on member type
  const getINRPrice = () => {
    switch (memberType) {
      case "GIMSOC":
        return 1000 // GIMSOC Members - 1000 INR
      case "Non-GIMSOC":
        return 1320 // Non-GIMSOC Members - 1320 INR
      default:
        return 1320 // Default to Non-GIMSOC price
    }
  }

  const calculatePrice = () => {
    switch (memberType) {
      case "GIMSOC":
        return 30 // GIMSOC Members - 30 GEL
      case "Non-GIMSOC":
        return 40 // Non-GIMSOC Members - 40 GEL
      default:
        return 40 // Default to Non-GIMSOC price
    }
  }

  const getMemberTypeDisplay = () => {
    switch (memberType) {
      case "GIMSOC":
        return "GIMSOC Member (Basic)"
      case "Non-GIMSOC":
        return "Non-GIMSOC Member (Basic)"
      default:
        return ""
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    
    if (isSubmitting) {
      console.log("⚠️ Submission already in progress, ignoring duplicate click")
      return
    }
    
    console.log("🚀 Setting submission states...")
    setIsSubmitting(true)
    setShowLoading(true)
    setEmailUsed(false)
    setErrorMessage("")

    // Comprehensive validation for all required fields
    const requiredFields = {
      email: formData.email,
      fullName: formData.fullName,
      whatsapp: formData.whatsapp,
      universityName: formData.universityName,
      semester: formData.semester,
      foodPreference: formData.foodPreference,
      accessibilityNeeds: formData.accessibilityNeeds,
      paymentMethod: formData.paymentMethod,
      infoAccurate: formData.infoAccurate,
      mediaConsent: formData.mediaConsent,
      policies: formData.policies,
      emailConsent: formData.emailConsent,
      whatsappConsent: formData.whatsappConsent,
      headshot: formData.headshot,
      paymentProof: formData.paymentProof
    }

    // Special validation for GIMSOC members
    if (memberType === "GIMSOC" && !formData.gimsocMembershipCode) {
      alert("Please enter your GIMSOC membership code")
      setIsSubmitting(false)
      return
    }

    // Check for missing required fields
    const missingFields = []
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value || (typeof value === 'string' && value.trim() === '') || 
          (typeof value === 'boolean' && !value) || 
          (Array.isArray(value) && value.length === 0)) {
        missingFields.push(field)
      }
    }

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => {
        const fieldMap = {
          email: "Email",
          fullName: "Full Name",
          whatsapp: "WhatsApp Number",
          universityName: "University Name",
          semester: "Semester",
          foodPreference: "Food Preference",
          accessibilityNeeds: "Accessibility Needs",
          paymentMethod: "Payment Method",
          infoAccurate: "Information Accuracy Confirmation",
          mediaConsent: "Media Consent",
          policies: "Policies Agreement",
          emailConsent: "Email Consent",
          whatsappConsent: "WhatsApp Consent",
          headshot: "Profile Photo",
          paymentProof: "Payment Proof"
        }
        return fieldMap[field] || field
      }).join(", ")
      
      alert(`Please fill in all required fields: ${fieldNames}`)
      setIsSubmitting(false)
      return
    }

    const form = new FormData()

    // Set ticket classification
    form.append("ticketCategory", "Basic")
    form.append("subType", memberType)
    form.append("ticketType", "Basic")

    // Convert form data according to schema
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        // Boolean conversions
        if (["infoAccurate", "policies", "emailConsent", "whatsappConsent"].includes(key)) {
          const boolValue = value === true || value === "true" || value === "Yes"
          form.append(key, boolValue.toString())
        } else if (["mediaConsent"].includes(key)) {
          const boolValue = value === "Yes"
          form.append(key, boolValue.toString())
        }
        // File fields
        else if (key === "headshot" || key === "paymentProof") {
          if (typeof value === "string" && value.startsWith("http")) {
            form.append(key + "Url", value)
          } else if (value instanceof File) {
            form.append(key, value)
          }
        }
        // Handle examPrep array
        else if (key === "examPrep" && Array.isArray(value)) {
          form.append(key, value.join(", "))
        }
        // Regular fields
        else {
          form.append(key, value)
        }
      }
    })

    // Add required fields
    form.append("isGimsocMember", (memberType === "GIMSOC").toString())

    try {
      const response = await axios.post("https://gimsoc-backend.onrender.com/api/form/submit", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        timeout: 60000,
      })

      console.log("✅ Submitted successfully:", response.data)
      
      if (response.data.message === "Ticket submitted successfully") {
        setShowLoading(false)
        setShowSuccessAnimation(true)
        
        setTimeout(() => {
          navigate("/ticket-success")
        }, 3500)
      } else {
        throw new Error("Unexpected response from server")
      }
    } catch (err) {
      setShowLoading(false)
      console.error("❌ Submission failed:", err.response?.data || err.message)

      if (err.response?.status === 409 && err.response?.data?.message?.includes("already been used")) {
        setEmailUsed(true)
      } else {
        setErrorBooking(true)
        setErrorMessage(err.response?.data?.message || err.message)
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
        {showSuccessAnimation && <SuccessAnimation />}
        {showLoading && <LoadingAnimation isVisible={showLoading} onComplete={() => setShowLoading(false)} />}

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
                  Basic Ticket
                </h1>
                <p className="text-blue-100 text-xl mb-6 animate-fade-in-delay">
                  Choose your membership type to continue
                </p>
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 animate-glow">
                  <div className="text-blue-100 text-sm mt-2">Access to speakers, presentations, and limited access to fairs and booths</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
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
                      <span className="text-2xl font-bold text-green-400">30 GEL / 1000 INR</span>
                      <div className="text-sm text-gray-400">GIMSOC member price</div>
                    </div>
                  </div>
                </div>

                {/* Non-GIMSOC Member */}
                <div
                  onClick={() => handleMemberTypeSelect("non-gimsoc")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="bg-gradient-to-br from-blue-800/20 to-blue-900/20 border-2 border-blue-300/50 rounded-2xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Non-GIMSOC Member</h3>
                    <p className="text-white mb-4">Standard registration</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-blue-600">40 GEL / 1320 INR</span>
                      <div className="text-sm text-gray-400">Regular price</div>
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

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-8 py-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 animate-pulse"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{getMemberTypeDisplay()} Registration</h1>
              <p className="text-blue-100 mb-4">Basic Ticket - Complete your registration</p>

              {/* Dynamic Price Display */}
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <span className="text-white text-lg font-medium">Total Price: </span>
                <span className="text-white text-3xl font-bold">{calculatePrice()} GEL / {getINRPrice()} INR</span>
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

                {memberType === "GIMSOC" && (
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
                )}
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
                <label className="block text-sm font-medium text-white mb-3">Which exam(s) are you preparing for? (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {exams.map((exam) => (
                    <label
                      key={exam}
                      className="flex items-center space-x-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-white/50 transition-colors bg-white/20 backdrop-blur-sm"
                    >
                      <input
                        type="checkbox"
                        name="examPrep"
                        value={exam}
                        checked={formData.examPrep.includes(exam)}
                        onChange={handleInputChange}
                        className="text-green-600 focus:ring-green-500 rounded"
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
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Specify other exam(s)"
                  />
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
                  Upload a Headshot for Your Conference ID Card *
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
                  <p className="text-xs text-yellow-300 mt-1">📁 Only JPEG and PNG files are allowed</p>
                  <p className="text-xs text-red-300 mt-1">⚠️ Maximum file size: 5MB</p>
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
                    <label className="block text-sm font-medium text-white mb-2">Accessibility Needs *</label>
                    <textarea
                      name="accessibilityNeeds"
                      value={formData.accessibilityNeeds}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      placeholder="Any accessibility needs or health conditions we should be aware of"
                      rows="3"
                      required
                    />
                  </div>
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
                      I confirm that all the information provided is accurate to the best of my knowledge. (Required)
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
                        I agree to comply with all conference policies, rules, and guidelines. (Required)
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
                        required
                      />
                      <span className="text-white">
                        I agree to receive emails from GIMSOC, including updates, resources, and conference-related information.
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
                        required
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
                    {["Bank Transfer", "Credit/Debit Card"].map((method) => (
                      <label key={method} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white/50 cursor-pointer transition-all bg-white/20 backdrop-blur-sm">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleInputChange}
                          className="text-green-600 focus:ring-green-500"
                          required
                        />
                        <span className="text-white font-medium">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.paymentMethod === "Bank Transfer" && (
                  <div key={`bank-transfer-${bankTransferKey}`} className="space-y-6">
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
                      <div className="mb-6">
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
                        </div>
                      </div>

                      {/* INR Transfer Details */}
                      <div>
                        <h4 className="text-md font-semibold text-green-300 mb-3">
                          FOR INR TRANSFER (INDIAN RUPEES)
                        </h4>
                        <div className="bg-white/10 rounded-lg p-4 space-y-2">
                          <p className="text-sm text-gray-300">
                            <strong>UPI ID:</strong> divyeshkadiyala@ybl
                          </p>
                          <p className="text-sm text-gray-300">
                            <strong>Phone Number:</strong> +91 8971224430
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
                        <p className="text-xs text-gray-300 mt-1">PNG or JPEG only</p>
                        <p className="text-xs text-red-300 mt-1">⚠️ Maximum file size: 5MB</p>
                        {formData.paymentProof && (
                          <p className="text-sm text-green-400 mt-2">✓ File selected: {formData.paymentProof.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-8">
              <StatefulButton
                type="submit"
                disabled={isSubmitting || emailUsed}
                className="w-full py-4 px-8 rounded-xl font-semibold text-lg"
              >
                Complete Registration - {calculatePrice()} GEL / {getINRPrice()} INR
              </StatefulButton>
            </div>
          </form>
        </div>
      </div>

      {/* Error Animations */}
      <ErrorAnimation
        errorType="email_used"
        message={errorMessage}
        isVisible={emailUsed}
        onClose={() => setEmailUsed(false)}
        onRetry={() => {
          setEmailUsed(false)
          setErrorMessage("")
        }}
      />
      
      <ErrorAnimation
        errorType="general"
        message={errorMessage}
        isVisible={errorBooking}
        onClose={() => setErrorBooking(false)}
        onRetry={() => {
          setErrorBooking(false)
          setErrorMessage("")
        }}
      />
    </div>
  )
}
