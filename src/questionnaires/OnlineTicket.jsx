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
import PaypalButton from "../Components/PaypalButton"

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

export default function OnlineTicket() {
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
    isStudent: "",
    universityName: "",
    fieldOfStudy: "",
    examPrep: [],
    examOther: "",
    // Country Information
    countryOfResidence: "",
    timeZone: "",
    // Source of Information
    sourceOfInfo: "",
    sourceOther: "",
    isDfcMember: "",
    // Uploads
    paymentProof: null,
    // Consent
    infoAccurate: false,
    emailConsent: false,
    whatsappConsent: false,
    mediaConsent: "",
    // Payment
    paymentMethod: "",
    // Additional fields for backend compatibility
    ticketType: "Online",
    ticketCategory: "Online",
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
  const [paypalPaid, setPaypalPaid] = useState(false)
  const [paypalOrderId, setPaypalOrderId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setFadeIn(true)
  }, [])

  // Reset PayPal payment status when payment method changes
  useEffect(() => {
    if (formData.paymentMethod !== "Credit/Debit Card") {
      setPaypalPaid(false)
      setPaypalOrderId(null)
    }
  }, [formData.paymentMethod])

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
        return 1320 // GIMSOC Members - 1320 INR
      case "Non-GIMSOC":
        return 1480 // Non-GIMSOC Members - 1480 INR
      default:
        return 1480 // Default to Non-GIMSOC price
    }
  }

  const calculatePrice = () => {
    switch (memberType) {
      case "GIMSOC":
        return 16 // GIMSOC Members - 16 USD
      case "Non-GIMSOC":
        return 18 // Non-GIMSOC Members - 18 USD
      default:
        return 18 // Default to Non-GIMSOC price
    }
  }

  const getMemberTypeDisplay = () => {
    switch (memberType) {
      case "GIMSOC":
        return "GIMSOC Member (Online)"
      case "Non-GIMSOC":
        return "Non-GIMSOC Member (Online)"
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

    // Check if PayPal payment is required but not completed
    if (formData.paymentMethod === "Credit/Debit Card" && !paypalPaid) {
      alert("Please complete the PayPal payment before submitting your registration.")
      setIsSubmitting(false)
      setShowLoading(false)
      return
    }

    // Comprehensive validation for all required fields
    const requiredFields = {
      email: formData.email,
      fullName: formData.fullName,
      whatsapp: formData.whatsapp,
      isStudent: formData.isStudent,
      countryOfResidence: formData.countryOfResidence,
      sourceOfInfo: formData.sourceOfInfo,
      isDfcMember: formData.isDfcMember,
      paymentMethod: formData.paymentMethod,
      infoAccurate: formData.infoAccurate,
      mediaConsent: formData.mediaConsent,
      emailConsent: formData.emailConsent,
      whatsappConsent: formData.whatsappConsent,
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
          isStudent: "Student Status",
          countryOfResidence: "Country of Residence",
          sourceOfInfo: "Source of Information",
          isDfcMember: "DFC Membership Status",
          paymentMethod: "Payment Method",
          infoAccurate: "Information Accuracy Confirmation",
          mediaConsent: "Media Consent",
          emailConsent: "Email Consent",
          whatsappConsent: "WhatsApp Consent",
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
    form.append("ticketCategory", "Online")
    form.append("subType", memberType)
    form.append("ticketType", "Online")

    // Convert form data according to schema
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        // Skip ticket classification fields as they're handled separately
        if (["ticketType", "ticketCategory", "subType"].includes(key)) {
          return;
        }
        
        // Boolean conversions
        if (["infoAccurate", "emailConsent", "whatsappConsent"].includes(key)) {
          const boolValue = value === true || value === "true" || value === "Yes"
          form.append(key, boolValue.toString())
        } else if (["mediaConsent"].includes(key)) {
          const boolValue = value === "Yes"
          form.append(key, boolValue.toString())
        }
        // File fields
        else if (key === "paymentProof") {
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
    
    // Add PayPal order ID if payment was made via PayPal
    if (paypalOrderId) {
      form.append("paypalOrderId", paypalOrderId)
    }

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
                  Online Ticket
                </h1>
                <p className="text-blue-100 text-xl mb-6 animate-fade-in-delay">
                  Choose your membership type to continue
                </p>
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 animate-glow">
                  <div className="text-blue-100 text-sm mt-2">Online access to speaker sessions and presentations</div>
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
                      <span className="text-2xl font-bold text-green-400">16 USD / 1320 INR</span>
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
                      <span className="text-2xl font-bold text-blue-600">18 USD / 1480 INR</span>
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
              <p className="text-blue-100 mb-4">Online Ticket - Complete your registration</p>

              {/* Dynamic Price Display */}
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <span className="text-white text-lg font-medium">Total Price: </span>
                <span className="text-white text-3xl font-bold">{calculatePrice()} USD / {getINRPrice()} INR</span>
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

            {/* Academic Background */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Academic / General Background</h2>
              </div>

              <div className="space-y-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-3">Are you currently a student? *</label>
                  <div className="space-y-3">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="isStudent"
                          value={option}
                          checked={formData.isStudent === option}
                          onChange={handleInputChange}
                          className="text-green-600 focus:ring-green-500"
                          required
                        />
                        <span className="text-white font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.isStudent === "Yes" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <label className="block text-sm font-medium text-white mb-2">University/Institution Name</label>
                      <input
                        type="text"
                        name="universityName"
                        value={formData.universityName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                        placeholder="Enter your university/institution name"
                      />
                    </div>

                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <label className="block text-sm font-medium text-white mb-2">Field of Study / Area of Interest</label>
                      <input
                        type="text"
                        name="fieldOfStudy"
                        value={formData.fieldOfStudy}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                        placeholder="Enter your field of study"
                      />
                    </div>
                  </div>
                )}

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-3">Are you preparing for any medical or health-related exams? (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["USMLE", "PLAB", "FMGE", "IFOM", "Not Applicable"].map((exam) => (
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
              </div>
            </section>

            {/* Country Information */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Country Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Country of Residence *</label>
                  <input
                    type="text"
                    name="countryOfResidence"
                    value={formData.countryOfResidence}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="Enter your country of residence"
                    required
                  />
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-2">Time Zone (optional)</label>
                  <input
                    type="text"
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                    placeholder="e.g., UTC+5:30, EST, PST"
                  />
                </div>
              </div>
            </section>

            {/* Source of Information */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Source of Information</h2>
              </div>

              <div className="space-y-6">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-3">Where did you hear about MEDCON'25? *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Website", "Instagram", "LinkedIn", "Facebook", "Word of Mouth"].map((source) => (
                      <label
                        key={source}
                        className="flex items-center space-x-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-white/50 transition-colors bg-white/20 backdrop-blur-sm"
                      >
                        <input
                          type="radio"
                          name="sourceOfInfo"
                          value={source}
                          checked={formData.sourceOfInfo === source}
                          onChange={handleInputChange}
                          className="text-yellow-600 focus:ring-yellow-500"
                          required
                        />
                        <span className="text-sm text-white font-medium">{source}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="text"
                      name="sourceOther"
                      value={formData.sourceOther}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 backdrop-blur-sm text-gray-800"
                      placeholder="Specify other source"
                    />
                  </div>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-3">Are you a Doctors For Cause (DFC) member? *</label>
                  <div className="space-y-3">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="isDfcMember"
                          value={option}
                          checked={formData.isDfcMember === option}
                          onChange={handleInputChange}
                          className="text-yellow-600 focus:ring-yellow-500"
                          required
                        />
                        <span className="text-white font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section className="space-y-6 animate-fade-in-delay">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Payment Details</h2>
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

                {formData.paymentMethod === "Credit/Debit Card" && (
                  <div className="mt-4">
                    {!paypalPaid ? (
                      <PaypalButton
                        key={`paypal-${memberType}-${formData.paymentMethod}`}
                        amount={calculatePrice().toString() + ".00"}
                        onSuccess={(data) => {
                          setPaypalPaid(true)
                          setPaypalOrderId(data.orderID)
                          alert("Payment successful! You can now complete your registration.")
                        }}
                        onError={(error) => {
                          console.error("❌ PayPal payment failed:", error)
                          alert("PayPal payment failed. Please try again.")
                        }}
                      />
                    ) : (
                      <div className="text-green-500 font-semibold text-center p-4 bg-green-100 rounded-lg">
                        ✅ Payment successful! You can now complete registration.
                      </div>
                    )}
                  </div>
                )}

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

            {/* Declaration and Consent */}
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
                      I confirm that all information provided is accurate. (Required)
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
                      I agree to receive emails from GIMSOC with conference materials and updates. (Required)
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
                      I consent to be added to the official WhatsApp group for online participants. (Required)
                    </span>
                  </label>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-300">
                  <label className="block text-sm font-medium text-white mb-3">Do you consent to the use of screenshots or recordings during sessions where your name or image may appear (for promotional purposes)?</label>
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
                        <span className="text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-8">
              <StatefulButton
                type="submit"
                disabled={isSubmitting || emailUsed}
                className="w-full py-4 px-8 rounded-xl font-semibold text-lg"
              >
                Complete Registration - {calculatePrice()} USD / {getINRPrice()} INR
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
