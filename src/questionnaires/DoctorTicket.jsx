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
import LoadingAnimation from "../Components/LoadingAnimation"
// LoadingBar import removed - using LoadingAnimation instead

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
  const [showLoading, setShowLoading] = useState(false)
  const navigate = useNavigate()
  const [loadingStep, setLoadingStep] = useState(0)
  const [fileUploadProgress, setFileUploadProgress] = useState(0)

  useEffect(() => {
    setFadeIn(true)
  }, [])

  // Debug payment method changes
  useEffect(() => {
    console.log("🎯 Payment method changed:", formData.paymentMethod)
  }, [formData.paymentMethod])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    console.log("🔄 Input change:", { name, value, type, checked })
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }
      console.log("📝 New form data:", newData)
      return newData
    })
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

  const handlePassSelect = (type) => {
    setPassType(type)
    setFormData((prev) => ({
      ...prev,
      passType: type,
      ticketType: type === "Basic" ? "Doctor" : "Doctor",
      ticketCategory: type === "Basic" ? "Doctor" : "Doctor",
      workshopPackage: type === "AllInclusive" ? "All-Inclusive" : "Basic",
      // Automatically include gala dinner for all-inclusive doctor tickets
      galaDinner: type === "AllInclusive" ? "Yes, I would like to attend the Gala Dinner (+40 GEL)" : "",
    }))
    setCurrentStep(2)
  }

  // Calculate pricing based on pass type
  const calculatePrice = () => {
    switch (passType) {
      case "Basic":
        return 95 // Basic Pass - 90 GEL
      case "AllInclusive":
        return 135 // All-Inclusive Pass - 130 GEL
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
      medicalQualification: formData.medicalQualification,
      specialty: formData.specialty,
      currentWorkplace: formData.currentWorkplace,
      countryOfPractice: formData.countryOfPractice,
      foodPreference: formData.foodPreference,
      dietaryRestrictions: formData.dietaryRestrictions,
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

    // For all-inclusive doctor tickets, gala dinner is automatically included
    if (passType === "AllInclusive") {
      // Ensure gala dinner is set for all-inclusive tickets
      if (!formData.galaDinner || !formData.galaDinner.includes("Yes")) {
        setFormData(prev => ({
          ...prev,
          galaDinner: "Yes, I would like to attend the Gala Dinner (+40 GEL)"
        }))
      }
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
          dashboardPassword: "Dashboard Password",
          whatsapp: "WhatsApp Number",
          medicalQualification: "Medical Qualification",
          specialty: "Specialty",
          currentWorkplace: "Current Workplace",
          countryOfPractice: "Country of Practice",
          foodPreference: "Food Preference",
          dietaryRestrictions: "Dietary Restrictions",
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

  // Pass Selection Step
  if (currentStep === 1) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {showSuccessAnimation && <SuccessAnimation />}
        {showLoading && <LoadingAnimation isVisible={showLoading} onComplete={() => setShowLoading(false)} />}
        <LoadingAnimation 
          isVisible={isSubmitting} 
          onComplete={() => setIsSubmitting(false)}
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
                      <div className="text-2xl font-bold text-blue-400 mb-2">95 GEL</div>
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
                      <div className="text-2xl font-bold text-purple-400 mb-2">135 GEL</div>
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
              
              {/* Price Display */}
              {passType && (
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 mb-4 border border-white/30">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-white text-lg font-semibold">Ticket Price:</span>
                    <span className="text-3xl font-bold text-yellow-400">{calculatePrice()} GEL</span>
                  </div>
                  <p className="text-blue-100 text-sm mt-1">
                    {passType === "Basic" ? "Basic conference access" : "All-inclusive with workshops and gala"}
                  </p>
                </div>
              )}

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
                    <p className="text-gray-300 mb-4">
                      Workshop selection will begin in September: Stay tuned for announcements on your email and our socials
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Gala Dinner Information - Only for All-Inclusive */}
            {passType === "AllInclusive" && (
              <section className="space-y-6 animate-fade-in-delay">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Gala Dinner - Automatically Included</h2>
                </div>

                <div className="bg-gradient-to-r from-purple-50/10 to-pink-50/10 border border-purple-200/30 rounded-xl p-6">
                  <div className="text-center">
                    <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Gala Dinner Included!</h3>
                    <p className="text-gray-300 mb-4">
                      Your All-Inclusive Doctor ticket automatically includes access to the Gala Dinner - the grand finale of MEDCON.
                    </p>
                    <div className="bg-green-100/20 rounded-lg p-4">
                      <p className="text-sm text-green-300">
                        <strong>✓ Included:</strong> Gala Dinner access is automatically included in your All-Inclusive Doctor ticket.
                      </p>
                    </div>
                    <div className="bg-purple-100/20 rounded-lg p-4 mt-4">
                     
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
                  </div>
                </div>

                {formData.paymentMethod && formData.paymentMethod === "Bank Transfer" ? (
                  <div key="bank-transfer-section">
                    {/* Bank Details */}
                    <div className="bg-gradient-to-r from-green-50/10 to-emerald-50/10 border-2 border-green-200/30 rounded-xl p-6 mb-6">
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
                        </div>
                      </div>
                    </div>

                    {/* Bank Transfer Images Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-4 text-center">
                        📸 These are the images which needs to be submitted
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <img 
                            src="/ab8cedda-965c-424e-9ba4-18e837fcaadf.JPG" 
                            alt="Bank Transfer Example 1" 
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                          <p className="text-sm text-gray-300 mt-2 text-center">Payment Order Example</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <img 
                            src="/1fedc4b1-f480-44cf-9351-b43895491c94.JPG" 
                            alt="Bank Transfer Example 2" 
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                          <p className="text-sm text-gray-300 mt-2 text-center">External Transfer Example</p>
                        </div>
                      </div>
                    </div>

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
                        <p className="text-xs text-gray-300 mt-1">
                          Upload the exact payment receipt as a JPEG or PNG, not a PDF. Screenshots must clearly show full transaction details as shown in the examples
                        </p>
                        <p className="text-xs text-red-300 mt-1">⚠️ Maximum file size: 5MB</p>
                        {formData.paymentProof && (
                          <p className="text-sm text-green-400 mt-2">✓ File selected: {formData.paymentProof.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
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
