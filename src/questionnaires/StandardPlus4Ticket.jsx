"use client"

import { useState, useEffect } from "react"
import { Upload, User, GraduationCap, Camera, Utensils, CreditCard, CheckCircle, Users, Star, Crown, Shield, Award, Sparkles, Calendar, MapPin, Clock, XCircle } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import CreditCardAnimation from "../Components/CreditCardAnimation"
import { StatefulButton } from "../Components/StatefulButton"
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

export default function StandardPlus4Ticket() {
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
    examPrep: [], // Changed to array for multiple selections
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
    workshopPackage: "Standard+4",
    medicalQualification: "",
    specialty: "",
    currentWorkplace: "",
    countryOfPractice: "",
    isTsuStudent: false,
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
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [errorBooking, setErrorBooking] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [soldOut, setSoldOut] = useState(false)
  const [emailUsed, setEmailUsed] = useState(false)
  const [bankTransferKey, setBankTransferKey] = useState(0)
  const navigate = useNavigate()
  const [loadingStep, setLoadingStep] = useState(0)
  const [fileUploadProgress, setFileUploadProgress] = useState(0)

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
      
      // Force re-render when switching TO Bank Transfer to fix white screen issue
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
    
    console.log(`📁 File selected: ${file.name} (${file.size} bytes, ${file.type})`)
    
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }))
  }

  const handleMemberTypeSelect = (type) => {
    // Map frontend types to backend subType values
    const typeMapping = {
      "gimsoc": "GIMSOC",
      "non-gimsoc": "Non-GIMSOC", 
      "tsu": "TSU",
      "exec": "Executive", // Executive & Subcommittee maps to Executive
    }
    
    const mappedType = typeMapping[type] || type
    setMemberType(mappedType)
    setFormData((prev) => ({
      ...prev,
      memberType: mappedType,
      isTsuStudent: mappedType === "TSU",
    }))
    setCurrentStep(2)
  }

  // Calculate pricing based on member type
  const getINRPrice = () => {
    let baseINR = 0

    switch (memberType) {
      case "GIMSOC":
        baseINR = 2120 // GIMSOC Members - 2120 INR
        break
      case "TSU":
        baseINR = 2120 // TSU Students - 2120 INR
        break
      case "Executive":
        baseINR = 1960 // Executive & Subcommittee - 1960 INR
        break
      case "Non-GIMSOC":
        baseINR = 2280 // Non-GIMSOC Members - 2280 INR
        break
      default:
        baseINR = 2280 // Default to Non-GIMSOC price
    }

    const galaINR = formData.galaDinner && formData.galaDinner.includes("Yes") ? 1320 : 0
    return baseINR + galaINR
  }

  const calculatePrice = () => {
    let basePrice = 0

    switch (memberType) {
      case "GIMSOC":
        basePrice = 65 // GIMSOC Members - 75 GEL
        break
      case "TSU":
        basePrice = 65 // TSU Students - 65 GEL
        break
      case "Executive":
        basePrice = 60 // Executive & Subcommittee - 60 GEL
        break
      case "Non-GIMSOC":
        basePrice = 70 // Non-GIMSOC Members - 70 GEL
        break
      default:
        basePrice = 70 // Default to Non-GIMSOC price
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
    setShowLoading(true)
    setSoldOut(false)
    setEmailUsed(false)
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
      semester: formData.semester,
      foodPreference: formData.foodPreference,
      accessibilityNeeds: formData.accessibilityNeeds,
      galaDinner: formData.galaDinner,
      paymentMethod: formData.paymentMethod,
      infoAccurate: formData.infoAccurate,
      mediaConsent: formData.mediaConsent,
      policies: formData.policies,
      emailConsent: formData.emailConsent,
      whatsappConsent: formData.whatsappConsent,
      headshot: formData.headshot,
      paymentProof: formData.paymentProof
    }

    // Debug logging for university name
    console.log("🔍 Validation debug:");
    console.log("🔍 Member type:", memberType);
    console.log("🔍 University name:", formData.universityName);
    console.log("🔍 Form data keys:", Object.keys(formData));

    // Check for missing required fields
    const missingFields = []
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value || (typeof value === 'string' && value.trim() === '') || 
          (typeof value === 'boolean' && !value) || 
          (Array.isArray(value) && value.length === 0)) {
        missingFields.push(field)
      }
    }

    // Special validation for member-specific fields
    if (memberType === "GIMSOC" && !formData.gimsocMembershipCode) {
      missingFields.push("gimsocMembershipCode")
    }
    // TSU email validation removed as it's not always required
    if (memberType === "GEOMEDI" && !formData.geomediEmail) {
      missingFields.push("geomediEmail")
    }

    // Special handling for TSU and GEOMEDI university names
    if ((memberType === "TSU" || memberType === "GEOMEDI") && !formData.universityName) {
      console.log("⚠️ Auto-setting university name for", memberType);
      if (memberType === "TSU") {
        formData.universityName = "Ivane Javakhishvili Tbilisi State University (TSU – Faculty of Medicine)";
      } else if (memberType === "GEOMEDI") {
        formData.universityName = "University Geomedi";
      }
      // Remove universityName from missing fields if it was there
      const universityIndex = missingFields.indexOf("universityName");
      if (universityIndex > -1) {
        missingFields.splice(universityIndex, 1);
      }
    }

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => {
        const fieldMap = {
          email: "Email",
          fullName: "Full Name",
          dashboardPassword: "Dashboard Password",
          whatsapp: "WhatsApp Number",
          semester: "Semester",
          foodPreference: "Food Preference",
          accessibilityNeeds: "Accessibility Needs",
          galaDinner: "Gala Dinner Selection",
          paymentMethod: "Payment Method",
          infoAccurate: "Information Accuracy Confirmation",
          mediaConsent: "Media Consent",
          policies: "Policies Agreement",
          emailConsent: "Email Consent",
          whatsappConsent: "WhatsApp Consent",
          headshot: "Profile Photo",
          paymentProof: "Payment Proof",
          gimsocMembershipCode: "GIMSOC Membership Code",
          // tsuEmail: "TSU Email", // Removed as not always required
          geomediEmail: "GEOMEDI Email"
        }
        return fieldMap[field] || field
      }).join(", ")
      
      alert(`Please fill in all required fields: ${fieldNames}`)
      setIsSubmitting(false)
      return
    }

    const form = new FormData()

    // Set ticket classification - map to backend schema
    form.append("ticketCategory", "Standard")
    form.append("subType", memberType)
    form.append("ticketType", "Standard+4") // Backend expects this field

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
        // Handle examPrep array
        else if (key === "examPrep" && Array.isArray(value)) {
          form.append(key, value.join(", "))
          console.log(`📄 Exam prep field ${key}: ${value.join(", ")}`)
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
        ticketType: "Standard",
        email: formData.email,
        fullName: formData.fullName,
        workshopPackage: formData.workshopPackage,
        isGimsocMember: memberType === "GIMSOC"
      })
      
      // Log all form data entries
      console.log("📋 FormData entries:")
      for (let [key, value] of form.entries()) {
        console.log(`${key}: ${value}`)
      }
      
      // Step 1: Validation complete
      setLoadingStep(1)
      
      // Test backend connectivity
      console.log("🔍 Testing backend connectivity...")
      
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
      console.error("❌ Submission failed:", err.response?.data || err.message)
      console.error("❌ Full error response:", err.response)
      console.error("❌ Error status:", err.response?.status)
      console.error("❌ Error data:", err.response?.data)
      console.error("❌ Network error:", err.message)
      console.error("❌ Request config:", err.config)
      
      if (err.code === 'ECONNABORTED') {
        alert("Request timed out. The server is not responding. Please try again later.")
      } else if (err.response) {
        // Server responded with error
        const errorMessage = err.response.data?.message || err.message;
        const errorDetails = err.response.data?.details || [];
        
        if (err.response?.status === 429) {
          // Rate limit error
          alert("You've made too many requests. Please wait a few minutes before trying again.")
        } else if (err.response?.status === 409 && (
          err.response?.data?.message?.includes("sold out") ||
          err.response?.data?.message?.includes("Executive & Subcommittee tickets are sold out") ||
          err.response?.data?.message?.includes("TSU student tickets are sold out") ||
          err.response?.data?.message?.includes("GEOMEDI student tickets for Standard+2 are sold out")
        )) {
          setSoldOut(true)
        } else if (err.response?.status === 409 && err.response?.data?.message?.includes("already been used")) {
          setEmailUsed(true)
        } else if (err.response?.status === 400 && errorDetails.length > 0) {
          // Show detailed validation errors
          const errorMessages = errorDetails.map(detail => `${detail.field}: ${detail.message}`).join('\n');
          alert(`Validation errors:\n${errorMessages}`);
        } else {
          alert(`Form submission failed: ${errorMessage}`)
        }
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
    "Caucasus University (CU)",
    "Georgian American University (GAU)",
    "East European University (EEU)",
    "New Vision University (NVU)",
    "Petre Shotadze Tbilisi Medical Academy (TMA)",
    "Georgian National University SEU",
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
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        {showSuccessAnimation && <SuccessAnimation />}
        {showLoading && <LoadingAnimation isVisible={showLoading} onComplete={() => setShowLoading(false)} />}
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
                animationDuration: `${6 + Math.random() * 4}s`
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
                  Standard+4 Ticket
                </h1>
                <p className="text-blue-100 text-xl mb-6 animate-fade-in-delay">
                  Choose your membership type to continue
                </p>
                                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 animate-glow">
                 
                  <div className="text-blue-100 text-sm mt-2">+ Workshop Selection (4 workshops)</div>
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
                      <span className="text-2xl font-bold text-green-600">65 GEL / 2120 INR</span>
                      <div className="text-sm text-gray-500">5 GEL discount</div>
                    </div>
                  </div>
                </div>

                {/* Non-GIMSOC Member */}
                <div 
                  onClick={() => handleMemberTypeSelect("non-gimsoc")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  <div className="bg-gradient-to-br from-blue-800/20 to-blue-900/20 border-2 border-blue-300/50 rounded-2xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Non-GIMSOC Member</h3>
                    <p className="text-white mb-4">Standard registration</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-blue-600">70 GEL / 2280 INR</span>
                      <div className="text-sm text-gray-400">Regular price</div>
                    </div>
                  </div>
                </div>

                {/* TSU Student */}
                <div 
                  onClick={() => handleMemberTypeSelect("tsu")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-300/50 rounded-2xl p-6 hover:border-green-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                      <GraduationCap className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">TSU Student</h3>
                    <p className="text-white mb-4">TSU Faculty of Medicine</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-green-600">65 GEL / 2120 INR</span>
                      <div className="text-sm text-gray-500">5 GEL discount</div>
                    </div>
                  </div>
                </div>

                {/* Executive & Subcommittee */}
                <div 
                  onClick={() => handleMemberTypeSelect("exec")}
                  className="group cursor-pointer card-hover animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 border-2 border-purple-300/50 rounded-2xl p-6 hover:border-purple-400 hover:shadow-xl transition-all duration-300 animate-shimmer backdrop-blur-sm">
                    <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                      <Crown className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Executive & Subcommittee</h3>
                    <p className="text-white mb-4">GIMSOC leadership team</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-purple-600">60 GEL / 1960 INR</span>
                      <div className="text-sm text-gray-500">10 GEL discount</div>
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
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {showSuccessAnimation && <SuccessAnimation />}
              <LoadingAnimation 
          isVisible={isSubmitting} 
          onComplete={() => setIsSubmitting(false)}
        />
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
                {getMemberTypeDisplay()} Registration
              </h1>
              <p className="text-blue-100 mb-4">Standard+4 Ticket - Complete your registration</p>
              
              {/* Dynamic Price Display */}
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <span className="text-white text-lg font-medium">Total Price: </span>
                <span className="text-white text-3xl font-bold">{calculatePrice()} GEL / {getINRPrice()} INR</span>
                {formData.galaDinner === "Yes" && (
                  <div className="text-yellow-300 text-sm mt-1">✓ Gala Dinner Included (+40 GEL / +1320 INR)</div>
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
                    <label key={exam} className="flex items-center space-x-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-white/50 transition-colors bg-white/20 backdrop-blur-sm">
                      <input
                        type="checkbox"
                        name="examPrep"
                        value={exam}
                        checked={formData.examPrep.includes(exam)}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500 rounded"
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
                    placeholder="Specify other exam(s)"
                  />
                </div>
                {formData.examPrep.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-100/20 rounded-lg">
                    <p className="text-sm text-blue-300">
                      <strong>Selected exams:</strong> {formData.examPrep.join(", ")}
                    </p>
                  </div>
                )}
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
                    // required - made optional
                  />
                  <p className="text-xs text-gray-300 mt-1">Please enter your official TSU email address for verification</p>
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
                      <label key={option} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white/50 cursor-pointer transition-all bg-white/20 backdrop-blur-sm">
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

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <div className="text-center mb-6">
                  <Crown className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-2">Would you like to attend the Gala Dinner?</h3>
                  <p className="text-black mb-4">
                    The Gala is the grand finale of MEDCON, an elegant evening designed to celebrate the success of the conference, 
                    reflect on inspiring moments shared, and strengthen the connections formed.
                  </p>
                  <div className="bg-purple-100 rounded-lg p-4 mb-6">
                    <p className="text-sm text-black">
                      <strong>Note:</strong> Gala access is optional and costs an additional 40 GEL / 1320 INR.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {["Yes, I would like to attend the Gala Dinner (+40 GEL / +1320 INR)", "No, I will not attend the Gala Dinner"].map((option) => (
                    <label key={option} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white/50 cursor-pointer transition-all bg-white/20 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="galaDinner"
                        value={option}
                        checked={formData.galaDinner === option}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                        required
                      />
                      <span className="text-black font-medium">{option}</span>
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
                    <span className="text-white">I confirm that all the information provided is accurate to the best of my knowledge.</span>
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
                        <span className="text-white">Do you consent to the use of photos and videos of you taken during the conference for promotional purposes? {option}</span>
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
                      <span className="text-white">I agree to comply with all conference policies, rules, and guidelines.</span>
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
                      <span className="text-white">I agree to receive emails from GIMSOC and MEDCON, including updates, resources, and conference-related information.</span>
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
                      <span className="text-white">I consent to be added to our WhatsApp group for updates, discussions, and announcements related to MEDCON.</span>
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
                  <div key={`bank-transfer-${bankTransferKey}`} className="space-y-6">
                    {/* Bank Details */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">Bank Transfer Details</h3>
                      
                      {/* TBC Bank Details */}
                      <div className="mb-6">
                        <h4 className="text-md font-semibold text-green-700 mb-3">FOR LARI TRANSFER</h4>
                        <div className="bg-white/80 rounded-lg p-4 space-y-2">
                          <p className="text-sm text-gray-700"><strong>Beneficiary's Bank:</strong> JSC TBC Bank</p>
                          <p className="text-sm text-gray-700"><strong>Location:</strong> Tbilisi, Georgia</p>
                          <p className="text-sm text-gray-700"><strong>Swift:</strong> TBCBGE22</p>
                          <p className="text-sm text-gray-700"><strong>Beneficiary's IBAN:</strong> GE31TB7724245061200012</p>
                          <p className="text-sm text-gray-700"><strong>Name of Beneficiary:</strong> Mandrika Santosh Umanga Fernando</p>
                        </div>
                      </div>

                      {/* Bank of Georgia Details */}
                      <div className="mb-6">
                        <h4 className="text-md font-semibold text-green-700 mb-3">BANK DETAILS FOR TRANSFERS IN GEORGIAN LARI (GEL)</h4>
                        <div className="bg-white/80 rounded-lg p-4 space-y-2">
                          <p className="text-sm text-gray-700"><strong>Account with institution:</strong> Bank of Georgia</p>
                          <p className="text-sm text-gray-700"><strong>SWIFT:</strong> BAGAGE22</p>
                          <p className="text-sm text-gray-700"><strong>Beneficiary:</strong> FERNANDO MANDRIKA SANTOSH U.</p>
                          <p className="text-sm text-gray-700"><strong>Account:</strong> GE94BG0000000608342766</p>
                          
                        </div>
                      </div>

                      {/* INR Transfer Details */}
                      <div>
                        <h4 className="text-md font-semibold text-green-700 mb-3">FOR INR TRANSFER (INDIAN RUPEES)</h4>
                        <div className="bg-white/80 rounded-lg p-4 space-y-2">
                          <p className="text-sm text-gray-700"><strong>UPI ID:</strong> divyeshkadiyala@ybl</p>
                          <p className="text-sm text-gray-700"><strong>Phone Number:</strong> +91 8971224430</p>
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

                    {/* Upload Section */}
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <label className="block text-sm font-medium text-white mb-2">
                        Upload Proof of Payment *
                      </label>
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
                        <p className="text-xs text-gray-300 mt-1">Upload the exact payment receipt as a JPEG or PNG, not a PDF. Screenshots must clearly show full transaction details as shown in the examples</p>
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
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-xl font-semibold text-lg"
              >
                Complete Registration - {calculatePrice()} GEL / {getINRPrice()} INR
              </StatefulButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

