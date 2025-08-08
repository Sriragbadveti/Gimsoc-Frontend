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
import CreditCardAnimation from "../Components/CreditCardAnimation"
import PaypalButton from "../Components/PaypalButton"
import LoadingAnimation from "../Components/LoadingAnimation"
import LoadingBar from "../Components/LoadingBar"

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

export default function InternationalTicket() {
  const [packageType, setPackageType] = useState("")
  const [formData, setFormData] = useState({
    // Package Type
    packageType: "",
    // Personal Information
    fullName: "",
    email: "",
    whatsapp: "",
    dashboardPassword: "",
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
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [errorBooking, setErrorBooking] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const navigate = useNavigate()
  const [paypalPaid, setPaypalPaid] = useState(false);
  const [paypalOrderId, setPaypalOrderId] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0)
  const [fileUploadProgress, setFileUploadProgress] = useState(0)
  const [bankTransferKey, setBankTransferKey] = useState(0)


  useEffect(() => {
    setFadeIn(true)
  }, [])

  // Reset PayPal payment status when payment method changes
  useEffect(() => {
    if (formData.paymentMethod !== "Credit/Debit Card") {
      setPaypalPaid(false)
    }
  }, [formData.paymentMethod])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    // Force re-render when switching TO Bank Transfer to fix white screen issue
    if (name === "paymentMethod" && value === "Bank Transfer") {
      setBankTransferKey(prev => prev + 1)
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
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
    
    console.log(`📁 File selected: ${file.name} (${file.size} bytes, ${file.type})`)
    
    setFormData((prev) => ({
      ...prev,
      [name]: file,
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

  // Calculate pricing based on package type
  const getINRPrice = () => {
    switch (packageType) {
      case "3Days":
        return 8800 // 3-Day Package - 8800 INR
      case "7Days":
        return 26800 // 7-Day Package - 26800 INR
      default:
        return 0
    }
  }

  const calculatePrice = () => {
    switch (packageType) {
      case "3Days":
        return 100 // 3-Day Package - 100 USD
      case "7Days":
        return 325 // 7-Day Package - 325 USD
      default:
        return 0
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Prevent double submission
    if (isSubmitting) {
      console.log("⚠️ Submission already in progress, ignoring duplicate click")
      return
    }

    // Check if PayPal payment is required but not completed
    if (formData.paymentMethod === "Credit/Debit Card" && !paypalPaid) {
      alert("Please complete the PayPal payment before submitting your registration.")
      return
    }
    
    setIsSubmitting(true)
    setShowLoading(true)
    setLoadingStep(0) // Start at step 0
    setFileUploadProgress(0)

    // Show upload progress message
    console.log("🚀 Starting ticket submission process...")
    console.log("📁 Files to upload:", {
      headshot: formData.headshot ? `${formData.headshot.name} (${formData.headshot.size} bytes)` : 'None',
      paymentProof: formData.paymentProof ? `${formData.paymentProof.name} (${formData.paymentProof.size} bytes)` : 'None'
    })

    // Comprehensive validation for all required fields
    const requiredFields = {
      email: formData.email,
      fullName: formData.fullName,
      dashboardPassword: formData.dashboardPassword,
      whatsapp: formData.whatsapp,
      nationality: formData.nationality,
      countryOfResidence: formData.countryOfResidence,
      passportNumber: formData.passportNumber,
      needsVisaSupport: formData.needsVisaSupport,
      universityName: formData.universityName,
      semester: formData.semester,
      foodPreference: formData.foodPreference,
      dietaryRestrictions: formData.dietaryRestrictions,
      accessibilityNeeds: formData.accessibilityNeeds,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: formData.emergencyContactPhone,
      paymentMethod: formData.paymentMethod,
      infoAccurate: formData.infoAccurate,
      mediaConsent: formData.mediaConsent,
      policies: formData.policies,
      emailConsent: formData.emailConsent,
      whatsappConsent: formData.whatsappConsent,
      headshot: formData.headshot,
      paymentProof: formData.paymentProof
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

    // Special validation for 7-day package friends (optional)
    // Removed mandatory validation for friend names

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => {
        const fieldMap = {
          email: "Email",
          fullName: "Full Name",
          dashboardPassword: "Dashboard Password",
          whatsapp: "WhatsApp Number",
          nationality: "Nationality",
          countryOfResidence: "Country of Residence",
          passportNumber: "Passport Number",
          needsVisaSupport: "Visa Support Requirement",
          universityName: "University Name",
          semester: "Semester",
          foodPreference: "Food Preference",
          dietaryRestrictions: "Dietary Restrictions",
          accessibilityNeeds: "Accessibility Needs",
          emergencyContactName: "Emergency Contact Name",
          emergencyContactPhone: "Emergency Contact Phone",
          paymentMethod: "Payment Method",
          infoAccurate: "Information Accuracy Confirmation",
          mediaConsent: "Media Consent",
          policies: "Policies Agreement",
          emailConsent: "Email Consent",
          whatsappConsent: "WhatsApp Consent",
          headshot: "Profile Photo",
          paymentProof: "Payment Proof",
          friend1Name: "Friend 1 Name (7-Day Package)",
          friend2Name: "Friend 2 Name (7-Day Package)"
        }
        return fieldMap[field] || field
      }).join(", ")
      
      alert(`Please fill in all required fields: ${fieldNames}`)
      setIsSubmitting(false)
      return
    }

    const form = new FormData()
    form.append("ticketCategory", "International")
    form.append("ticketType", `International-${packageType}`)

    // Add PayPal order ID if available
    if (paypalOrderId) {
      form.append("paypalOrderId", paypalOrderId)
      console.log("💳 Adding PayPal order ID to form:", paypalOrderId)
    }

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
          console.log(`📝 Form field ${key}: ${value}`)
        }
      }
    })

    try {
      console.log("🚀 Submitting international ticket form...")
      console.log("📋 Form data being sent:", {
        ticketCategory: "International",
        ticketType: `International-${packageType}`,
        email: formData.email,
        fullName: formData.fullName,
        paymentMethod: formData.paymentMethod
      })
      
      // Step 1: Validation complete
      setLoadingStep(1)
      
      // Step 2: File upload in progress
      setLoadingStep(2)
      
      const response = await axios.post("https://gimsoc-backend.onrender.com/api/form/submit", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        timeout: 60000, // 60 second timeout for file uploads
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setFileUploadProgress(progress)
          }
        }
      })

      // Step 3: Processing payment
      setLoadingStep(3)
      
      // Step 4: Saving ticket
      setLoadingStep(4)
      
      console.log("✅ Submitted successfully:", response.data)
      
      // Only show success animations and navigate on successful submission
      // Check if the response indicates a successful submission
      if (response.data.message === "Ticket submitted successfully") {
        // Step 5: Sending confirmation
        setLoadingStep(5)
        
        // Let the loading animation complete naturally, then show success
        setTimeout(() => {
          setShowLoading(false)
          setShowSuccessAnimation(true)
          
          // Navigate to success page after success animation
          setTimeout(() => {
            navigate("/ticket-success")
          }, 3500)
        }, 1000) // Wait for loading animation to complete
      } else {
        // If there's an unexpected response, treat it as an error
        throw new Error("Unexpected response from server")
      }
    } catch (err) {
      setShowLoading(false)
      setErrorBooking(true)
      console.error("❌ Submission failed:", err)
      console.error("❌ Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      })
      
      if (err.code === "ECONNABORTED") {
        alert("Request timed out. Please try again later.")
      } else if (err.response) {
        const errorMessage = err.response.data?.message || err.message;
        const errorDetails = err.response.data?.details || [];
        
        if (err.response?.status === 400 && errorDetails.length > 0) {
          // Show detailed validation errors
          const errorMessages = errorDetails.map(detail => `${detail.field}: ${detail.message}`).join('\n');
          alert(`Validation errors:\n${errorMessages}`);
        } else {
          alert(`Form submission failed: ${errorMessage}`)
        }
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
        {showSuccessAnimation && <SuccessAnimation />}
        {showLoading && <LoadingAnimation isVisible={showLoading} onComplete={() => setShowLoading(false)} />}
        <LoadingBar 
          isVisible={isSubmitting} 
          message="Booking your ticket..." 
          currentStep={loadingStep}
          totalSteps={5}
          fileUploadProgress={fileUploadProgress}
        />

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
                    <h3 className="text-2xl font-bold text-white mb-4">International 3-Day Package</h3>
                    <p className="text-white mb-6">Perfect for international delegates seeking a compact yet immersive MEDCON experience across 3 days.</p>
                    <div className="space-y-3 mb-6 text-left">
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>2-day conference access</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Gala Dinner on Day 3</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Access to interactive workshops</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Academic, research, and activities fairs</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Exclusive networking opportunities</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Certificate of attendance</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>CPD certification</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Special hotel promo codes/discounts will be provided after registration</div>
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
                    <h3 className="text-2xl font-bold text-white mb-4">International 7-Day All-Inclusive Package</h3>
                    <p className="text-white mb-6">The ultimate MEDCON experience, combining academics, cultural immersion, and comfort. Everything is taken care of so you can focus on learning, networking, and exploring Georgia.</p>
                    <div className="space-y-3 mb-6 text-left">
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Full conference access</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Access to interactive workshops</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Gala Dinner</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Academic, research, and activities fairs</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Poster presentations</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Hotel stay (shared 2-bedroom accommodation) for 7 days</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Daily transport to/from the conference venue</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Tour of Tbilisi on Day 2</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Travel and excursion outside Tbilisi on Day 6</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>Certificate of attendance</div>
                      <div className="flex items-center text-green-300"><span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>CPD certification</div>
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
      {showSuccessAnimation && <SuccessAnimation />}


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
              
              {/* Price Display */}
              {packageType && (
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 mb-4 border border-white/30">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-white text-lg font-semibold">Package Price:</span>
                    <span className="text-3xl font-bold text-yellow-400">${calculatePrice()} USD / {getINRPrice()} INR</span>
                  </div>
                  <p className="text-blue-100 text-sm mt-1">
                    {packageType === "3Days" ? "3-Day conference access with gala night" : "7-Day all-inclusive with accommodation and tours"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Mandatory Fields Notice */}
            <div className="bg-red-50/10 border border-red-200/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-red-300 font-semibold">Important Notice</span>
              </div>
              <p className="text-red-200 text-sm">
                All fields marked with * are mandatory and must be completed. This includes profile photos and payment proof uploads.
              </p>
            </div>
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
                    accept=".jpg,.jpeg,.png"
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
                  <p className="text-gray-300 mb-4">
                    Workshop selection will begin in September: Stay tuned for announcements on your email and our socials
                  </p>
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
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    id="headshot-upload"
                    required
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

                {formData.paymentMethod === "Credit/Debit Card" && (
                  <div className="mt-4">
                    {!paypalPaid ? (
                      <PaypalButton
                        key={`paypal-${packageType}-${formData.paymentMethod}`}
                        amount={packageType === "7Days" ? "325.00" : "100.00"}
                        onSuccess={(data) => {
                          console.log("✅ PayPal payment successful:", data)
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
                          <p className="text-sm text-gray-300">
                            <strong>Amount:</strong> {packageType === "7Days" ? "26800 INR" : "8800 INR"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* PhonePe Image Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-4 text-center">
                        💳 PhonePe Payment Option
                      </h3>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <img 
                          src="/phonepe.jpg" 
                          alt="PhonePe Payment" 
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <p className="text-sm text-gray-300 mt-2 text-center">Scan QR code or use UPI ID for payment</p>
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
                          Upload the exact payment receipt as a JPEG or PNG, not a PDF. Screenshots must clearly show full transaction details.
                        </p>
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
              <button
                type="submit"
                disabled={isSubmitting || (formData.paymentMethod === "Credit/Debit Card" && !paypalPaid)}
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
